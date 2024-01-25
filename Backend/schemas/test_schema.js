const mongoose = require('mongoose')

const testBookSchema = new mongoose.Schema({

    Title: String,
    Author: String,
    Edition: String,
    Publisher:String,
    Language:String,
    Genres:Array,
    Format: String,
    Pages: Number,
    ISBN_10:String,
    ISBN_13:String,
    ASIN:String,
    Dimensions: String,
    BuyUrl:String,
    ImgUrl:String,
    Description:String

   });
 
   let TestSchema = mongoose.model('test_book', testBookSchema)


module.exports = TestSchema;