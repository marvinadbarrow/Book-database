
import { useEffect, useState } from "react"
import { BookEditElement } from "../components/BookEditElement"
import { DeleteModalElement } from "../components/DeleteModalElement"
import { EditModalElement } from "../components/EditModalElement"

export const BookDetails = ({viewBookDetails, viewAll, showBooks, bookstoreData, setViewBookDetails, categoryName}) =>{


    console.log(viewBookDetails)

    const [deleteModal, setDeleteModal] = useState('hide')
    const [editModal, setEditModal] = useState('hide')
let thisBook = viewBookDetails
let backToBooks = viewAll
let bookID = viewBookDetails._id
let bookTitle = viewBookDetails.Title
let bookImageUrl = thisBook.ImgUrl
console.log(thisBook)
const returnToBooks = () =>{
backToBooks()
}




const resetPage = (modalType) =>{
   // hide modal
    setDeleteModal('hide')
    setDeleteModal('hide')

    // hide book details
    setViewBookDetails('')
    // page book is to be deleted from 
let currentPage = bookstoreData['selected_page']
showBooks(currentPage)

    }

    
    return(
        <>

{
// show modal if delete button on details page is clicked
deleteModal == 'show' &&

<DeleteModalElement bookID={bookID} bookTitle={bookTitle} setDeleteModal={setDeleteModal} bookImageUrl={bookImageUrl} resetPage={resetPage}  bookstoreData={bookstoreData} categoryName={categoryName}/>
}



{
    editModal == 'show' &&

    <EditModalElement bookID={bookID} bookTitle={bookTitle} setEditModal={setEditModal} bookImageUrl={bookImageUrl} resetPage={resetPage}  bookstoreData={bookstoreData} categoryName={categoryName} thisBook={thisBook}/>
}


<h2 className="book-name-large">{thisBook.Title}</h2>
        




                <div className="books-div">
      
                    <>
<div className="book-info-single">

    <div className="stats-and-images-single">
            <div className="book-large-div">
                <img src={thisBook.ImgUrl}alt="book image" className="book-thumb-large"/>
                <a href={thisBook.BuyUrl}className="buy-url">View seller</a>
              
            </div>

            <div className="individual-book-details">
            
            <p className="book-data"><b>Title: </b>{thisBook.Title}</p>
            <p className="book-data"><b>Author: </b>{thisBook.Author}</p>
            <p className="book-data"><b>Edition: </b>{thisBook.Edition}</p>
            <p className="book-data"><b>Publisher: </b>{thisBook.Publisher}</p>
            <p className="book-data"><b>Language: </b>{thisBook.Language}</p>
            <p className="book-data"><b>Format: </b>{thisBook.Format}</p>
            <p className="book-data"><b>Pages: </b>{thisBook.Pages}</p>
            <p className="book-data"><b>ISBN_10: </b>{thisBook['ISBN_10']}</p>
            <p className="book-data"><b>ISBN_13: </b>{thisBook['ISBN_13']}</p>
            <p className="book-data"><b>ASIN: </b>{thisBook.ASIN}</p>
            <p className="book-data"><b>Dimensions: </b>{thisBook.Dimensions}</p>
            <p className="book-data"><b>MyDB_id: </b>{thisBook._id}</p>
    
<div className="genre-div">
            <h3 className="book-data ">Genres:</h3>
            <ul>

{ // map for genres
thisBook.Genres.map(genre =>{
    return(
<>
<li className="genre-list">{genre}</li>
</>
    )
})
         
}

</ul>
</div>


</div>
</div>

<div className="description-div">

<p className="book-data"><b>Description: </b>{thisBook.Description}</p>
</div>


</div>
                    </>
    
                </div>

                <div className="book-details-btns">
                <div className="all-books-btn-div">
        <button className="all-books-btn" onClick={returnToBooks}>Return to Books</button>
        </div>
                
<BookEditElement setEditModal={setEditModal} setDeleteModal={setDeleteModal} />
                </div>


                </>
    )
}
