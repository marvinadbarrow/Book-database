import { useState } from 'react';
import axios from 'axios'
export const SignUp = () =>{



const [credentials, setCredentials] = useState({
    firstName:'',
    email:'',
    password:''
})


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


const handleClick = (e) =>{
    e.preventDefault()

console.log('submitting form')
  console.log(credentials)
    // try{

    //     const signUser = await axios.post('/signup', signupObj)

    //     console.log(signUser)

    //     if(signUser.data.success === true){
    //         setName('')
    //         setEmail('')
    //         setPassword('')
    //     }
    // }
    // catch(err){
    //     console.log(err.message)
    // }
 

    // then you'll have to send this in a post request to the backend


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
        
        </>
        
   
    )
}