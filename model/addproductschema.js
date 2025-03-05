var mongoose = require('mongoose');
const addproductSchema = new mongoose.Schema({
    Productname:
    {
        type: String,
        required: true
    },
    description:
    {
        type: String,
        required: true
    },
    category:
    {
        
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    price:
    {
        type: String,
        required: true
    },
    image:
    {
        type: String,
        required: true
    },
    
})
const addproductSchema1= new mongoose.model("addproduct", addproductSchema);
module.exports = addproductSchema1;