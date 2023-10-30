
// admin user schema is a mongoose model using adminSchema
const adminUserSchema = require ('../schemas/admin_schema')


const ErrorResponse = require('../error handlers/custom_error')


// below are callbacks for requests to the /admins endpoint.  The endpoint is the URL used in the middleware router, called adminRouter. These callbacks dicate what actions are taken on the mongoose model (the specific collection in that database that the model refers to) when a client request is made to the endpoint. 


exports.adminLogin = async (req, res, next) =>{
    const email = req.body.email
    const password = req.body.password
    let request = req.body

    if(!email || !password){
        console.log('please enter email or password')
     return  next(new ErrorResponse("email and password are required"),400 )
      
    }else{
    
        try{
            const adminUser = await adminUserSchema.findOne({email:email})
    
            res.status(201).json({
                success:true,
                adminUser,
                request     
            })

                }catch(error){
            
                    console.log(error)
                }

    
    }





    // if(!email || !password){
    //     console.log('please enter an email and password')
    // }


}

exports.adminsView = async (req, res, next) =>{
    const allAdmins = await adminUserSchema.find()


console.log('trying to view admin page... ')

    try {

        if(allAdmins){
            
            res.json({
                success:true,
                allAdmins
            }) 
                }
                else{
    
                    res.json({
                        success:false,
                        "Error": "no users found"
                    }) 
                }
    }
    catch(err){

console.log(err)
    }

}