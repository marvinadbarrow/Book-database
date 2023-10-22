const express = require("express")
const mongoose = require("mongoose")
const app = express()
const path = require('path')
const fs = require('fs')
const bodyParser = require('body-parser')
require('dotenv').config()
const PORT = process.env.PORT || 3000
const booksrRoutes = require('../routes/user_books') // this is actually the express.Router
const kindleBooksrRoute = require('../routes/user_kindleBooks')
const userRoute = require('../routes/user_route') // route for user signup, login, log out etc
const morgan = require('morgan')
const connectionString = process.env.CONNECTION_STRING
const booksUrl = process.env.BOOKS_DATABASE  // URL for books DB in dotenv
const url = booksUrl
const cookieParser  = require('cookie-parser')
const errorHandler = require('../error handlers/error')


// list names of rating star images
fs.readdir('./star images', (err, files) =>{
if (err){
    throw err;
}else{
    files.map(file =>{
        console.log(file)
     })
}
})



//NOTE --- This is connecting to a DATABASE initially, NOT a collection.  And that's why you're unable to access say, math books and music albums at the same time; because BOOKS and MUSIC are actually different databases.  mongoose.connect(url, cb) connects to a main database. 
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true}) // connect to a specific db
.then(() =>{
    console.log('connection successful')
    // only listen to the port if the connection to the database is successful
    app.listen(PORT, (req, res) =>{
        console.log('server running on port 3000');    
    })
})
.catch(err => {
    console.log('Oops, something went wrong: ' + err)
});

app.use(express.json()) // this is used to 'parse' the body in post requests. 
app.use(morgan('dev'))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(userRoute) 
app.use('/books', booksrRoutes)
app.use('/books', kindleBooksrRoute)


//error middleware 
app.use(errorHandler)

// MIDDLEWARE - basically a get request to access static web pages or files (files needed for browser to render the page)
app.use('/static_assets', express.static('public')) // access files in the 'public' folder (might keep images here); the '/static_assets' folder is a pseudo folder - so to access the files in the 'images' folder, which is inside the public folder, use /static_assets/images/filename.extension

app.use('/static', express.static('src')) // access files inside the 'src' folder (JS, CSS and HTML files) This is a pseudo path that doesn't actually exist in your file system and is done for security reasons to prevent access to the website public files- access the files using /psuedo folder/ + file name.  If it's the source file with the HTML JavaScript and CSS files then just use localhost:PORT/src and that will open the HTML page correctly formatted with CSS(I assume the JS functions should work)




