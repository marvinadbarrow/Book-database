
// this error handler is for SERVER errors
 const errorHandler = (err, req, res, next) =>{
    console.log('error has occurred' + err.message)
    res.status(err.status || 500).json({
        success:false, 
        error: err.message || 'server error'
            })
}

module.exports = errorHandler;
