import { useEffect, useState } from "react"
import axios from 'axios'
import { BookDetails } from "./BookDetails"

// import toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const KindleMath = () =>{

// state for book details modal
const [viewBookDetails, setViewBookDetails] = useState('')



// state for all books
    const [returnedBooks, setReturnedBooks] = useState([])



    const showBooks = async() =>{


        try{

            let books = await axios.get('http://localhost:3000/books/kindle_maths')
            .then(res =>{        
    let bookList = res.data
       if(bookList.length > 0){
        setReturnedBooks([...bookList])
       }
      
            })

                
        }
        catch(err){
            console.log(err)
            //      let errorText = 'Alert' +  err.response.statusText +': ' + err.response.status
            // toast.error(errorText, {
            //     position: toast.POSITION.TOP_RIGHT
            //   });


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
}

{ // show selected book full details, if book details state is a non empty string (a book name)
    viewBookDetails !=='' &&
    <BookDetails viewAll={viewAll} viewBookDetails={viewBookDetails}/>
}

{// if book details state is empty then show all books on page
         viewBookDetails =='' &&

<>
<h1>Kindle Math</h1>
        
        <div className="books-div">
           
{ // if get request is successful, 
    returnedBooks.length > 0 && // if there are Books
    returnedBooks.map(bookx =>{ // map the array
            
        return ( // return general details for each book
            <>
<div className="book-info-all">
<div className="stats-and-images">
        <img onClick={() =>{
        
showBookDetails(bookx.Title)
        }} src={bookx.ImgUrl}alt="book image" className="book-thumb-small"/>
        <p className="call-to-act">Click Image for Details</p>
      
    <div className="individual-book-details">
    <p className="book-data book-title"> {bookx.Title}</p>
    <p className="book-data"> {bookx.Author}</p>
    <p className="book-data book-format"> {bookx.Format}</p>
    </div>
</div>
</div>
            </>
        )

    
    })
}         
        </div>

{returnedBooks == '' &&
<button  className="btn btn-primary btn-lg"  onClick={showBooks}>Show all Books</button>
}

</>

}
    
                </>
    )
}

