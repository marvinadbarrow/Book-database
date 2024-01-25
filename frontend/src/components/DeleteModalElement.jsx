
import axios from 'axios'
// import toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const DeleteModalElement = ({bookID, bookTitle, setDeleteModal,bookImageUrl, resetPage, categoryName}) =>{


// switch category name so that the the id can be paired with the collection holding the book and used for the delete request URL

let mainUrl;
switch(categoryName){
    case 'maths': 
mainUrl = 'http://localhost:3000/books/mathematics/';
break;
case 'stems':
mainUrl = 'http://localhost:3000/books/other_stems/'
    break;
case 'kindle maths':
mainUrl = 'http://localhost:3000/books/kindle_maths/'
break;
case 'kindle stems':
    mainUrl = 'http://localhost:3000/books/kindle_stems/'
    break;
case 'general':
    mainUrl = 'http://localhost:3000/books/generals/' 
    break;
case 'test books':
mainUrl = 'http://localhost:3000/books/test_books/' 
break;
}

console.log(mainUrl)
// set delete request url
const URL = mainUrl + bookID



// text for alt attribute on image of book to be deleted
let altText = 'book image for deletion - book name:' + bookTitle

// toastify 'success' if delete is successful
const giveSuccessToast = () =>{

// success result message
    let successText = 'the book: ' + ' ' + bookTitle + ' ' + ' was successfully deleted - ' 

    // success toast
    toast.success(successText, {
      // set toast position
  position: toast.POSITION.TOP_CENTER
    });




resetPage()


}


// toastify 'cancel' if delete is successful
const giveCanceledToast = () =>{

    // success result message
        let cancelText = 'book deletion canceled' 
    
        // success toast
        toast.success(cancelText, {
          // set toast position
      position: toast.POSITION.TOP_RIGHT
        });
    
        setDeleteModal('hide')
    
    }

    const confirmDelete = async() =>{

        

        try{

            // note, the address below is for getting books from local host, but for some reason, even though I was able to post a new book to mongoDB atlas, it is not appearing on the math books page; so maybe the below URL is the wrong one, i.e. 'http://localhost:3000/books/mathematics' might need to change to an address which corresponds to the atlas server. - solved. In the backend route for mathematics, I had specified that only 5 books should be shown per page, and the default page number 'zero' was being used, so if there were more than 5 books in the collection, book 6 onward would not show. 

            let del = await axios.delete(URL)
            .then(res =>{        
  console.log(res)


giveSuccessToast(res)

            })
      
        }
        catch(err){
            console.log(err)
                 let errorText = 'Alert' +  err.response.statusText +': ' + err.response.status
            toast.error(errorText, {
                    // set toast position
                position: toast.POSITION.TOP_RIGHT
              });

        }



    }



return(
    <>
            <div className="delete-modal">



                <div className="delete-modal-content">
<div className="delete-book-div">
<img className='delete-book-image' src={bookImageUrl} alt={altText}/>
</div>


                <h4>Do you want to delete this book? -: <br></br><span>{bookTitle}</span></h4>


<div className="delete-modal-btn-div">
<button className="delete-modal-btns" onClick={() =>{
            // hide the modal with cancel button
            giveCanceledToast() 
        }}>Cancel delete</button>


        <button className="delete-modal-btns" onClick={() =>{
            // hide the modal with cancel button
            confirmDelete()
        }}>Confirm delete</button>

</div>



                </div>


        </div>

    
    </>
)

}