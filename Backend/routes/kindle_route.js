const express = require('express')
const kindleBooksrRoute = express.Router()

const {viewAllKindleMaths, newKindleMaths, viewKindleMaths, renewKindleMaths, updateKindleMathsProperties, deleteKindleMaths} = require('../controllers/kindle_maths_controller')

const {viewAllKindleStems, viewKindleStem, renewKindleStem, updateKindleStemProperties, deleteKindleStem} = require('../controllers/kindle_stem_controller')

// interestingly you didn't have to use destructuring in the above two examples.  You could simply have created a variable for the require and then inside the route, use, for example kindleBooksRoute.get(url, variable.viewKindleMaths), where the second parameter is accessing the property from the require using the 'object.property' method.  Instead, above uses destrucruting to call get all properties, which can then be used as the second route parameter. 

// const { default: mongoose } = require('mongoose')
// 

// all kindles
kindleBooksrRoute.get('/kindle_maths',  viewAllKindleMaths)
.post('/kindle_maths/',  newKindleMaths)


// individual kindles
kindleBooksrRoute.get('/kindle_maths/:_id',  viewKindleMaths)
.put('/kindle_maths/:_id', renewKindleMaths)
.patch('/kindle_maths/:_id', updateKindleMathsProperties)
.delete('/kindle_maths/:_id', deleteKindleMaths)


// all kindle stems
kindleBooksrRoute.get('/kindle_stems',  viewAllKindleStems)
.post('/kindle_stems/',  renewKindleStem)


// individual kindle stems
kindleBooksrRoute.get('/kindle_stems/:_id',  viewKindleStem)
.put('/kindle_stems/:_id', renewKindleStem)
.patch('/kindle_stems/:_id', updateKindleStemProperties)
.delete('/kindle_stems/:_id', deleteKindleStem)
        

        module.exports = kindleBooksrRoute