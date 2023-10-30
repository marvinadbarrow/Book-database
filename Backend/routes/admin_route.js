const express = require('express')

// the name of the middleware
const adminRoute = express.Router()

// import the callback here
const {adminLogin, adminsView} = require('../controllers/admin_controller')


adminRoute.get('/admins_login', adminLogin)
.get('/view_admins', adminsView )

module.exports = adminRoute;