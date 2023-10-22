const express = require('express')
const booksrRoute = express.Router()
const app = express()
   // only import books schemas if database is books.  This needs to be moved to an entirely different app so that things don't get mixed up. 
   const MathBookStore = require('../schemas/book_schema_math')
   const StemBookStore = require('../schemas/book_schema_other_stem')
const { default: mongoose } = require('mongoose')

app.use('/static_assets', express.static('public'))

// WELCOME page.  
booksrRoute.get('/', (req, res) =>{
    res.download('./images/math_books.jpg')
    // then this should be seen on the localhost:3000/books url
})


// GET or POST in 'all math books'
booksrRoute.get('/mathematics',  (req, res) =>{

       
let pageNumber = req.query.page || 0
let displayXBooks = 5
   MathBookStore.find() // find books
   .skip(pageNumber*displayXBooks) // skip page number times number of books per page to display 
   .limit(displayXBooks) // only display 'x' number of books (in this case 5)
.then(data =>{
   res.json(data)
})
.catch(err =>{
   console.log('Oops, something went wrong: ' + err)   
})
})
.post('/mathematics/',  (req, res) =>{
    console.log(req.body)
  
        // create new dvd model from object details sent by postman
        let newBook = new MathBookStore(req.body)
        // insert DVD object to database
            MathBookStore.create(newBook)
            .then(result =>{
                res.status(200).json(result)
            })
            .catch(err =>{
                res.status(500).json({error:'could not post book to database'})
            })
    
                // just a formality to show user what was posted. 
              
    })


// MATHEMATICS
// GET PUT PATCH DELETE specific book by id
booksrRoute.get('/mathematics/:_id',  (req, res) =>{
  
   // check validity of ID and if it is valid then use find method
   let idValidity = mongoose.isValidObjectId(req.params._id)
   if(idValidity === true){

       MathBookStore.findById(req.params._id)
       .then(data =>{
           res.status(200).json(data)
       })
       .catch(err =>{
           console.log('Oops, something went wrong: ' + err)   
       })   
    }else{ // otherwise, if id is not valid send error message to user
       res.status(500).json({error: 'this is not a valid book id'})
    }

})
.put('/mathematics/:_id', (res, req) =>{

    // maybe this uses replaceOne() rather than findOneAndReplace() - NO: the misunderstanding here is that 'put' replaces the entire document not just one of the fields inside the object; 'patch' is the operation that updates documents as used below in the next function. 
    let query = {_id: req.params._id}
    let updateObject = req.body
     MathBookStore.findOneAndReplace(query, updateObject)
    .then(data =>{
        res.status(200).json(data)
    })
    .catch(err =>{
        res.status(500).json({error:'unable to replace document'})
    })
 
 })
.patch('/mathematics/:_id', (req, res) =>{

    let query = {_id: req.params._id} // define query object containing ID
    let updateObject = req.body // define object key:value pair to be changed, using $set.  

    MathBookStore.updateOne(query, {$set:updateObject})
    .then(result =>{
        res.status(200).json(result)
    })
    .catch(err =>{
        res.status(500).json({error:'could not update document'})
    })
   })
.delete('/mathematics/:_id', (req, res) =>{
     
   // NOTE - 'PUT' is for updating the entire object, but 'PATCH' is what you need for just a property inside the document
       // remember that you can get the id by viewing 'all' books from the browser which will show the id's (easy since there are only two books), and then you would use the id in the request parameter of the URL that is used in postman. 

          // check validity of ID and if it is valid then use find method
   let idValidity = mongoose.isValidObjectId(req.params._id)
   if(idValidity === true){
       let query = {_id: req.params._id} // define query object containing ID
               MathBookStore.deleteOne(query)
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
booksrRoute.get('/other_stems',  (req, res) =>{


   let pageNumber = req.query.page || 0 // page number will either be zero, or query page value
let displayXBooks = 5

   StemBookStore.find()
   .skip(pageNumber*displayXBooks) // skip page number times number of books per page to display 
   .limit(displayXBooks) // only display 'x' number of books (in this case 5)
.then(data =>{
   res.json(data)
})
.catch(err =>{
   console.log('Oops, something went wrong: ' + err)   
})
})
.post('/other_stems/',  (req, res) =>{
    console.log(req.body)
  
        // create new dvd model from object details sent by postman
        let newBook = new StemBookStore(req.body)
        // insert DVD object to database
            StemBookStore.create(newBook)
            .then(result =>{
                res.status(200).json(result)
            })
            .catch(err =>{
                res.status(500).json({error:'could not post book to database'})
            })
    
                // just a formality to show user what was posted. 
              
    })
 

// GET specific maths book - by ID
booksrRoute.get('/other_stems/:_id',  (req, res) =>{
  
   // check validity of ID and if it is valid then use find method
   let idValidity = mongoose.isValidObjectId(req.params._id)
   if(idValidity === true){

       StemBookStore.findById(req.params._id)
       .then(data =>{
           res.status(200).json(data)
       })
       .catch(err =>{
           console.log('Oops, something went wrong: ' + err)   
       })   
    }else{ // otherwise, if id is not valid send error message to user
       res.status(500).json({error: 'this is not a valid book id'})
    }

})
.delete('/other_stems/:_id', (req, res) =>{
     
       // NOTE - 'PUT' is for updating the entire object, but 'PATCH' is what you need for just a property inside the document
           // remember that you can get the id by viewing 'all' books from the browser which will show the id's (easy since there are only two books), and then you would use the id in the request parameter of the URL that is used in postman. 
       
           let query = {_id: req.params._id} // define query object containing ID
           StemBookStore.deleteOne(query)
           .then(result =>{
               res.status(200).json(result)
           })
           .catch(err =>{
               res.status(500).json({error:'could not update document'})
           })
       //  if(err) throw err;
     
       
           // res.json(updateObject)
       
       });
       

       module.exports = booksrRoute