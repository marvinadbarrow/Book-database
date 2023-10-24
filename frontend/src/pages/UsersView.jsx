import { useEffect, useState } from "react"
import axios from 'axios'

export const UsersView = () =>{
const [returnedUsers, setReturnedUsers] = useState([])


    const showUsers = async() =>{

        let users = await axios.get('http://localhost:5000/users')
        .then(res =>{
let userList = res.data.allUsers
   if(userList.length > 0){
    setReturnedUsers([...userList])
   }
  
        })


    }

    return(

        <>

<h1>Database Users</h1>

        <div className="users-div">
           
{
    returnedUsers.length > 0 && // if there are users
    returnedUsers.map(userx =>{ // map the array
            
        return ( // return each user's details in unordered list
            <>
            <div className="individual-user">
           
            <p className="user-data">Name: {userx.firstName}</p>
            <p className="user-data">Email: {userx.email}</p>
            <p className="user-data">Role: {userx.role}</p>
            <p className="user-data">User_ID: {userx._id}</p>
          
            </div>

            </>
        )

    
    })
}
           
        </div>
        <div className="users-btn-div">
        <button className="view-users" onClick={showUsers}>Show Database Users</button>
        </div>
        </>
    )



}