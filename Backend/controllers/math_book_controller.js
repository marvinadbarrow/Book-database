const MathBookStore = require('../schemas/book_schema_math')

// controller is the callback used by the route  to handle the incoming request URL and any parameters that are needed for the API request and to use the data when a response is received.




// MIDDLEWARE FOR GETTING NUMBER OF DOCUMENTS IN THE ENTIRE COLLECTION
exports.getMathsTotal = (req, res, next) =>{
    // first get number of books then execute find books method
    MathBookStore.find().count()
    .then(data =>{
if(typeof data !== 'number' || data === 0){
return res.status(400).json({
    message: 'there are no books in this collection'
})
}

// if the function wasn't returned, then set a new property in the request object for the data value (which is the number of books in the collection)
res.locals.totals = data

 next()
    })
    // run the next middleware, which retrieves the books from the database. 

}




exports.viewAllMaths =   (req, res) =>{
        // destructure the variable created in the previous middleware to access the total number of books in the collection
const {totals} = res.locals;
console.log(totals)
    
        let pageNumber = Number(req.query.page) || 0
        console.log('page number taken from request - maths rounte line 31')
        console.log(pageNumber)
        
        let displayXBooks = 3
           MathBookStore.find() // find books
           .skip(pageNumber*displayXBooks) // skip page number times number of books per page to display 
           .limit(displayXBooks) // only display 'x' number of books (in this case )
        .then(data =>{
            // tacking on the number of books as JSON, if this can be accessed on the frontend then I can use the number for pagination, by taking the math ceiling of numberOfBooks/displayXBooks - which will give the number of pages needed to display the total number of books in the collection. 
        
            console.log('request URL - maths route line 41')
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

exports.newMathsBook = (req, res) =>{
    // this should be the information that is a copy of the schema, but with the individual book details filled in. 
    console.log(req.body)
  

            // before creating a new book, check to see if the ISBN-10  number is duplicated.  And if it is then the book already exists so send an error message.  This could also be done on the frontend by using an auto update
// get the ISBN-10 value from the request body object. 
let isbnString = req.body["ISBN_10"]

// run a find() method to see if the ISBN for the proposed book creation already exists in the collection
let bookExists = MathBookStore.find({'ISBN_10': isbnString})

// if the ISBN for the book doesn't already exist then create the book
if(!bookExists){
        // create new dvd model from object details sent by postman
        let newBook = new MathBookStore(req.body)
        // insert DVD object to database
            MathBookStore.create(newBook)
            .then(result =>{
                res.status(201).json(result)
            })
            .catch(err =>{
                res.status(500).json({error:'could not post book to database'})
            })
    
            
}else{// the book already exists in the collection so render error message for duplicate record
    res.status(409).json({error:'this book already exists in the collection'})

}



              
    }

exports.updateMultipleMaths = (req, res) =>{

    let updateObject = req.body // define object key:value pair to be changed, using $set.  

    MathBookStore.updateMany({}, {$set:updateObject})
    .then(result =>{
        res.status(200).json(result)
    })
    .catch(err =>{
        res.status(500).json({error:'could not complete update'})
    })
    }


// CONTROLLERS FOR INDIVIDUAL BOOKS
exports.viewMathsBook = (req, res) =>{
  
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
 
 }

exports.renewMathsBook = (res, req) =>{

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
 
 }

exports.updateMathsBookProperty = (req, res) =>{

    let query = {_id: req.params._id} // define query object containing ID
    let updateObject = req.body // define object key:value pair to be changed, using $set.  

    MathBookStore.updateOne(query, {$set:updateObject})
    .then(result =>{
        res.status(200).json(result)
    })
    .catch(err =>{
        res.status(500).json({error:'could not update document'})
    })
   }

exports.deleteMathsBook = (req, res) =>{
     
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
    
    }