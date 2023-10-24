import { useState } from 'react';
import axios from 'axios'

// import toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export const SignUp = () =>{



const [credentials, setCredentials] = useState({
    firstName:'',
    email:'',
    password:''
})


// test for notify
const notify = (message, type) =>{

    switch(type){
case 'success':   toast.success(message, {
    position: toast.POSITION.TOP_CENTER
  });
break;
default:  toast.error(message, {
    position: toast.POSITION.TOP_RIGHT
  })
    }

} 


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

// post form details on click
const handleClick = async (e) =>{
    e.preventDefault()
    try{
        console.log('submitting form')

   let testPost = await axios.post('http://localhost:5000/signup', credentials)
   .then(res =>{
    console.log(res.data)

            // success message for 'toast' 
    let successMessage = `user, ${credentials.email} successfully created`
    notify(successMessage, 'success')
   })

        // because we're not sending the form, the values inside the form need to be cleared
    }
    catch(err){
        // error message for 'toast' 
        let errorMessage = err.response.data.error
          notify(errorMessage, 'error')
    }
}




    return(
        <>
        <p className="signin-para">Sign up for an account</p>



       <form action="" className="signup-form">
<div className="form-element">
<div className="firstName">
    <label className='form-label' htmlFor="firstName">First Name</label>
    <input  onChange={handleChange}  value={credentials.firstName} type='text' name='firstName' id='firstName' placeholder='first name'/>
</div>
</div>


<div className="form-element">
<div className="email">
    <label className='form-label' htmlFor="email">Email</label>
    <input  onChange={handleChange}  value={credentials.email} type='text' name='email' id='email' placeholder='first name'/>
</div>
</div>


<div className="form-element">
<div className="password">
    <label className='form-label' htmlFor="password">Password</label>
    <input  onChange={handleChange}  value={credentials.password} type='text' name='password' id='password' placeholder='first name'/>
</div>
</div>

<button className='test-btn' onClick={handleClick}>Sign Up</button>
</form>
        


<div>
           <ToastContainer />
      </div>
        </>
          
    )
}