
   // only import books schemas if database is books.  This needs to be moved to an entirely different app so that things don't get mixed up. 



const TestSchema = require('../schemas/test_schema')

const { default: mongoose } = require('mongoose')



console.log('hello line 14 test book controller')
// TEST-BOOKS  CALLBACKS TO USE IN MIDDLEWARE

let testTotal;
// MIDDLEWARE FOR GETTING NUMBER OF DOCUMENTS IN THE ENTIRE COLLECTION
exports.getTestTotal = (req, res, next) =>{
    // first get number of books then execute find books method
    TestSchema.find().count()
    .then(data =>{
if(typeof data !== 'number' || data === 0){
return res.status(400).json({
    message: 'there are no books in this collection'
})
}else{
// if the function wasn't returned, then set a new property in the request object for the data value (which is the number of books in the collection)
res.locals.totals = data
    // run the next middleware, which retrieves the books from the database. 
    // console.log('test total')
    // console.log(testTotal)
    next()
}


    

    })

}

// middleware to check id, this will be exported to the params request, which will only execute if an _id is present. Then the value argument which contains the id will be used to check the id is valid via this function (which is middleware - due to the next() argument).  As long as the params request comes before the route request, then the id check will be performed.  Thsi means that the id check can be taken out of ALL of the callbacks because the check will run from the middleware, which will prevent the id route request from happening if the id is invalid. 
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
// VIEW TEST BOOKS
exports.viewAllTest = (req, res) =>{
    // destructure the variable created in the previous middleware to access the total number of books in the collection
const {totals} = res.locals;
console.log(totals)

       let pageNumber = Number(req.query.page) || 0
       console.log('page number taken from request - maths rounte line 31')
       console.log(pageNumber)
       
       let displayXBooks = 3
          TestSchema.find() // find books
          .skip(pageNumber*displayXBooks) // this gives the number of books to skip
          .limit(displayXBooks) // only display 'x' number of books (in this case )
       .then(data =>{
           // tacking on the number of books as JSON, if this can be accessed on the frontend then I can use the number for pagination, by taking the math ceiling of numberOfBooks/displayXBooks - which will give the number of pages needed to display the total number of books in the collection. 
       
           console.log('request URL - maths route line 41')
       console.log(req.originalUrl)
       // object which holds the fetched books info, total number of books in the collection and books to display per page, from which you can calculate the number of pages needed to cover all books in the collection. The information is used to render a pagination strip with all the page numbers; the selected_page property is taken from the incoming query and is used to highlight the current page number in the pagination strip. 
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
// create test books
exports.newTestBook = (req, res) =>{
   console.log(req.body)
 

   // before creating a new book, check to see if the ISBN-10  number is duplicated.  And if it is then the book already exists so send an error message.  This could also be done on the frontend by using an auto update
// get the ISBN-10 value from the request body object. 
let isbnString = req.body["ISBN_10"]

// run a find() method to see if the ISBN for the proposed book creation already exists in the collection
let bookExists = TestSchema.find({'ISBN_10': isbnString})

// if the ISBN for the book doesn't already exist then create the book

// create new dvd model from object details sent by postman
let newBook = new TestSchema(req.body)
// insert DVD object to database
   TestSchema.create(newBook)
   .then(result =>{
       res.status(201).json(result)
   })
   .catch(err =>{
       res.status(500).json({error:'could not post book to database'})
   })
   


}
// view individual test book
// exports.viewTestBook =  (req, res) =>{
 
//    // check validity of ID and if it is valid then use find method

   
//    let queryId = req.params._id
//    let idValidity = mongoose.isValidObjectId(queryId)
//    if(idValidity === true){
// console.log('valid book id test book controller line 106')
//        TestSchema.findById(queryId)
//        .then(data =>{
//         console.log('valid book id test book controller line 106')
//            res.status(200).json(data)
//        })
//        .catch(err =>{
//            console.log('Oops, something went wrong: ' + err)   
//        })   
//     }else{ // otherwise, if id is not valid send error message to user
//        res.status(500).json({error: 'this is not a valid book id'})
//     }

// }
// update test books
exports.testBookReplace = (res, req) =>{

   // maybe this uses replaceOne() rather than findOneAndReplace() - NO: the misunderstanding here is that 'put' replaces the entire document not just one of the fields inside the object; 'patch' is the operation that updates documents as used below in the next function. 
   let query = {_id: req.params._id}
   let updateObject = req.body
    TestSchema.findOneAndReplace(query, updateObject)
   .then(data =>{
       res.status(200).json(data)
   })
   .catch(err =>{
       res.status(500).json({error:'unable to replace document'})
   })

}
// update book property
exports.testBookUpdateProperty = (req, res) =>{

   let query = {_id: req.params._id} // define query object containing ID
   let updateObject = req.body // define object key:value pair to be changed, using $set.  

   TestSchema.updateOne(query, {$set:updateObject})
   .then(result =>{
       res.status(200).json(result)
   })
   .catch(err =>{
       res.status(500).json({error:'could not update document'})
   })
  }
// delete test book
exports.testBookDelete = (req, res) =>{
   let query = {_id: req.params._id} // define query object containing ID
   TestSchema.deleteOne(query)
.then(result =>{
res.status(200).json(result)
})
.catch(err =>{
res.status(500).json({error:'could not update document'})
})
   
   }


