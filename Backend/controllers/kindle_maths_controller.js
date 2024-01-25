

const MathKindleStore = require('../schemas/book_schema_math_kindle')


// all kindle books
exports.viewAllKindleMaths = (req, res) =>{

    const getFullDetails = (number) =>{
        let pageNumber = Number(req.query.page) || 0
        console.log('page number taken from request - kindle maths route line 15')
        console.log(pageNumber)
        
        let displayXBooks = 2
           MathKindleStore.find() // find books
           .skip(pageNumber*displayXBooks) // skip page number times number of books per page to display 
           .limit(displayXBooks) // only display 'x' number of books (in this case )
        .then(data =>{
            // tacking on the number of books as JSON, if this can be accessed on the frontend then I can use the number for pagination, by taking the math ceiling of numberOfBooks/displayXBooks - which will give the number of pages needed to display the total number of books in the collection. 
        
            console.log('request URL - kindle maths route line 25')
        console.log(req.originalUrl)
        
        let bookObject = {"number_of_books": number,
        "books_per_page": displayXBooks,
        "selected_page": pageNumber,
          "data":data}
    
          console.log('bookObject')
          console.log(bookObject)             
        res.status(200).json(bookObject)
           
        })
    }
    
    // first get number of books then execute find books method
    MathKindleStore.find().count()
    .then(data =>{
        console.log('number of books - kindle maths route line 43')
    numberOfBooks = data;
    console.log(numberOfBooks)
    getFullDetails(numberOfBooks)
    })
    
    
    
    .catch(err =>{
       console.log('Oops, something went wrong: ' + err)   
    })
    }
exports.newKindleMaths = (req, res) =>{
        console.log(req.body)
      
    
        // get the ISBN-10 value from the request body. 
    let isbnString = req.body["ISBN_10"]
    // variable for checking if collection already has a record with this ISBN
        let bookExists = MathKindleStore.find({'ISBN_10': isbnString})
    
            // if the ISBN doesn't belong to any record in the collection
            if(!bookExists){
    
            // create new book
            let newBook = new MathKindleStore(req.body)
            // insert DVD object to database
                MathKindleStore.create(newBook)
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
    
    
    
       
                  
    }


 // individual kindle books
exports.viewKindleMaths = (req, res) =>{
  
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
 
 }
exports.renewKindleMaths = (res, req) =>{
  
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
  
 }
exports.updateKindleMathsProperties = (req, res) =>{
    
    
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
         
 }
exports.deleteKindleMaths = (req, res) =>{
 
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
 
 }


    