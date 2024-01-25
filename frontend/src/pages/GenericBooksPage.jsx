import { useEffect, useState } from "react"
import axios from 'axios'
import { BookDetails } from "./BookDetails"

// import toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PaginationStrip } from "../components/PaginationStrip";
import { MainButtonsContainer } from "../components/MainButtonsContainer";
import { BookShelf } from "../components/BookShelf";
import { AddNewBook } from "./AddNewBook";
import { BookEditElement } from "../components/BookEditElement";
import { HomeButton } from "../components/HomeButton";


export const GenericBooksPage = ({bookCategoryText, navigateToMainText, categoryName, bookType}) =>{

    console.log('category name')
    console.log(categoryName)
// state for book details modal
const [viewBookDetails, setViewBookDetails] = useState('')

// switch for 


// state for all books
    const [returnedBooks, setReturnedBooks] = useState([])
const [bookstoreData, setBookStoreData] = useState()
const [newBookForm, setNewBookForm] = useState('hide')

let mainUrl;
switch(categoryName){
    case 'maths': 
mainUrl = 'http://localhost:3000/books/mathematics';
break;
case 'stems':
mainUrl = 'http://localhost:3000/books/other_stems'
    break;
case 'kindle maths':
mainUrl = 'http://localhost:3000/books/kindle_maths'
break;
case 'kindle stems':
    mainUrl = 'http://localhost:3000/books/kindle_stems'
    break;
case 'general':
    mainUrl = 'http://localhost:3000/books/generals' 
    break;
case 'test books':
    mainUrl = 'http://localhost:3000/books/test_books' 
    break;
}

console.log(mainUrl)
    const showBooks = async(pageNumber) =>{
// initially there will be no pageNumber value so use zero which will get the first page, otherwise use incoming page number which will come from a click on the pagination strip



// if no page number is available this should be zero
        let page = pageNumber || 0; 

        console.log('show page number')
console.log(page)

// create a URL that includes a search page number
const URL = mainUrl + '?page=' + page;

console.log('total URL line 62 generic book page')
console.log(URL)


        try{

            let books = await axios.get(URL)
            .then(res =>{        
                // the response data contains two kinds of objects, an array which contains a set of objects, one for each book returned, and a separate object which has a 'number of books' property that gives the total number of books in the collection. The latter can be used to calculate the number of pages of books there are, and to use the pagination element to navigate to a specific page. 
    let bookList = res.data
  console.log('book list line  78 generic book page')
console.log(bookList)

if(bookList['selected_page'] === 0 && bookList.data.length  < 1){
    // this means that no books are in the collection so inform user
    let errorText = 'Alert: ' + 'there are no books in this collection yet'
    toast.error(errorText, {
        position: toast.POSITION.TOP_RIGHT
      });
   }

//(bookList.data.length > 0)
      else{
        setBookStoreData(bookList)
        let booksObjects = bookList.data
        console.log('book list - mathematics')
        console.log(booksObjects)
        setReturnedBooks([...booksObjects])
       }
    

       
    
      
            })

                
        }
        catch(err){
            console.log(err)
                 let errorText = 'Alert' +  err.response.statusText +': ' + err.response.status
            toast.error(errorText, {
                position: toast.POSITION.TOP_RIGHT
              });

        }

    }
    
 
// functions that sets state to allow bookDetails to be viewed. 
const showBookDetails = (viewTitle) =>{
    let selectedBook;
    console.log('clicked book')
    console.log(viewTitle)
    returnedBooks.map(book =>{
        if(book.Title == viewTitle){
            selectedBook = book
        }
    })
 
    setViewBookDetails(selectedBook)

}

// hides specific books and show all books
const viewAll = () =>{
setViewBookDetails('')
}
    
    return(
        <>
<ToastContainer/>

{
    // element with inputs for searching books, by name, genre
newBookForm == 'show' &&
<AddNewBook setNewBookForm={setNewBookForm} categoryName={categoryName}  bookType={bookType}/>

}

{ // show selected book full details, if book details state is a non empty string (a book name)
    viewBookDetails !=='' &&
    <BookDetails viewAll={viewAll} viewBookDetails={viewBookDetails} showBooks={showBooks} bookstoreData={bookstoreData} setViewBookDetails={setViewBookDetails} categoryName={categoryName}/>
}

{// if book details state is empty then show all books on page
         viewBookDetails =='' &&

<>
<h1>{bookCategoryText}</h1>
        
        <div className="books-div">
           
{ // if get request is successful, and there are books in the collection, loop through books and show bookshelf
    returnedBooks.length > 0 && // if there are Books
    returnedBooks.map(bookx =>{ // map the array
            
        return ( // displays shelf
            <>
            <BookShelf showBookDetails={showBookDetails} exactBook={bookx}/>
            </>
        )

    
    })
}         
        </div>



{
// if there are no returned books yet, main buttons container - this is the only element to show on the math books page when user first clicks on the math category thumbnail. 
returnedBooks == '' &&
newBookForm == 'hide' &&
<>

<MainButtonsContainer setNewBookForm={setNewBookForm} getBookPage={showBooks}/>

</>
}

{
// if there are returned books show pagination strip
returnedBooks.length > 0 &&
<>

<PaginationStrip bookstoreData={bookstoreData} getBookPage={showBooks}/>

 
<div className="return-to-main-div">
            <button className="btn btn-primary btn-md cancel return-to-category-home" onClick={()=>{
                // this will return user to math main page
                setReturnedBooks([])
            }}>{navigateToMainText}</button>
            </div>

</>



}

<HomeButton/>
</>

}
    
                </>
    )
}



/*

Parameters needed for generic page
bookCategory
navigateToMainText
and switch the url

*/
