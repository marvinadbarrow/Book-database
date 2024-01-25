const StemKindleCollection = require('../schemas/book_schema_stem_kindle')

// using mongoose to check validity of id. 
const { default: mongoose } = require('mongoose')
// all stem kindles
exports.viewAllKindleStems = (req, res) =>{


    let pageNumber = req.query.page || 0 // page number will either be zero, or query page value
 let displayXBooks = 5
 
    StemKindleCollection.find()
    .skip(pageNumber*displayXBooks) // skip page number times number of books per page to display 
    .limit(displayXBooks) // only display 'x' number of books (in this case 5)
 .then(data =>{
    res.json(data)
 })
 .catch(err =>{
    console.log('Oops, something went wrong: ' + err)   
 })
 }
exports.newKindleStem = (req, res) =>{
    console.log(req.body)
  

    let isbnString = req.body["ISBN_10"]
// variable for checking if collection already has a record with this ISBN
    let bookExists = StemKindleCollection.find({'ISBN_10': isbnString})

        // if the ISBN doesn't belong to any record in the collection
        if(!bookExists){

        // create new kindle book
        let newBook = new StemKindleCollection(req.body)
        // insert DVD object to database
            StemKindleCollection.create(newBook)
            .then(result =>{
                res.status(200).json(result)
            })
            .catch(err =>{
                res.status(500).json({error:'could not post book to database'})
            })
    
        }else{
            // ISBN exists already, so render a warning
            res.status(409).json({error:'this book already exists in the collection'})
        }

                // just a formality to show user what was posted. 
              
    }


// individual stem kindles
 exports.viewKindleStem = (req, res) =>{
  
    // check validity of ID and if it is valid then use find method
    let idValidity = mongoose.isValidObjectId(req.params._id)
    if(idValidity === true){
 
        StemKindleCollection.findById(req.params._id)
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
exports.renewKindleStem = (res, req) =>{
  
     // maybe this uses replaceOne() rather than findOneAndReplace() - NO: the misunderstanding here is that 'put' replaces the entire document not just one of the fields inside the object; 'patch' is the operation that updates documents as used below in the next function. 
     console.log('request params id')
     let query = {_id: req.params._id}
     let updateObject = req.body
      StemKindleCollection.findOneAndReplace(query, updateObject)
     .then(data =>{
         res.status(200).json(data)
     })
     .catch(err =>{
         res.status(500).json({error:'unable to replace document'})
     })
  
 }
exports.updateKindleStemProperties = (req, res) =>{
    
    
         // NOTE - 'PUT' is for updating the entire object, but 'PATCH' is what you need for just a property inside the document
             // remember that you can get the id by viewing 'all' books from the browser which will show the id's (easy since there are only two books), and then you would use the id in the request parameter of the URL that is used in postman. 
        
     // check validity of ID and if it is valid then use find method
     // variable for query
     let query;
     // set id variable
     let idValidity = mongoose.isValidObjectId(req.params._id)
// if id is a valid object
     if(idValidity === true){

     query = {_id: req.params._id} // define query object containing 

     }
     else{
        res.status(500).json({error: 'this is not a valid kindle id'})
        }


// only update if query is 'truthy' which can only happen if id is valid which allows the query object to be created. 
if(query){
    let updateObject = req.body // define object key:value pair to be changed, using $set.  
      
    StemKindleCollection.updateOne(query, {$set:updateObject})
    .then(result =>{
        res.status(200).json(result)
    })
    .catch(err =>{
        res.status(500).json({error:'could not update document'})
    })

}

         
 }
exports.deleteKindleStem = (req, res) =>{
 
 // NOTE - 'PUT' is for updating the entire object, but 'PATCH' is what you need for just a property inside the document
 // remember that you can get the id by viewing 'all' books from the browser which will show the id's (easy since there are only two books), and then you would use the id in the request parameter of the URL that is used in postman. 
 
     // check validity of ID and if it is valid then use find method
 let idValidity = mongoose.isValidObjectId(req.params._id)
 if(idValidity === true){
 let query = {_id: req.params._id} // define query object containing ID
 StemKindleCollection.deleteOne(query)
 .then(result =>{
     res.status(200).json(result)
 })
 .catch(err =>{
     res.status(500).json({error:'could not update document'})
 })
 }else{
 res.status(500).json({error: 'this is not a valid book id'})
 }
 
 }