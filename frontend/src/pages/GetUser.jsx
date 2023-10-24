import { useEffect, useState } from "react"
import axios from 'axios'

export const GetUser = () =>{

    const [id, setId] = useState('')

    const handleChange = (e) =>{
    setId(e.target.value)
    
    }
    
    
    const handleClick = () =>{
    e.preventDefault()
    let idUrl = '/users/' + id
   console.log(idUrl)
    }

return(
    <>
    <h3 className="users-heading">User Lookup:</h3>

<form action="" className="user-lookup-form">
<div className="form-element">
<div className="userID">
<label className='form-label' htmlFor="userID">user ID</label>
<input  onChange={handleChange}  value={id} type='text' name='userID' id='userID' placeholder='Enter User ID'/>
</div>
</div>

<button className='get-user-btn' onClick={handleClick}>Lookup User</button>
</form>


    </>
)

}

