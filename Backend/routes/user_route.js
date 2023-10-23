const express = require('express')
const userRoute = express.Router()
const {signup, login, logout, singleUser} = require('../controllers/user_controller')


// controllerTest is the exported callbackfunction which has the (req,res) details and the => message to the page, so user route becomes an instance of a get request, and is exported to 'script.js' where app.use() takes it as a parameter and precedes it with the '/api' string .
userRoute.post('/signup', signup) // this get request is made up of the url for the signup page and the call back which was imported from user_controller. The callback handles the  userSchemaModel created in user_schema and passed to the controller. So user route seems to have the same behaviour of each of the routes in user_music and user_books. 
.post('/login', login)
.get('/logout', logout)
.get('/users/:_id', singleUser)

module.exports = userRoute;