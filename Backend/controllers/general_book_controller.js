const GeneralBookStore = require('../schemas/book_schema_general')

// controller is the route callback that is used to handle the incoming request URL and any parameters that are needed for the API request and to use the data when a response is received. 



// MIDDLEWARE FOR GETTING NUMBER OF DOCUMENTS IN THE ENTIRE COLLECTION
exports.getGeneralstotal = (req, res, next) =>{
    // first get number of books then execute find books method
    GeneralBookStore.find().count()
    .then(data =>{
if(typeof data !== 'number' || data === 0){
return res.status(400).json({
    message: 'there are no books in this collection'
})
}else{
// if the function wasn't returned, then set a new property in the response object for the data value (which is the number of books in the collection)
res.locals.totals = data

 next()
}
})
    // run the next middleware, which retrieves the books from the database. 

}

exports.viewAllGenerals = (req, res) =>{
        // destructure the variable created in the previous middleware to access the total number of books in the collection
const {totals} = res.locals;
console.log(totals)
    


        let pageNumber = Number(req.query.page) || 0 // page number will either be zero, or query page value
        let displayXBooks = 3
        
           GeneralBookStore.find()
           .skip(pageNumber*displayXBooks) // skip page number times number of books per page to display 
           .limit(displayXBooks) // only display 'x' number of books (in this case 5)
        .then(data =>{
// create an object containing retrieved book documents and stats which are used for pagination. 
            let bookObject = {"number_of_books": totals,
            "books_per_page": displayXBooks,
            "selected_page": pageNumber,
              "data":data}           
            res.status(200).json(bookObject)
        
        })
    


.catch(err =>{
   console.log('Oops, something went wrong: ' + err)   
})
}
exports.newGeneralBook = (req, res) =>{
    console.log('request body')
    console.log(req.body)

  

// get the ISBN-10 value from the request body object. 
let isbnString = req.body["ISBN_10"]
console.log('show ISBN')
console.log(isbnString)

// check if collection already has a record with this ISBN
        let bookExists = GeneralBookStore.find({'ISBN_10': isbnString})




const  duplicateBook  =  GeneralBookStore.aggregate([
{
    $match:{ISBN_10: isbnString}
}, 

{
    $group: { _id: "$name", totalQuantity: { $sum: "$quantity" } }
 }

])
.then(duplicateBook =>{
console.log(duplicateBook)
})



console.log(duplicateBook)



        let newBook = new GeneralBookStore(req.body)
        // insert DVD object to database
            GeneralBookStore.create(newBook)
            .then(result =>{
                console.log('result')
                console.log(result)
                res.status(201).json(result)
            })
            .catch(err =>{
                res.status(500).json({error:'could not post book to database'})
            })
    
        


              
    }
exports.updateMultipleGenerals = (req, res) =>{

    let updateObject = req.body // define object key:value pair to be changed, using $set.  In this case since the field does not exist it will be added to the book.  NOTE: the first parameter in updateMany is either an array containing properties; only those books having the properties will be updated, or an empty object, which will cause all books in the collection to be updated with the specificied field. 
    console.log('updateObject from request body - line 462 user books')
    console.log(updateObject)
GeneralBookStore.updateMany({}, {$set:updateObject})
    .then(result =>{
        res.status(200).json(result)
    })
    .catch(err =>{
        res.status(500).json({error:'could not complete update'})
    })
    }


exports.viewGeneralBook = (req, res) =>{
  
    // check validity of ID and if it is valid then use find method
    let idValidity = mongoose.isValidObjectId(req.params._id)
    if(idValidity === true){
 
        GeneralBookStore.findById(req.params._id)
        .then(data =>{
            res.status(200).json(data)
        })
        .catch(err =>{
            console.log('Oops, something went wrong: ' + err)   
        })   
     }else{ // otherwise, if id is not valid send error message to user
        res.status(500).json({error: 'this is not a valid book id'})
     }
 
 }
exports.renewGeneralBook = (res, req) =>{
 
     // 'put' replaces the entire document not just one of the fields inside the object; 'patch' is the operation that updates documents as used below in the next function. 
     let query = {_id: req.params._id}
     let updateObject = req.body
      GeneralBookStore.findOneAndReplace(query, updateObject)
     .then(data =>{
         res.status(200).json(data)
     })
     .catch(err =>{
         res.status(500).json({error:'unable to replace document'})
     })
  
  }
exports.updateGeneralBookProperty = (req, res) =>{
 

     let query = {_id: req.params._id} // define query object containing ID
     let updateObject = req.body // define object key:value pair to be changed, using $set.  For updating the 'genres' field, the value is an array of comma separated strings, each string representing a genre which the book falls into. 
 
     // for the update MANY method, it could just be a matter of checking for an ID and if one does not exist, then update many

     
     GeneralBookStore.updateOne(query, {$set:updateObject})
     .then(result =>{
         res.status(200).json(result)
     })
     .catch(err =>{
         res.status(500).json({error:'could not update document'})
     })
    }
exports.deleteGeneralBook = (req, res) =>{
      
 
        
            let query = {_id: req.params._id} // define query object containing ID
 // check validity of ID and if it is valid then use find method
    let idValidity = mongoose.isValidObjectId(req.params._id)
 
    if(idValidity === true){ // if the id is a valid mongoose id
            GeneralBookStore.deleteOne(query)
            .then(result =>{ // send a DELETE request
                res.status(200).json(result)
            })
            .catch(err =>{ // if there's a server error render error
                res.status(500).json({error:'could not update document'})
            })
 
      
         }else{ // if the id is not valid throw/render error
             res.status(500).json({error: 'this is not a valid book id'})
         }
            // res.json(updateObject)
        
        };


