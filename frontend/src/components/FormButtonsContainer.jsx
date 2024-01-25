import { useEffect, useState } from "react"




export const FormButtonsContainer = ({handleClick, setNewBookForm}) =>{



    return(
        <>
        <div className="main-buttons-container">

        <button className="btn btn-primary btn-lg cancel" onClick={()=>{
    setNewBookForm('hide')
}}>Cancel</button>

<button type="button" className="btn btn-primary btn-lg" onClick={handleClick}>Add Book</button>


</div>
        
        
        </>
    )
}