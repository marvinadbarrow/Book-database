const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
    email:{type:String,
    trim:true, // removes any spaces either side of the name
    required: [true, 'Please add an email'], 
    maxlength:32,
    unique:true,
    match:[
     /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, // REGEX for valid email format
     'Please add a VALID email']
    },

    password:{
        type:String,
        trim:true, // removes any spaces either side of the name
        required: [true, 'Please add an email'], 
        maxlength:32,
        unique:true,
        match:[
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/, // REGEX for password format - requirements explained below:
            'Password must contain at least one uppercase letter, one lowercase letter, one digit and a special character ',
        ]
    }, 

    role:{
        type:String,
        default:"admin",
        // admin is only used when the field is 'undefined' (not null, or '') so I don't know if this will work; you'll probably have to create the field value yourself, and test whether the creation of an admin, without specifying the role, gives the field the 'admin' value (test with postman)
       },

    IsLoggedIn: {
        type:Boolean        
    }
})

// custom method - HASH



// custom method - VERIFY PASSWORD



let adminUserSchema = mongoose.model('admin', adminSchema)
module.exports = adminUserSchema

