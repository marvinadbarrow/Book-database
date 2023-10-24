// the controller is basically the callback function which dictates what happens when a request is sent to the route. The route is just the API end point.  The  callback will respond, either with error message or something or some confirmation that all is well, and the resource that was called for gets sent to the client, whether that be a web page, or an image or some other object.  If it were not for the callback, the client would not have any information to give the user if there were issues with the request or the server. The front end can take the response data and format it to be of use to the user at client end.  The callback is basically a set of conditions that, if met, will allow the resource to be sent to the client, and, if not, will generate some kind of error to send back to the client, which can be interpreted, formated and rendered to the user. 

// so an XML request consists of GET(URL, options), and if the URL doesn't exist on the endpoint, then an ERROR message is returned to the user, and with POST(URL, data, options), data is sent with a request to post it to the endpoint... if something is wrong in the data, then the conditions in the callback associated with the route will be triggered, and a response will be sent back to the user indicating such. 

const userSchemaModel = require('../schemas/user_schema')
const bodyParser = require('body-parser')
const ErrorResponse = require('../error handlers/custom_error')
// CREATING A NEW USER
// callback function for user route
exports.signup = async (req, res, next) =>{
    const {email} = req.body // destructure email from request body

    // check if in the 'user' collection if email already exists (USEFUL FOR PREVENTING DUPLICATES)
    const userExists = await userSchemaModel.findOne({email})
console.log(userExists)
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
console.log(error.name)
next(error)
 }
}


// EXISTING USER SIGN IN
// callback function for user route
exports.login = async (req, res, next) =>{
    try{
      
        const {email, password} = req.body // destructure request body for email and password
// check those actually exist
        if(!email || !password){ // if either are missing process error
return next(new ErrorResponse("email and password are required"),400 ) }


        //if email and pw are present, check if any email in the DB matches req.body email, and if so, assign the user associated with the email the userDetails variable. 
        const userDetails = await userSchemaModel.findOne({email:email})
        console.log(userDetails)
        if(!userDetails){ // if the email isn't found, could be wrongly inputted email or not at all in system
         return   next(new ErrorResponse("invalid credentials"),400 )
        }



    // if the email is valid, verify password matches user. 
        const isMatched = await userDetails.comparePassword(password);
        if(!isMatched){ // if is matched is not true (i.e. the password doesn't natch anything in the usermodels, the collection)
        return    next(new ErrorResponse("invalid credentials"),400 )
        }

        generateCookieToken(userDetails, 200, res) // this calls the function for generating web tokens and saving to cookie; arguments are  the user details, statusCode 200 the response object?? 


    }catch(error){ // if any of the above tests fail, the user has done something incorrect so render success false and alert user 
console.log(error)
next(new ErrorResponse("cannot log in, please check your credentials"),400 )
    }
}

// GENERATE JWT token and cookie (the token is stored in the cookie)
const generateCookieToken = async (userDetails, statusCode, res) =>{
    const webToken = await userDetails.generateWebToken() // this is string value generated and returned by jwt.sign() which is inside the function on userSchema module. The function was created as a custom method on the schema. The function is executed on user details, and uses the users ID, along with the JWT_SECRET that you set up in .env, and an expiry time, to return a token using jwt.sign(), and the token is what is awaited here; and when it returns is assined the variable 'webToken'. 

    let expiryInteger = 1*60*60*1000
    console.log(expiryInteger)
    const cookieOptions = { // create options for the .cookie() method
        httpOnly:true,
        expires: new Date(Date.now() + expiryInteger) // this is the now time plus one hour
    };
    res.status(statusCode) // this will be 200
    .cookie('token', webToken, cookieOptions) // the cookie method takes a name as the first argument, the returned webtoken as the second, and the cookie options created earlier; as the last argument.   
    .json({ // render a json object to show success and the webtoken
        success:true,
        webToken
    })
}

//  LOGOUT
exports.logout = (req, res, next) =>{
    res.clearCookie('token')
    res.status(200).json({
        success:true,
        message:"logged out"
    })
}

// GET USER BY ID (this might be used by an administrator to see if a user exists and if they do, then to view their details; which makes sense that it would be the callback in a GET request)
exports.singleUser = async (req, res, next) =>{
// get user from collection using id which is the query parameter set in the get url


    try{
        // note.. dropping the object directly into the argument of find(), i.e. doing find({field:value}) causes the try to pass errors; even if user doesn't exist you get a pass, but an empty array is returned. And it seems to cause issues with further attempts to login.. 
    let query = {_id:req.params._id}
        const userExists = await userSchemaModel.find(query)
        console.log('does user exist?')
    console.log(userExists)
        console.log('what is ID?')
    console.log(req.params._id)

        res.json({
            success:true,
            userExists
        }) // for the moment render successful finds to the result body
    } catch (error){
    //    console.log(error)
    //    res.status(400).json({
    //     success: false,
    //     message: error.message
    //    })
  return  next(error )
    }

   
    
}


exports.usersView = async (req, res, next) =>{

    try {


        // find all users and assign variable 
        const allUsers = await userSchemaModel.find()

        if(allUsers){
            
            res.json({
                success:true,
                allUsers
            }) 
        }
        else(
            res.json({
                success:false,
                "Error": "no users found"
            }) 
        )
    } catch (error){
        return next (error)

    }

  

}
