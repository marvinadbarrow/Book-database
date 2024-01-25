import { useState, useEffect } from "react";



export const viewedBooks = ({booksList}) =>{





    const showClickedBook = (title) =>{
        showBookDetails(title)
    }

// the information in the return will need to be from the mapping of the 'booklist' variable which will be an array of all of the viewed books in the history of user or admin

return(
    <>
            <div className="book-info-all">
<div className="stats-and-images">
        <img onClick={() =>{
        
showClickedBook(exactBook.Title)
        }} src={exactBook.ImgUrl}alt="book image" className="book-thumb-small"/>
        <p className="call-to-act">Click Image for Details</p>
      
    <div className="individual-book-details">
    <p className="book-data book-title"> {exactBook.Title}</p>
    <p className="book-data"> {exactBook.Author}</p>
    <p className="book-data book-format"> {exactBook.Format}</p>
    </div>
</div>
</div>
    </>
)
}