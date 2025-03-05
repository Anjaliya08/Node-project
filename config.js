const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://anjali892002:Anjali08@cluster0.osfef.mongodb.net/user?retryWrites=true&w=majority&appName=Cluster0",
{
   useNewUrlParser: true,
   useUnifiedTopology: true
})
  .then(() => console.log("connection successfully.."))
  .catch((err) => console.log(err));

  const listSchema = new mongoose.Schema({
   name:
   {
      type:String,
      required:true
   },
   email:
   {
      type: String,
      required: true
   },
   date:
   {
      type:Date,
      default:Date.now
   }
  })
  const Playlist = new mongoose.model("Playlist",listSchema);
  const createDocument = async () => {
   try{
      const productList2 = new Playlist({
         name:'sita',
         email:'sita@gmail.com'
      })
      const productList3 = new Playlist({
         name:'mita',
         email:'mita@gmail.com'
      })
      const productList4 = new Playlist({
         name:'rita',
         email:'rita@gmail.com'
      })
      const result = await Playlist.insertMany([productList2,productList3,productList4]);
      console.log(result);
   }catch (err){
      console.log(err);
   }
  }
  createDocument();
