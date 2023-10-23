// bring the custome error response here to use in the error handler. 
const ErrorResponse = require("./custom_error")

// this error handler is for SERVER errors
 const errorHandler = (err, req, res, next) =>{
    console.log(err)
let error = {...err}
error.message = err.message
    // mongoose bad objectId
    // if the error is a cast error then use the following message for response
    if(err.name === 'CastError'){
        const message = 'resource not found'
        error = new ErrorResponse(message, 404)
    }
// if error code returned by database is 11000 (due to duplicate email at attempted signup)
if(err.code === 11000){
    const message = 'Duplicate email value entered'
    error = new ErrorResponse(message, 404)
}

if(err.name === 'ValidationError'){
    const message = Object.values(err.errors).map(value =>value.message)
    error = new ErrorResponse(message, 404)
}

    console.log('error has occurred' + err.message)
    res.status(error.status || 500).json({
        success:false, 
        error: error.message || 'server error'
            })
}

module.exports = errorHandler;


/*

    "firstName": "mynameWasMarvin",
    "email": "mynameWasMarvin@gmail.com",
    "password": "mynameWasMarvinDef456"

*/