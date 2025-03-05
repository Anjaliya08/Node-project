var mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const registerSchema = new mongoose.Schema({

    name:
    {
        type: String,
        required: true
    },
    number:
    {
        type: Number,
        required: true

    },
    mail:
    {
        type: String,
        required: true
    },
    address:
    {
        type: String,
        required: true
    },
    password:
    {
        type: String,
        required: true
    },
    
})

registerSchema.pre("save", function(next){
    if(!this.isModified("password")) {
        return next();
    }
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

registerSchema.methods.comparePassword = function (plaintext, callback) {
    return callback(null, bcrypt.compareSync(plaintext, this.password));
};

const registerSchema1= new mongoose.model("login", registerSchema);
module.exports = registerSchema1;