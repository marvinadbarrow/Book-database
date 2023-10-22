
// controller handles the logic for user route



const userSchemaModel = require('../schemas/user_schema')
const bodyParser = require('body-parser')

// CREATING A NEW USER
// callback function for user route
exports.signup = async (req, res, next) =>{
    const {email} = req.body // destructure email from request body

    // check if in the 'user' collection if email already exists (USEFUL FOR PREVENTING DUPLICATES)
    const userExists = await userSchemaModel.findOne({email})

    //if email exists, it's a duplicate so give error emssage. 
    if(userExists){
        return res.status(400).json({
            
            success:false,
            message: 'email already exists'
        
        })
    }


    // this will not run if the above check fails (find out how this works)
 try {

    // create a new user using the request body, which will be a json document for the database, with 'firstName', 'email' and 'password' as fields with completed values
    const newUser = await userSchemaModel.create(req.body)
res.status(201).json({ // render a json object with success message , and also new user object
            
    success:true,
    newUser

})
 }catch(error){
console.log(error)
res.status(400).json({
   // if creation of new user fails then alert user with error message (if the process fails)
    success:false,
    message: error.message
})
 }
}


// EXISTING USER SIGN IN
// callback function for user route
exports.login = async (req, res, next) =>{
    try{
        // check if there if email or password are missing and render success false if true
        const {email, password} = req.body // destructure request body for email and password
        if(!email || !password){ // if either are missing
            return res.status(400).json({ // render error message with json object with success false and a message to user
                success:false,
                message: "email and password are required"
            })
        }

        // check existence of user email
        const userEmail = await userSchemaModel.findOne(email)
        if(!userEmail){ // if the email isn't found, could be wrong email or not at all in system
            return res.status(400).json({ // alert user with success failed and error message
                success:false,
                message: "invalid credentials"
            })
        }
    }catch(error){ // if either of the above tests fail to run, then catch the error (if the process fails)
console.log(error)

    }
}