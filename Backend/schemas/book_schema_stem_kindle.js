const mongoose = require('mongoose')

const stemBooksKindleSchema = new mongoose.Schema({
    Title: String,
    Author: String,
    Publisher: String,
    Edition: String,
    ASIN:String,
    Language  : String,
    FileSize  : String,
    Text_to_Speech  : String,
    Enhanced_typesetting  : String,
    XRay  : String,
    Word_Wise  : String,
    Sticky_notes  : String,
    Print_length  : String,
    Description: String
});
 
let StemKindleCollection = mongoose.model('kindle_stem', stemBooksKindleSchema)


module.exports = StemKindleCollection;