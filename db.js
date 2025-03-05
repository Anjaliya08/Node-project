const mongoose = require('mongoose');
var conn=mongoose.connect("mongodb+srv://anjali892002:Anjali08@cluster0.osfef.mongodb.net/user?retryWrites=true&w=majority&appName=Cluster0",
{
   useNewUrlParser: true,
   useUnifiedTopology: true
})
  .then(() => console.log("connection successfully.."))
  .catch((err) => console.log(err));

  module.exports = conn;