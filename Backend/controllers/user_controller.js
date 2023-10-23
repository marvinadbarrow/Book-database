
// controller handles the logic for user route



const userSchemaModel = require('../schemas/user_schema')
const bodyParser = require('body-parser')
const ErrorResponse = require('../error handlers/custom_error')
// CREATING A NEW USER
// callback function for user route
exports.signup = async (req, res, next) =>{
    const {email} = req.body // destructure email from request body

    // check if in the 'user' collection if email already exists (USEFUL FOR PREVENTING DUPLICATES)
    const userExists = await userSchemaModel.findOne({email})

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
        // check if there if email or password are missing and render success false if true
        const {email, password} = req.body // destructure request body for email and password

        if(!email || !password){ // if either are missing
return next(new ErrorResponse("email and password are required"),400 ) }

        // check existence of user email - this gets the whole object as it is on the db and checks the particular key:value pair, await since the search could be long
        const userDetails = await userSchemaModel.findOne({email:email})
        console.log(userDetails)
        if(!userDetails){ // if the email isn't found, could be wrongly inputted email or not at all in system
         return   next(new ErrorResponse("invalid credentials"),400 )
        }

        // verify user password. 
        const isMatched = await userDetails.comparePassword(password);
        if(!isMatched){ // if is matched is not true (i.e. the password doesn't natch anything in the usermodels, the collection)
        return    next(new ErrorResponse("invalid credentials"),400 )
        }

        generateCookieToken(userDetails, 200, res) // this calls the function for generating web tokens and saving cookies, using the user details, 200 for the statusCode and the response object?? 


    }catch(error){ // if any of the above tests fail, the user has done something incorrect so render success false and alert user 
console.log(error)
next(new ErrorResponse("cannot log in, please check your credentials"),400 )
    }
}

// GENERATE JWT token and cookie
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

// GET USER BY ID
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

