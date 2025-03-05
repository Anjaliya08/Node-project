var mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    fname:
    {
        type: String,
        required: true
    },
    lname:
    {
        type: String,
        required: true

    },
    menu:
    {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    other:
    {
        type: String,
        required: true
    },
    address:
    {
        type: String,
        required: true
    },
    saddress:
    {
        type: String,
        required: true
    },
    city:
    {
        type: String,
        required: true
    },
    region:
    {
        type: String,
        required: true
    },
    zip:
    {
        type: String,
        required: true
    },
    
})
const orderSchema1= new mongoose.model("vieworder", orderSchema);
module.exports = orderSchema1;