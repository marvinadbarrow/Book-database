const express = require("express")
const mongoose = require("mongoose")
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
require('dotenv').config()
const PORT = process.env.PORT || 3000
const booksrRoutes = require('../routes/user_books') // this is actually the express.Router
const userRoute = require('../routes/user_route')
const morgan = require('morgan')
const connectionString = process.env.CONNECTION_STRING
const booksUrl = process.env.BOOKS_DATABASE  // URL for books DB in dotenv
const url = booksUrl

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
app.use(bodyParser.json())
app.use(userRoute) // this is just 'one' route, the book and music routers are several and they are connecting to the mongoose/mongodb
app.use(booksrRoutes)


// MIDDLEWARE - basically a get request to access static web pages or files (files needed for browser to render the page)
app.use('/static_assets', express.static('public')) // access files in the 'public' folder (might keep images here); the '/static_assets' folder is a pseudo folder - so to access the files in the 'images' folder, which is inside the public folder, use /static_assets/images/filename.extension

app.use('/static', express.static('src')) // access files inside the 'src' folder (JS, CSS and HTML files) This is a pseudo path that doesn't actually exist in your file system and is done for security reasons to prevent access to the website public files- access the files using /psuedo folder/ + file name.  If it's the source file with the HTML JavaScript and CSS files then just use localhost:PORT/src and that will open the HTML page correctly formatted with CSS(I assume the JS functions should work)

// console.log('books router')
// console.log(booksrRouter)
console.log(userRoute)


