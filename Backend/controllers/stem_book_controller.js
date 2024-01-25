const StemBookStore = require('../schemas/book_schema_other_stem')

// middleware for id checking
exports.checkId = (req, res, next, value) =>{
    console.log('checking ID...')
    console.log(value)


// check validity of the value property, which is the id param, ID and if it is valid then use next() if not, then return an error
   let idValidity = mongoose.isValidObjectId(value)
   console.log('checking book validity')
   if(!idValidity){
    return res.status(500).json({error: 'this is not a valid book id'})
   }
   // next will only run if the id is not valid
   next()
}

let testTotal

// MIDDLEWARE FOR GETTING NUMBER OF DOCUMENTS IN THE ENTIRE COLLECTION
exports.getStemTotal = (req, res, next) =>{
    // first get number of books then execute find books method
    StemBookStore.find().count()
    .then(data =>{
if(typeof data !== 'number' || data === 0){
return res.status(400).json({
    message: 'there are no books in this collection'
})
}else{
// if the function wasn't returned, then set a new property in the request object for the data value (which is the number of books in the collection)
res.locals.totals = data
next()
}
    })
    // run the next middleware, which retrieves the books from the database. 

}

// stem books all
exports.viewAllStems = (req, res) =>{
 
        // destructure the variable created in the previous middleware to access the total number of books in the collection
        const {totals} = res.locals;
        console.log(totals)
    
        
        let pageNumber = Number(req.query.page) || 0 // page number will either be zero, or query page value
        let displayXBooks = 1
        
           StemBookStore.find()
           .skip(pageNumber*displayXBooks) // skip page number times number of books per page to display 
           .limit(displayXBooks) // only display 'x' number of books (in this case 5)
        .then(data =>{
        
            console.log('request URL - stem route line 194')
            console.log(req.originalUrl)


            let bookObject = {"number_of_books": totals,
            "books_per_page": displayXBooks,
            "selected_page": pageNumber,
              "data":data}

              console.log('bookObject')
              console.log(bookObject)             
            res.status(200).json(bookObject)
        
        })

.catch(err =>{
   console.log('Oops, something went wrong: ' + err)   
})
}
exports.newStemBook = (req, res) =>{
    console.log(req.body)
  

                //book's ISBN from request body 
let isbnString = req.body["ISBN_10"]

// find() method to see if the ISBN already exists in the collection
let bookExists = StemBookStore.find({'ISBN_10': isbnString})

if(!bookExists){

        // create new book record 
        let newBook = new StemBookStore(req.body)
        // insert DVD object to database
            StemBookStore.create(newBook)
            .then(result =>{
                res.status(201).json(result)
            })
            .catch(err =>{
                res.status(500).json({error:'could not post book to database'})
            })
    
                // just a formality to show user what was posted. 
    
}else{// the book already exists in the collection render 'duplicate record' error
    res.status(409).json({error:'this book already exists in the collection'})

}

              
    }
exports.updateMultipleStems = (req, res) =>{

    let updateObject = req.body // define object key:value pair to be changed, using $set.  

    StemBookStore.updateMany({}, {$set:updateObject})
    .then(result =>{
        res.status(200).json(result)
    })
    .catch(err =>{
        res.status(500).json({error:'could not complete update'})
    })
    }

// stem books individual
exports.viewStemBook =   (req, res) =>{
  
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

}
exports.renewStemBook = (res, req) =>{

    // 'put' replaces the entire document not just one of the fields inside the object; 'patch' is the operation that updates documents as used below in the next function. 
    let query = {_id: req.params._id}
    let updateObject = req.body
     StemBookStore.findOneAndReplace(query, updateObject)
    .then(data =>{
        res.status(200).json(data)
    })
    .catch(err =>{
        res.status(500).json({error:'unable to replace document'})
    })
 
 }
exports.updateStemBookProperty = (req, res) =>{

    let query = {_id: req.params._id} // define query object containing ID
    let updateObject = req.body // define object key:value pair to be changed, using $set.  

    StemBookStore.updateOne(query, {$set:updateObject})
    .then(result =>{
        res.status(200).json(result)
    })
    .catch(err =>{
        res.status(500).json({error:'could not update document'})
    })
   }
exports.deleteStemBook = (req, res) =>{
     

       
           let query = {_id: req.params._id} // define query object containing ID
// check validity of ID and if it is valid then use find method
   let idValidity = mongoose.isValidObjectId(req.params._id)

   if(idValidity === true){ // if the id is a valid mongoose id
           StemBookStore.deleteOne(query)
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
       
       }