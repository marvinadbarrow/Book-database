import { useEffect, useState } from "react"
import axios from 'axios'
// import toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const BookEditElement = ({setDeleteModal, setEditModal}) =>{





// opens modal to confirm deletions
    const deleteBook = () =>{
// set state to open modal
setDeleteModal('show')
 }


    const editBook = (title) =>{
// set state to open modal
setEditModal('show')
    }

console.log('edit element recognized')

    return(
        <>
        <div className="book-edit-holder">
        <button className="book-delete-btn" onClick={deleteBook}>Delete</button>

<button className="book-edit-btn" onClick={editBook}>Edit</button>

</div>

        
        </>



    )
}