const mongoose = require('mongoose')

const mathKindleSchema = new mongoose.Schema({
    Title: String,
    Author: String,
    Publisher: String,
    Edition: String,
    Format: String,
    Genres: Array,
    ASIN:String,
    Language  : String,
    FileSize  : String,
    Text_to_Speech  : String,
    Enhanced_typesetting  : String,
    XRay  : String,
    Word_Wise  : String,
    Sticky_notes  : String,
    Print_length  : String,
    Description: String,
    BuyUrl: String,
    ImgUrl :String
});
 
let MathKindleStore = mongoose.model('kindle_math', mathKindleSchema)


module.exports = MathKindleStore;