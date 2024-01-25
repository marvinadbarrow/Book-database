import { useEffect, useState } from "react"




export const MainButtonsContainer = ({getBookPage, setNewBookForm}) =>{

const showBooks = () =>{
    getBookPage()
}


    return(
        <>
        <div className="main-buttons-container">


<button  className="btn btn-primary btn-lg"  onClick={showBooks}>Show Books</button>

<button  className="btn btn-primary btn-lg"  onClick={()=>{
    setNewBookForm('show')
}}>Add a Book</button>


</div>
        
        
        </>
    )
}