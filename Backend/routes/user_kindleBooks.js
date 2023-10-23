const express = require('express')
const kindleBooksrRoute = express.Router()
const MathKindleStore = require('../schemas/book_schema_math_kindle')
const StemKindleCollection = require('../schemas/book_schema_stem_kindle')
const { default: mongoose } = require('mongoose')




// GET all kindle maths books
kindleBooksrRoute.get('/kindle_maths',  (req, res) =>{
   let pageNumber = req.query.page || 0 // use page number if one exists or use zero
let displayXBooks = 5
   MathKindleStore.find() // find books
   .skip(pageNumber*displayXBooks) // skip page number times number of books per page to display 
   .limit(displayXBooks) // only display 'x' number of books (in this case 5)
.then(data =>{
   res.json(data)
})
.catch(err =>{
   console.log('Oops, something went wrong: ' + err)   
})
});

// MATHEMATICS
// GET specific maths book - by ID
kindleBooksrRoute.get('/kindle_maths/:_id',  (req, res) =>{
  
   // check validity of ID and if it is valid then use find method
   let idValidity = mongoose.isValidObjectId(req.params._id)
   if(idValidity === true){

       MathKindleStore.findById(req.params._id)
       .then(data =>{
           res.status(200).json(data)
       })
       .catch(err =>{
           console.log('Oops, something went wrong: ' + err)   
       })   
    }else{ // otherwise, if id is not valid send error message to user
       res.status(500).json({error: 'this is not a valid book id'})
    }

});


// POST A MATHS BOOK VIDEO - currently using postman desktop
kindleBooksrRoute.post('/kindle_maths/',  (req, res) =>{
   console.log(req.body)
 
       // create new dvd model from object details sent by postman
       let newBook = new MathKindleStore(req.body)
       // insert DVD object to database
           MathKindleStore.create(newBook)
           .then(result =>{
               res.status(200).json(result)
           })
           .catch(err =>{
               res.status(500).json({error:'could not post book to database'})
           })
   
               // just a formality to show user what was posted. 
             
   });
   

      // PUT REQUESTS --------------------------------------------------------------------------------------------------------
kindleBooksrRoute.put('/kindle_maths/:_id', (res, req) =>{

    // maybe this uses replaceOne() rather than findOneAndReplace() - NO: the misunderstanding here is that 'put' replaces the entire document not just one of the fields inside the object; 'patch' is the operation that updates documents as used below in the next function. 
    console.log('request params id')
    console.log(req.body)
    let query = {_id: req.params._id}
    let updateObject = req.body
     MathKindleStore.findOneAndReplace(query, updateObject)
    .then(data =>{
        res.status(200).json(data)
    })
    .catch(err =>{
        res.status(500).json({error:'unable to replace document'})
    })
 
 })

    // PATCH REQUESTS --------------------------------------------------------------------------------------------------------
    kindleBooksrRoute.patch('/kindle_maths/:_id', (req, res) =>{
   
   
        // NOTE - 'PUT' is for updating the entire object, but 'PATCH' is what you need for just a property inside the document
            // remember that you can get the id by viewing 'all' books from the browser which will show the id's (easy since there are only two books), and then you would use the id in the request parameter of the URL that is used in postman. 
        
            let query = {_id: req.params._id} // define query object containing ID
            let updateObject = req.body // define object key:value pair to be changed, using $set.  
     
            MathKindleStore.updateOne(query, {$set:updateObject})
            .then(result =>{
                res.status(200).json(result)
            })
            .catch(err =>{
                res.status(500).json({error:'could not update document'})
            })
        //  if(err) throw err;
      
        
            // res.json(updateObject)
        
        });
        

           // DELETE REQUESTS --------------------------------------------------------------------------------------------------------
   kindleBooksrRoute.delete('/kindle_maths/:_id', (req, res) =>{
     
    // NOTE - 'PUT' is for updating the entire object, but 'PATCH' is what you need for just a property inside the document
        // remember that you can get the id by viewing 'all' books from the browser which will show the id's (easy since there are only two books), and then you would use the id in the request parameter of the URL that is used in postman. 
 
           // check validity of ID and if it is valid then use find method
    let idValidity = mongoose.isValidObjectId(req.params._id)
    if(idValidity === true){
        let query = {_id: req.params._id} // define query object containing ID
        MathKindleStore.deleteOne(query)
        .then(result =>{
            res.status(200).json(result)
        })
        .catch(err =>{
            res.status(500).json({error:'could not update document'})
        })
    }else{
        res.status(500).json({error: 'this is not a valid book id'})
    }
    
    });
    

    
//OTHER STEM 

// GET all STEM books
kindleBooksrRoute.get('/kindle_stems',  (req, res) =>{


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
 });


 
// POST A STEM BOOK VIDEO - currently using postman desktop
kindleBooksrRoute.post('/kindle_stems/',  (req, res) =>{
    console.log(req.body)
  
        // create new dvd model from object details sent by postman
        let newBook = new StemKindleCollection(req.body)
        // insert DVD object to database
            StemKindleCollection.create(newBook)
            .then(result =>{
                res.status(200).json(result)
            })
            .catch(err =>{
                res.status(500).json({error:'could not post book to database'})
            })
    
                // just a formality to show user what was posted. 
              
    });
 
    kindleBooksrRoute.delete('/kindle_stems/:_id', (req, res) =>{
      
        // NOTE - 'PUT' is for updating the entire object, but 'PATCH' is what you need for just a property inside the document
            // remember that you can get the id by viewing 'all' books from the browser which will show the id's (easy since there are only two books), and then you would use the id in the request parameter of the URL that is used in postman. 
        
            let query = {_id: req.params._id} // define query object containing ID
            StemKindleCollection.deleteOne(query)
            .then(result =>{
                res.status(200).json(result)
            })
            .catch(err =>{
                res.status(500).json({error:'could not update document'})
            })
        //  if(err) throw err;
      
        
            // res.json(updateObject)
        
        });
        
 
        module.exports = kindleBooksrRoute