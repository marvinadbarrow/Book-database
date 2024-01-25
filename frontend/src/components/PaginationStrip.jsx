import { PageNumber } from "./PageNumber"

import { useEffect, useState } from "react"


export const PaginationStrip = ({bookstoreData, getBookPage}) =>{

console.log('bookstoreData')
console.log(bookstoreData)
    // executes show books function to get a new page of books
    const getNewpage = (number) =>{
        console.log('pagination function received number')
        console.log(number)
        getBookPage(number)
    }


    const [pagination, setPagination] = useState()


let pagesArray = []
// let bookStoreInfo = bookstoreData['bookstoreData']
let totalBooks = bookstoreData['number_of_books']
let booksPerPage = bookstoreData['books_per_page']
let totalPages = Math.ceil(totalBooks/booksPerPage)
let currentPage = bookstoreData['selected_page']

console.log('currentPage')
console.log(currentPage)

// create an array containing all page numbers from first to last page
for(let i=0; i<totalPages; i++){
pagesArray.push(
    ['page_number',i]
)
}
// push a sub array containing current page number
pagesArray.push(['current_page', currentPage])




// page navigations to previous or next page on the condition that > 0 pages exists in the direction of navigation
const navigateToPage = (direction) =>{

    switch(direction){
        case 'previous':
            console.log('move to previous page')
            // if current page number is greater than zero then get previous page
            if(currentPage > 0){
                let previousPage = currentPage - 1;
                getNewpage(previousPage)
            }
            break;
        case 'next':
    // if current page number is less than final page number get next page
            if(currentPage < totalPages){
                let nextPage = currentPage + 1;
                getNewpage(nextPage)
            }

            break;
    }
}


return(




    <span className="s-pagination-strip">
        
<span className="s-pagination-item s-pagination-previous s-pagination-disabled " aria-disabled="true"  onClick={()=>{navigateToPage('previous')}}><svg xmlns="http://www.w3.org/2000/svg" width="8" height="12" viewBox="0 0 8 12" focusable="false" aria-hidden="true"><path d="M5.874.35a1.28 1.28 0 011.761 0 1.165 1.165 0 010 1.695L3.522 6l4.113 3.955a1.165 1.165 0 010 1.694 1.28 1.28 0 01-1.76 0L0 6 5.874.35z"></path></svg>Previous</span>

    {
// the array is used to display ALL page numbers consecutively
        <PageNumber pages={pagesArray} whichPage={getNewpage}/>
  
    }
    

    {
        // if the total number of pages is less than 5 then no ellipse element is needed in the pagination strip. 
    }
  

    
    
    <span href="/s?k=socks&amp;page=2&amp;crid=707XEOP20MG4&amp;qid=1704414990&amp;sprefix=socks%2Caps%2C69&amp;ref=sr_pg_1" aria-label="Go to next page, page 2" className="s-pagination-item s-pagination-next s-pagination-button s-pagination-separator"  onClick={()=>{navigateToPage('next')}}>Next<svg xmlns="http://www.w3.org/2000/svg" width="8" height="12" viewBox="0 0 8 12" focusable="false" aria-hidden="true"><path d="M2.126.35a1.28 1.28 0 00-1.761 0 1.165 1.165 0 000 1.695L4.478 6 .365 9.955a1.165 1.165 0 000 1.694 1.28 1.28 0 001.76 0L8 6 2.126.35z"></path></svg></span>
    
    </span>


)

}

// CODE FOR ELLIPSIS:       <span className="s-pagination-item s-pagination-ellipsis" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" width="10" height="2" viewBox="0 0 10 2" focusable="false" aria-hidden="true"><path d="M9 2c-.608 0-1-.425-1-1s.392-1 1-1 1 .448 1 1c0 .575-.392 1-1 1zM5 2c-.608 0-1-.425-1-1s.392-1 1-1 1 .448 1 1c0 .575-.392 1-1 1zM1 2c-.608 0-1-.425-1-1s.392-1 1-1 1 .448 1 1c0 .575-.392 1-1 1z"></path>...</svg></span>