// this error handler is for CUSTOM errors, the ones caused by user interactions.  Examples:  incorrect email format, missing email or password, incorrect password, incorrect password formate, user email does not exist, user ID does not exist, incorrect ID format. 

class ErrorResponse extends Error{

    constructor(message, statusCode){
        super(message);
        this.statusCode = statusCode
    }
}

module.exports = ErrorResponse




// class Error {
//   constructor(message) {
//     this.message = message;
// this.name = "Error"; different names for different built-in error classes
//     this.stack = <call stack>; // non-standard, but most environments support it
//   }
// }

// note, this extends the javascript Error constructor which (in psuedo code) looks something like the above class/constructor .. 