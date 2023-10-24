import { useState } from 'react';
import axios from 'axios';
export const Login = () =>{

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
                        setCredentials({
                            email:'',
                            password:''
                                })
                            }

            })
 
        }
        catch(err){
            console.log(err.message)
        }
     
    

    
    
    }



    return(
       <>
    
        <p className="signin-para">sign in to your account</p>


       <form className="form">

<div className="form-element">
<div className="email">
    <label className='form-label' htmlFor="email">Email</label>
    <input type='text' name='email' id='email' placeholder='first name' onChange={handleChange} value={credentials.email}/>
</div>
</div>


<div className="form-element">
<div className="password">
    <label className='form-label' htmlFor="password">PASSWORD</label>
    <input type='text' name='password' id='password' placeholder='first name' onChange={handleChange} value={credentials.password}/>
</div>
</div>

<button className='test-btn' onClick={handleSubmit}>Sign In</button>


       </form>

       </>
    )
}