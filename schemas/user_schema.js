const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jsonWebToken = require('jsonwebtoken')





// define the schema
const userSchema = new mongoose.Schema({

    firstName:{type:String,
         trim:true, // removes any spaces either side of the name
        required: [true, 'Please add a name'], 
        maxlength:32
        },

email:{type:String,
    trim:true, // removes any spaces either side of the name
   required: [true, 'Please add an email'], 
   maxlength:32,
   unique:true,
   match:[
    /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, // REGEX for valid email format
    'Please add a VALID email',
]
   },

   password:{type:String,
    trim:true,
   required: [true, 'Please add a Password'], 
   minlength:[8, 'Password must have at least eight(8) characters'],
   unique:true,
   match:[
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/, // REGEX for password format - requirements explained below:
    'Password must contain at least one uppercase letter, one lowercase letter, one digit and a special character ',
]
   },

   role:{
    type:Number,
    default:0,
   },
}, {timestamps:true});





 // METHODS
// encrypting password before saving. 
// learn pre('save')
// learn next()


// HAS PASSWORD
userSchema.pre('save', async function(next){
if(!this.isModified('password')){ // if password is not modified go to next()
    next()
}
this.password = await bcrypt.hash(this.password, 10) // encrypt the password
}); 


//VERIFY PASSWORD
// verify password using a CUSTOM METHOD
userSchema.methods.comparePassword = async function (yourPassword){
    return await bcrypt.compare(yourPassword, this.password);
}


// GENERATE WEBTOKEN
// create web token using CUSTOM METHOD (required from jsonwebtoken)
userSchema.methods.generateWebToken = function(){
    console.log('user id')
    console.log(this.id)
return jsonWebToken.sign({id:this.id}, process.env.JWT_SECRET, { expiresIn: '1h' })
}


// ------------------------------------------- END OF METHODS




// DEFINE AND EXPORT MODEL
let UserCredentials = mongoose.model('User', userSchema)
module.exports = UserCredentials;