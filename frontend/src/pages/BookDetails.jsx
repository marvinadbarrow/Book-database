export const BookDetails = (viewBookDetails) =>{

    console.log(viewBookDetails)
    console.log(viewBookDetails.viewAll)


let thisBook = viewBookDetails.viewBookDetails
let backToBooks = viewBookDetails.viewAll



const returnToBooks = () =>{
backToBooks()
}





    
    return(
        <>

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
                <div className="all-books-btn-div">
        <button className="all-books-btn" onClick={returnToBooks}>Return to Books</button>
        </div>
                
                </>
    )
}
