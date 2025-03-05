var mongoose = require('mongoose');
const bookSchema = new mongoose.Schema({
    name:
    {
        type: String,
        required: true
    },
    phone:
    {
        type: Number,
        required: true
    },
    email:
    {
        type: String,
        required: true
    },
    persons:
    {
        type: String,
        required: true
    },
    date:
    {
        type: String,
        required: true
    }, 
})
const bookSchema1= new mongoose.model("viewbooking", bookSchema);
module.exports = bookSchema1;