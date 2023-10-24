import { useEffect, useState } from "react"
import axios from 'axios'
import { BookDetails } from "./BookDetails"


export const BooksMath = () =>{

// state for book details modal
const [viewBookDetails, setViewBookDetails] = useState('')




// state for all books
    const [returnedBooks, setReturnedBooks] = useState([])


    const showBooks = async() =>{

        let books = await axios.get('http://localhost:5000/books/mathematics')
        .then(res =>{

        
let bookList = res.data
   if(bookList.length > 0){
    setReturnedBooks([...bookList])
   }
  
        })


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

{ // show selected book full details, if book details state is a non empty string (a book name)
    viewBookDetails !=='' &&
    <BookDetails viewAll={viewAll} viewBookDetails={viewBookDetails}/>
}

{// if book details state is empty then show all books on page
         viewBookDetails =='' &&

<>
<h1>All Maths Books</h1>
        
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
         {  // if returned books is an empty string the API call has not yet happened, so show the get button. Returned results with either be an empty array or an array with elements, so the category is either empty or populated, either way, this button is no longer needed because the category's contents are returned. 
         returnedBooks == '' &&          
        <div className="all-books-btn-div">
        <button className="all-books-btn" onClick={showBooks}>Show All Books</button>
        </div>
         } 
        </div>

</>

}
    
                </>
    )
}


/*




    Title: String,
    Author: String,
    Edition: String,
    Publisher:String,
    Language:String,
    Genres:Array,
    Format: String,
    Pages: Number,
    ISBN_10:String,
    ISBN_13:String,
    ASIN:String,
    Dimensions: String,
    BuyUrl:String,
    ImgUrl:String,
    Description:String

                    <p className="book-data">BuyUrl: {bookx.BuyUrl}</p>
*/