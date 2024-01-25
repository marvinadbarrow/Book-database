import { useEffect, useState } from 'react';
import axios from 'axios'

// import toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FormButtonsContainer } from '../components/FormButtonsContainer';


export const AddNewBook = ({setNewBookForm,categoryName, bookType}) =>{

console.log('type of book - add new book line 12')
console.log(bookType)

console.log('category of book - add new book line 15')
console.log(categoryName)




const [numberOfRenders, setNumberOfRenders] = useState(0)
const [formErrors, setFormErrors] = useState({})
// object whose fields will be used to create a new book. 


const [credentials, setCredentials] = useState({
    Title:'',
    Author:'',
    Edition:'', 
    Publisher:'',
    Language:'',
    Genres:'', 
    Format:'',
    Pages:'',
    ISBN_10:'', 
    ISBN_13:'',
    ASIN:'',
    Dimensions:'', 
    BuyUrl:'',
    ImgUrl:'',
    Description:''
})

console.log('credentials')
console.log(credentials)
console.log(numberOfRenders)






// function for display changing inputs text
const handleChange = (e) =>{

let name = e.target.name
let value = e.target.value


setCredentials(lastInput =>{

    return {
        ...lastInput,
        [name]:value,
    }
})

}




const createNewBook = async() =>{

console.log('all required fields are filled in, posting book...')


// variable for setting url for POST request
let mainUrl;
switch(categoryName){
    case 'maths': 
mainUrl = 'http://localhost:3000/books/mathematics';
break;
case 'stems':
mainUrl = 'http://localhost:3000/books/other_stems'
    break;
case 'kindle maths':
mainUrl = 'http://localhost:3000/books/kindle_maths'
break;
case 'kindle stems':
    mainUrl = 'http://localhost:3000/books/kindle_stems'
    break;
case 'general':
    mainUrl = 'http://localhost:3000/books/generals/' 
    break;
case 'test books':
mainUrl = 'http://localhost:3000/books/test_books' 
break;
}




        try{


            let testPost = await axios.post(mainUrl, credentials)
            .then(res =>{
             console.log(res.data)
         
                     // success message for 'toast' 
             let successMessage = `book, ${credentials.Title} successfully created`
             toast.success(successMessage, {
                 // position where the toast popup displays (where it appears from)
                 position: toast.POSITION.TOP_RIGHT


               })

                                // CLEAR FORM FIELDS
                                setNewBookForm('hide')
            })
         
                 // because we're not sending the form, the values inside the form need to be cleared
             }
             catch(err){
                 // error message for 'toast'  (I had to search to find this in the returned error)
                 let errorMessage = err.response.data.error
                 // set toast popup to appear in a different location
                 toast.error(errorMessage, {
                     position: toast.POSITION.TOP_CENTER
                   });
             }

}




// when the formErrors object state is change as a result of the form's 'add book' button being clicked,  use 'useEffect' will check the object and execute the post request if the object is empty or alert user of incomplete 'required' fields with a toast container. 
useEffect(() =>{
if(Object.keys(formErrors).length > 0){
    // toastify code should go here

    let successMessage = `some required form fields are empty`
        toast.success(successMessage, {
            // position where the toast popup displays (where it appears from)
            position: toast.POSITION.TOP_RIGHT

        })

}else{
    // there are no form errors so run the function which makes a post request to create a new book. 
    if(numberOfRenders > 0){
        createNewBook()
    }
}


    // createNewBook(formErrors)   
},[formErrors]);

// handle form submit
const handleClick = (e) =>{

    console.log('handling click - line 83')
    e.preventDefault()
    const credentialsValidation = {}
// when 'add book' button on the form is clicked, a check is made to see if any required fields are still empty and for each empty field an object key is added to the credentialsValidation object, with a warning message as the object's value.  


    if(!credentials.Title){
        console.log('title field is empty')
        credentialsValidation.Title = ' * book title is required'
        console.log(credentialsValidation)
    }
    if(!credentials.Author){
        credentialsValidation.Author = ' * book author is required'
    }
    if(!credentials.Language){
        credentialsValidation.Language = ' * book language is required'
    }
    if(!credentials.Format){
        credentialsValidation.Format = ' * book format is required'
    }
    if(!credentials.ISBN_10){
        credentialsValidation.ISBN_10 = ' * book ISBN_10 is required'
    }
    if(!credentials.Dimensions){
        credentialsValidation.Dimensions = ' * book dimensions is required'
    }
    if(!credentials.Description){
        credentialsValidation.Description = ' * book description is required'
    }

    // once all 'required' fields are checked, set form errors state as the credentialValidation object - the object will either have key values or be empty (if form is correctly completed)

    setFormErrors(credentialsValidation)
setNumberOfRenders(1)
        }

    return(
        <>
        <p className="signin-para">Add a new book (admin only)</p>



       <form action="" className="signup-form">

<div className="input-container">

<div className="form-element">
<div className="title mb-3">
    <label className='form-label' htmlFor="title">Title

    {credentials.Title == '' && !formErrors.Title &&<span className='validation-failed-span'> * required</span>}

    {formErrors.Title && credentials.Title == '' && <span className='validation-failed-span'>{formErrors.Title}</span>}
    
    </label>
    <input  onChange={handleChange}  value={credentials.Title} type='text' name='Title' id='title' placeholder='Book Name' className='form-control'/>


</div>
</div>


<div className="form-element">
<div className="author mb-3">
    <label className='form-label' htmlFor="author">Author

    {credentials.Author == '' && !formErrors.Author &&<span className='validation-failed-span'> * required</span>}

    {formErrors.Author && credentials.Author == '' && <span className='validation-failed-span'>{formErrors.Author}</span>}
        
        </label>
    <input  onChange={handleChange}  value={credentials.Author} type='text' name='Author' id='author' placeholder='Author' className='form-control'/>




</div>
</div>


<div className="form-element">
<div className="edition mb-3">
    <label className='form-label' htmlFor="edition">Edition</label>
    <input  onChange={handleChange}  value={credentials.Edition} type='text' name='Edition' id='edition' placeholder='Edition' className='form-control'/>
</div>
</div>

<div className="form-element">
<div className="publisher mb-3">
    <label className='form-label' htmlFor="publisher">Publisher</label>
    <input  onChange={handleChange}  value={credentials.Publisher} type='text' name='Publisher' id='publisher' placeholder='Publisher' className='form-control'/>
</div>
</div>

<div className="form-element">
<div className="language mb-3">
    <label className='form-label' htmlFor="language">Language
    
    {credentials.Language == '' && !formErrors.Language &&<span className='validation-failed-span'> * required</span>}

{formErrors.Language && credentials.Language == '' && <span className='validation-failed-span'>{formErrors.Language}</span>}     
    
    </label>
    <input  onChange={handleChange}  value={credentials.Language} type='text' name='Language' id='language' placeholder='Language' className='form-control'/>


</div>
</div>

{
// a shortcut can be used here to render either an empty, editable 'format' field for physical books, or a read only format field, displaying the word 'KINDLE' for digital books. 

<div className="form-element">
<div className="format mb-3">
    <label className='form-label' htmlFor="format">Format
    </label>
    { // use input value 'kindle' which user cannot edit if a digital book is being created. 
        bookType == 'digital'? 
        <input  value={'KINDLE'} type='text' name='Format' id='format' readOnly={true} className='form-control'/>:

// otherwise make the input editable
<>
{credentials.Format == '' && !formErrors.Format &&<span className='validation-failed-span'> * required</span>}

{formErrors.Format && credentials.Format == '' && <span className='validation-failed-span'>{formErrors.Format}</span>} 
    

    <input  onChange={handleChange}  value={credentials.Format} type='text' name='Format' id='format' placeholder='Format' className='form-control'/>

    </>





    }



</div>
</div>
}



<div className="form-element">
<div className="pages mb-3">
    <label className='form-label' htmlFor="pages">Pages</label>
    <input  onChange={handleChange}  value={credentials.Pages} type='number' name='Pages' id='pages' placeholder='Total pages' className='form-control'/>
</div>
</div>



{
// NOTE: ISBN-10, ISBN-13 and Dimensions are not used for kindle books so hide those fields when creating a new kindle book
bookType !== 'digital' &&
<>
<div className="form-element">
<div className="isbn10 mb-3">
    <label className='form-label' htmlFor="isbn10">ISBN-10</label>
    <input  onChange={handleChange}  value={credentials.ISBN_10} type='text' name='ISBN_10' id='isbn10' placeholder='ISBN-10' className='form-control'/>
</div>
</div>


<div className="form-element">
<div className="isbn13 mb-3">
    <label className='form-label' htmlFor="isbn13">ISBN-13</label>
    <input  onChange={handleChange}  value={credentials.ISBN_13} type='text' name='ISBN_13' id='isbn13' placeholder='ISBN-13' className='form-control'/>
</div>
</div>

<div className="form-element">
<div className="dimensions mb-3">
    <label className='form-label' htmlFor="dimensions">Dimensions
    
    {credentials.Dimensions == '' && !formErrors.Dimensions &&<span className='validation-failed-span'> * required</span>}

    {formErrors.Dimensions && credentials.Dimensions == '' && <span className='validation-failed-span'>{formErrors.Dimensions}</span>}    
    
    </label>
    <input  onChange={handleChange}  value={credentials.Dimensions} type='text' name='Dimensions' id='dimensions' placeholder='Dimensions' className='form-control'/>

</div>
</div>

</>

}


{
// ASIN is used for Amazon's version of ISBN and mainly on kindle books it looks like so only display ASIN on digital books and make it a required field. 
bookType == 'digital' &&
<div className="form-element">
<div className="asin mb-3">
    <label className='form-label' htmlFor="asin">ASIN

    {credentials.Format == '' && !formErrors.Format &&<span className='validation-failed-span'> * required</span>}

{formErrors.Format && credentials.Format == '' && <span className='validation-failed-span'>{formErrors.Format}</span>} 
    
    
    </label>
    <input  onChange={handleChange}  value={credentials.ASIN} type='text' name='ASIN' id='asin' placeholder='ASIN' className='form-control'/>
</div>
</div>

}






<div className="form-element">
<div className="buyurl mb-3">
    <label className='form-label' htmlFor="buyurl">BuyUrl</label>
    <input  onChange={handleChange}  value={credentials.BuyUrl} type='text' name='BuyUrl' id='buyurl' placeholder='Buy URL' className='form-control'/>
</div>
</div>


<div className="form-element">
<div className="imgurl mb-3">
    <label className='form-label' htmlFor="imgurl">ImgUrl</label>
    <input  onChange={handleChange}  value={credentials.ImgUrl} type='text' name='ImgUrl' id='imgurl' placeholder='image URL' className='form-control'/>
</div>
</div>


<div className="form-element">
<div className="description mb-3">
    <label className='form-label' htmlFor="description">Description
    
    {credentials.Description == '' && !formErrors.Description &&<span className='validation-failed-span'> * required</span>}

    {formErrors.Description && credentials.Description == '' && <span className='validation-failed-span'>{formErrors.Description}</span>}     
    
    </label>
    <input  onChange={handleChange}  value={credentials.Description} type='text' name='Description' id='description' placeholder='Description' className='form-control'/>

</div>
</div>


</div>

<FormButtonsContainer handleClick={handleClick}/>
</form>
        


<div>
           <ToastContainer />
      </div>
        </>
          
    )
}

