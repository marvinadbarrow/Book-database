import { useState } from 'react';
export const Signin = () =>{


    const handleSubmit = async (e) =>{
        e.preventDefault()
    
        let signinObj = {
              "email":email,
            "password":password
        }
    
        console.log(signinObj)
        // try{
    
        //     // const userLogin = await axios.post('/signup', signinObj)

    
        //     if(userLogin.data.success === true){
        //         setEmail('')
        //         setPassword('')
        //     }
        // }
        // catch(err){
        //     console.log(err.message)
        // }
     
    
        // then you'll have to send this in a post request to the backend
    
    
    }

const apiCall = (e) =>{
e.preventDevault()

}

    return(
       <>
    
        <p className="signin-para">sign in to your account</p>


       <div className="form">

<div className="form-element">
<div className="email">
    <label className='form-label' htmlFor="email">First Name</label>
    <input type='text' name='' id='email' placeholder='first name'/>
</div>
</div>


<div className="form-element">
<div className="password">
    <label className='form-label' htmlFor="password">First Name</label>
    <input type='text' name='' id='password' placeholder='first name'/>
</div>
</div>

<button className='test-btn' onSubmit={() =>{
        handleSubmit()
      }}>Sign In</button>


       </div>

       </>
    )
}