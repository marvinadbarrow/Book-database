const express = require('express')
const booksrRoute = express.Router()
const app = express()
app.use('/static_assets', express.static('public'))

// get test books controllers
const {testBookReplace, testBookUpdateProperty, testBookDelete, newTestBook, viewAllTest, checkId, getTestTotal} = require('../controllers/test_book_controller')

// get maths book controllers
const {viewAllMaths, newMathsBook, updateMultipleMaths, renewMathsBook, updateMathsBookProperty, deleteMathsBook, getMathsTotal} = require('../controllers/math_book_controller')

// get general books controllers
const {viewAllGenerals, newGeneralBook, updateMultipleGenerals,  renewGeneralBook, updateGeneralBookProperty, deleteGeneralBook, getGeneralstotal} = require('../controllers/general_book_controller')

// get stem book controllers
const {viewAllStems, newStemBook, updateMultipleStems, renewStemBook, updateStemBookProperty, deleteStemBook, getStemTotal} = require('../controllers/stem_book_controller')
// WELCOME page.  


booksrRoute.param('_id', checkId) 

booksrRoute.get('/', (req, res) =>{
    res.download('./images/math_books.jpg')
    // then this should be seen on the localhost:3000/books url
})


// TEST books all
booksrRoute.get('/test_books', getTestTotal, viewAllTest)
.post('/test_books', newTestBook)
 booksrRoute.put('/test_books/:_id', testBookReplace)
 .patch('/test_books/:_id', testBookUpdateProperty)
 .delete('/test_books/:_id', testBookDelete);




// MATHS all books
booksrRoute.get('/mathematics', getMathsTotal, viewAllMaths) // POST new MATHS book
.post('/mathematics/', newMathsBook)// update all books with new field
.patch('/mathematics/', updateMultipleMaths)

// MATHS individual books
booksrRoute.put('/mathematics/:_id', renewMathsBook)
.patch('/mathematics/:_id', updateMathsBookProperty)
.delete('/mathematics/:_id', deleteMathsBook);




// GENERAL all books

booksrRoute.get('/generals', getGeneralstotal, viewAllGenerals) // POST new MATHS book
.post('/generals/', newGeneralBook)// update all books with new field
.patch('/generals/', updateMultipleGenerals)

// GENERAL individual books
booksrRoute.put('/generals/:_id', renewGeneralBook)
.patch('/generals/:_id', updateGeneralBookProperty)
.delete('/generals/:_id', deleteGeneralBook);


// STEM all books
booksrRoute.get('/other_stems', getStemTotal, viewAllStems) // POST new MATHS book
.post('/other_stems/', newStemBook)// update all books with new field
.patch('/other_stems/', updateMultipleStems)

// GENERAL individual books
booksrRoute.put('/other_stems/:_id', renewStemBook)
.patch('/other_stems/:_id', updateStemBookProperty)
.delete('/other_stems/:_id', deleteStemBook);



       module.exports = booksrRoute