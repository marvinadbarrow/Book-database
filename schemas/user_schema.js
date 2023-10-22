const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
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
    /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    'Please add a VALID email',
]
   },

   password:{type:String,
    trim:true,
   required: [true, 'Please add a Password'], 
   minlength:[8, 'Password must have at least eight(8) characters'],
   unique:true,
   match:[
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
    'Password must contain at least one uppercase letter, one lowercase letter, one digit and a special character ',
]
   },

   role:{
    type:Number,
    default:0,
   },
}, {timestamps:true});
 
// encrypting password before saving. 
// learn pre('save')
// learn next()
userSchema.pre('save', async function(next){
if(!this.isModified('password')){ // if password is not modified go to next()
    next()
}
this.password = await bcrypt.hash(this.password, 10) // encrypt the password
})
let UserCredentials = mongoose.model('User', userSchema)

module.exports = UserCredentials;