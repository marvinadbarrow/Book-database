import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useState } from 'react';
import axios from 'axios';


export const AdminSignIn = () =>{

    const [credentials, setCredentials] = useState({
        email:'',
        password:''
    })



const handleChange = (e) =>{
    e.preventDefault()
    let name = e.target.name
    let value = e.target.value

    setCredentials(prevCred =>{
        return{
            ...prevCred,
            [name]: value,
        }
  
        })
    }
    const handleSubmit = async (e) =>{
        e.preventDefault()

            try{
 
        const userLogin = await axios.post('http://localhost:5000/login', credentials).then(res =>{
            console.log(res.data)

            // reset fields if login is successful
                        if(res.data.success === true){

                            toast.success(` ${credentials.email} successfully logged in`, {
                                position: toast.POSITION.TOP_CENTER
                              })

                    setCredentials({
                        email:'',
                        password:''
                            })
                          
                        }
        })
 
        }
        catch(err){
   
     
            let errorMessage = err.response.data.error
               toast.error(errorMessage, {
                position: toast.POSITION.TOP_RIGHT
              })
        }
         }

    return(

        <>
    
        <p className="signin-para">Log in to ADMIN page</p>


       <form className="admin-form">
       <div className="input-container">


<div className="form-element">
<div className="email mb-3">
    <label className='form-label' htmlFor="email">Admin email</label>
    <input type='text' name='email' id='email' placeholder='admin email' onChange={handleChange} value={credentials.email} className='form-control'/>
</div>
</div>


<div className="form-element">
<div className="password mb-3">
    <label className='form-label' htmlFor="password">Admin password</label>
    <input type='text' name='password' id='password' placeholder='admin password' onChange={handleChange} value={credentials.password} className='form-control'/>
</div>
</div>

</div>
<button  className="btn btn-primary btn-lg"  onClick={handleSubmit}>Log In</button>


       </form>
       <ToastContainer />
       </>
      
    )
}