const express = require("express")
const app = express()
const mongoose = require("mongoose")

const path = require('path')
const fs = require('fs')
const bodyParser = require('body-parser')
require('dotenv').config()
const PORT = process.env.PORT || 5000
// express router from books route
const booksrRoutes = require('../routes/books_route') 
// express router from kindle route
const kindleBooksrRoute = require('../routes/kindle_route')
// express router from user route
const userRoute = require('../routes/books_route') 
// gives URL, method, timing. 
const morgan = require('morgan')
const connectionString = process.env.CONNECTION_STRING
const booksUrl = process.env.BOOKS_DATABASE  // URL for books DB in dotenv
const cors = require('cors')
const cookieParser  = require('cookie-parser')
const errorHandler = require('../error handlers/error')
const adminRoute = require('../routes/admin_route')
// const url = booksUrl
// const url2 = process.env.ATLAS_DATABASE

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
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true}) // connect to a specific db
.then(() =>{
    console.log('connection successful')
    // only listen to the port if the connection to the database is successful
    app.listen(PORT, (req, res) =>{
        console.log('server running on port 5000');    
    })
})
.catch(err => {
    // make sure the connection string has the name marvinbarrow and the correct password that you set in the authentication where you create a new user for connecting to a database.  In the current case 'marvinbarrow' is the user, for connecting to 'mern-stack-project-1'.  The cluster name is FULL STACK 1. 
    console.log('Oops, something went wrong - app.js line 43 backend: ' + err)
});

app.use(express.json()) // this is used to 'parse' the body in post requests. 
app.use(morgan('dev'))
app.use(cors())
app.use(cookieParser())
app.use(bodyParser.json())


/*
 NOTE: the above middleware needs to be positioned before the routes in order for the routes to gain access to them. 
*/



app.use(userRoute) // for connecting to users
app.use('/books', booksrRoutes) //for connecting to hard copy books database
app.use('/books', kindleBooksrRoute) //for connecting to kindle books database
app.use(adminRoute)  // for connecting to admin user

//error middleware 
app.use(errorHandler)


app.use('/static_assets', express.static('public')) // express.static param is middleware.  The 'public' argument gives the location of the static files. The 'route' given before express.static() can be used as a dummy url addesss to stop malicious users getting to your public folder - it's a mock address line added to public so the real address cannot be seen. 

app.use('/static', express.static('src')) // access files inside the 'src' folder (JS, CSS and HTML files) This is a pseudo path that doesn't actually exist in your file system and is done for security reasons to prevent access to the website public files- access the files using /psuedo folder/ + file name.  If it's the source file with the HTML JavaScript and CSS files then just use localhost:PORT/src and that will open the HTML page correctly formatted with CSS(I assume the JS functions should work)



