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



export const BooksMath = () =>{

// state for book details modal
const [viewBookDetails, setViewBookDetails] = useState('')



// state for all books
    const [returnedBooks, setReturnedBooks] = useState([])
const [bookstoreData, setBookStoreData] = useState()
const [newBookForm, setNewBookForm] = useState('hide')


    const showBooks = async(pageNumber) =>{
// initially there will be no pageNumber value so use zero which will get the first page, otherwise use incoming page number which will come from a click on the pagination strip

console.log('show books number')
console.log(pageNumber)

// if no page number is available this should be zero
        let page = pageNumber || 0; 


// create a URL that includes a search page number
const URL = 'http://localhost:3000/books/mathematics' + '?page=' + pageNumber;


// const URL = 'http://localhost:3000/books/mathematics' + '&page=1' + pageNumber
        try{

            // note, the address below is for getting books from local host, but for some reason, even though I was able to post a new book to mongoDB atlas, it is not appearing on the math books page; so maybe the below URL is the wrong one, i.e. 'http://localhost:3000/books/mathematics' might need to change to an address which corresponds to the atlas server. - solved. In the backend route for mathematics, I had specified that only 5 books should be shown per page, and the default page number 'zero' was being used, so if there were more than 5 books in the collection, book 6 onward would not show. 

            let books = await axios.get(URL)
            .then(res =>{        
                // the response data contains two kinds of objects, an array which contains a set of objects, one for each book returned, and a separate object which has a 'number of books' property that gives the total number of books in the collection. The latter can be used to calculate the number of pages of books there are, and to use the pagination element to navigate to a specific page. 
    let bookList = res.data
  

       if(bookList.data.length > 0){

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
    
 

const showBookDetails = (viewTitle) =>{
    let selectedBook
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
<AddNewBook setNewBookForm={setNewBookForm}/>

}

{ // show selected book full details, if book details state is a non empty string (a book name)
    viewBookDetails !=='' &&
    <BookDetails viewAll={viewAll} viewBookDetails={viewBookDetails} showBooks={showBooks} bookstoreData={bookstoreData} setViewBookDetails={setViewBookDetails}/>
}

{// if book details state is empty then show all books on page
         viewBookDetails =='' &&

<>
<h1>Maths Books</h1>
        
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
            <button className="btn btn-primary btn-md cancel" onClick={()=>{
                // this will return user to math main page
                setReturnedBooks([])
            }}>Math Main Page</button>
            </div>

</>



}

</>

}
    
                </>
    )
}



// PARAMETERS NEEDED FOR GENERIC PAGE