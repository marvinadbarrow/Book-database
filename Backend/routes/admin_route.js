const express = require('express')

// the name of the middleware
const adminRoute = express.Router()

// import the callbacks which handle requests to the API and response data from successful API requests. 
const {adminLogin, adminsView} = require('../controllers/admin_controller')


adminRoute.get('/admins_login', adminLogin)
.get('/view_admins', adminsView )

module.exports = adminRoute;