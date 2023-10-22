const mongoose = require('mongoose')

const stemKindleSchema = new mongoose.Schema({
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
 
let StemKindleStore = mongoose.model('kindle_math', stemKindleSchema)

// the model gets exported for use in API requests 
module.exports = StemKindleStore;