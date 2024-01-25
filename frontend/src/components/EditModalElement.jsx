import { useEffect, useState } from "react"
import axios from 'axios'
// import toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { generatePath } from "react-router-dom";


export const EditModalElement = ({bookID, bookTitle, setEditModal, bookImageUrl, resetPage, categoryName, thisBook}) =>{

    // below variables change state to 'show' when an option is selected in select menu, which will cause an input to appear
    const [updatedGenres, setUpdatedGenres] = useState('hide')
    const [updatedDescription, setUpdatedDescription] = useState('hide')

    // variable for description text
    const [descriptionText, setDescriptionText] = useState('')

    // variables for genere input
    const [genresInput, setGenresInput] = useState('')
    // variable for genre array, each time the add button for genres input is clicked. 
    const [genresArray, setGenresArray] = useState([])



 // update object for description (second parameter in paste request)
 const descriptionOjb = {
    Description: descriptionText
 }

 // set a useEffect to populate descriptionObj when descriptionText is updated

  // update object for genres (second parameter in paste request)
const genresObj = {
    Genres: genresArray
}

let patchObj; 
// renders input linked to selected option for edit
const showInput = (target) =>{
switch(target){
    case 'genres':
        setUpdatedGenres('show')
        updatedDescription == 'show' && // hide description text box if it is showing
        setUpdatedDescription('hide')
        break;
    case 'description':
        setUpdatedDescription('show')
        updatedGenres == 'show' && // hide genres text box if it is showing
        setUpdatedGenres('hide')
        break;
}

}


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


// set delete request url
const URL = mainUrl + bookID

// the update object can contain a key/value pair where the value is either a string (for description update) or an array, (for genres update). 


// text for alt attribute on image of book to be deleted
let altText = 'book image for edited book - book name:' + bookTitle

// toastify 'success' if delete is successful
const giveSuccessToast = () =>{

// success result message
    let successText = 'the book: ' + ' ' + bookTitle + ' ' + ' was successfully edited - ' 

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
        let cancelText = 'book edit canceled' 
    
        // success toast
        toast.success(cancelText, {
          // set toast position
      position: toast.POSITION.TOP_RIGHT
        });
    
        setEditModal('hide')
    
    }

const emptyUpdatetoast = (errorText) =>{ 
    
        // set error, with above text
        toast.error(errorText, {
          // set toast position
      position: toast.POSITION.TOP_RIGHT
        });

}
   


const confirmEdit = async() =>{

  // the patch request takes two parameters. 1) the URL of the book collection, which includes the id of the book to be edited and, 2) an object containing a key/value pair; the property to be updated and its new value. The object of the second parameter is either a description object or a genres object.  To determine which object is to be sent, check both the updatedGenres and updatedDescription states; the state that equals 'show' dictates what the object to be sent contains

  updatedDescription == 'show'? 
  
  patchObj =  {
    Description: descriptionText
 }
  
  : 
  patchObj =  {
    Genres: genresArray
}

console.log('patchObj')
console.log(patchObj)

        try{

            // note, the address below is for getting books from local host, but for some reason, even though I was able to post a new book to mongoDB atlas, it is not appearing on the math books page; so maybe the below URL is the wrong one, i.e. 'http://localhost:3000/books/mathematics' might need to change to an address which corresponds to the atlas server. - solved. In the backend route for mathematics, I had specified that only 5 books should be shown per page, and the default page number 'zero' was being used, so if there were more than 5 books in the collection, book 6 onward would not show. 



            let del = await axios.patch(URL, patchObj)
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



                <div className="edit-modal-content">
<div className="delete-book-div">
<img className='delete-book-image' src={bookImageUrl} alt={altText}/>
</div>


                <h4>{bookTitle}<br></br><span>Select detail to update -: </span></h4>
                
                <div className="detail-select">
  <select onChange={(e) =>{
    showInput(e.target.value)
  }}>
    <option value="0">Select detail:</option>
    <option value="genres">Genres</option>
    <option value="description">Description</option>
  </select>
</div>

{// INPUT FOR GENRES EDIT
    updatedGenres == 'show' &&
    <>

    <div className="genre-add-div">
    <div className="genre-input-div">
    <label htmlFor="genres-input" placeholder="GENRE">Add genre</label>
<input id="genres-input" type="text" 
value={genresInput}
onChange={(e) =>{
    setGenresInput(e.target.value)
}}
/> 
        </div>


{
    // BUTTON FOR ADDING GENRE TO ARRAY
}
<button className="genre-add-btn"
onClick={() =>{

    setGenresArray(previousArray =>{
        return[
            ...previousArray,
            genresInput ]

    }
        )


        
        setGenresInput('')

}}
>Add</button>
    </div>

    <span>
        Genres:
{// SHOW ADDED GENRE AS BULLETED LIST
genresArray.map(genre =>{
    return(
        <li>{genre}</li>
    )
})}
    </span>
    </>


}

{// TEXT AREA FOR BOOK DESCRIPTION EDIT
    updatedDescription == 'show' &&
    <textarea placeholder="type or paste a description"
    // the displayed value comes from the saved state
    value={descriptionText}
    
    onChange={(e) =>{
        // only if two or more characters are entered
        console.log(e.target.value)
        e.target.value.length > 0 &&
        // as input value changes, set state
        setDescriptionText(e.target.value)

            }}>

    </textarea>
}

<div className="delete-modal-btn-div">
<button className="delete-modal-btns" onClick={() =>{
            // hide the modal with cancel button
            giveCanceledToast() 
        }}>Cancel update</button>


        <button className="delete-modal-btns" onClick={() =>{
            // hide the modal with cancel button

            // only confirm update if either update details state is populated
            if(genresArray.length > 0 || descriptionText !== ''){
                confirmEdit()
            }else{
            // otherwise no update exists yet so; create error text variable
                let errorText;
                // shortcut to assign error text
                updatedDescription == 'show'? errorText ='no description added - please add text for description update,':
                errorText ='no genre added - input text and use the ADD button to add a genre'
                emptyUpdatetoast(errorText)
            }

        }}>Confirm update</button>

</div>



                </div>


        </div>
<ToastContainer/>
    
    </>
)

}