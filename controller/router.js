var express = require('express');
var router = express.Router();
var registerSchema=require('../model/registerschema');
var addproductSchema = require('../model/addproductschema');
const bookSchema = require('../model/bookschema');
const orderSchema = require('../model/orderschema');
const Category = require('../model/categoryschema');
const multer = require('multer');
const { v4: uuidv4 } =require('uuid');



router.get('/category',function(req,res)
{
    res.render("dashboard/category");
});

router.post('/category',(req,res) => {
    var regpost=
    {
        name: req.body.name,
        description: req.body.description,
    };
    var reg = new Category(regpost)
reg.save()
.then((item) =>
    res.json('added successfully'))
.catch(err => res.status(400).json('error:' + err));
});

router.get('/addproduct', async (req, res) => {
    try {
        // Query all categories from the database
        const categories = await Category.find();

        // Pass categories to the EJS template
        res.render('dashboard/addproduct', { categories });
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).send('Server error');
    }
});
router.get('/order', async (req, res) => {
    try {
        // Query all categories from the database
        const categories = await Category.find();

        // Pass categories to the EJS template
        res.render('order', { categories });
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).send('Server error');
    }
});


// Route to display products by category
router.get('/menu', async (req, res) => {
    try {
        // Fetch all categories from the database
        const categories = await Category.find();

        // Fetch products for each category
        const products = {};
        for (const category of categories) {
            const categoryProducts = await addproductSchema.find({ category: category._id });
            products[category.name] = categoryProducts;
        }

        // Render the page with categories and their respective products
        res.render('menu', { categories, products });
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).send('Server error');
    }
});
// router.get('/',function(req,res)
// {
//     res.render("home");
// });

router.get("/",async(req,res) =>{
    try{
        const productdata = await addproductSchema.find({});
        res.render('home',{productdata: productdata});
        console.log(productdata);
    } catch (err){
        console.log(err);
    }
});

//api of limit 6 on home

router.get('/about',function(req,res)
{
    res.render("about");
});
router.get('/menu',function(req,res)
{
    res.render("menu");
});
router.get('/book',function(req,res)
{
    res.render("book");
});
router.get('/order',function(req,res)
{
    res.render("order");
});
// Fetch items based on category
router.get('/addproduct/:categoryId', async (req, res) => {
    try {
        const items = await addproductSchema.find({ category: req.params.categoryId }); // Find menu items by category
        res.json(items); // Return the menu items as a JSON response
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching menu items' });
    }
});




router.get('/register',function(req,res)
{
    res.render("register");
});
// / Registration API..
router.post('/register',(req,res) => {
    var regpost=
    {
        name: req.body.name,
        number: req.body.number,
        mail: req.body.mail,
        address: req.body.address,
        password: req.body.password,
        confirmpassword: req.body.confirmpassword
    };
    var reg = new registerSchema(regpost)
reg.save()
.then((item) =>
    res.json('register successfully'))
.catch(err => res.status(400).json('error:' + err));
});

// router.get('/dashboard',function(req,res)
// {

//     res.render("dashboard/index");
// });
router.get('/dashboard', function(req, res){
    if(req.session.user && req.cookies.user_sid){
        res.render('dashboard/index');
    } 


else {
    res.redirect('/login');
}
})

router.get('/addproduct',function(req,res)
{
    res.render("dashboard/addproduct");
});
//file upload
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './upload');
    },
    filename: function (req, file, cb) {
        cb(null,file.originalname);
        // cb(null, uuidv4()+'-'+Date.now() + path.extname(file.originalname))
    }

});
const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg','image/jpg','image/png','image/webp'];
    if(allowedFileTypes.includes(file.mimetype)){
        cb(null, true);
    } else {
        cb(null, false);

    }
}
// const Upload = multer({
//     storage: multer.memoryStorage(), // or specify a diskStorage for saving to disk
//     fileFilter: fileFilter,
//     limits: {
//         fileSize: 100 * 1024// Limit file size to 100kb
//     }
// });

let upload = multer({ storage, fileFilter});

//addproduct
router.post('/addproduct',upload.single('image'),(req,res) => {
    var regpost=
    {
        Productname: req.body.Productname,
        description: req.body.description,
        category: req.body.category,
        price: req.body.price,
        image: req.file.filename,
    };
    var reg = new addproductSchema(regpost)
reg.save()
.then((item) =>
    res.json(' successfully added the product'))
.catch(err => res.status(400).json('error:' + err));
});

router.get('/addproduct', async (req, res) => {
    try {
        const categories = await Category.find(); // Fetch all categories
        res.render('addProduct', { categories }); // Render form and pass categories
    } catch (error) {
        res.status(500).send(`Error fetching categories: ${error.message}`);
    }
});
// router.get('/viewproduct',function(req,res)
// {
//     res.render("dashboard/viewproduct");
// });
router.get("/viewproduct",async(req,res) =>{
    try{
        const productdata = await addproductSchema.find({});
        res.render('dashboard/viewproduct',{productdata: productdata});
        console.log(productdata);
    } catch (err){
        console.log(err);
    }
});
//delete api
router.get("/delete2/:id", async (req, res) => {
    try{
        const productdata = await addproductSchema.findByIdAndDelete
        (req.params.id);

        //return res.redirect("your url");
        res.redirect('/viewproduct');
    }
    catch (err){
        console.log(err);
    }
})


router.get("/edit2/:id", async (req,res) => {
    try{
        const productdata = await addproductSchema.findById
        (req.params.id);
        res.render('dashboard/edit-addproduct',{productdata: productdata});
          
    } catch (err) {
        console.log(err);
    }

});

router.post('/edit2/:id', async (req,res) =>{
    const itemId = req.params.id;
    const updatedData ={
        Productname: req.body.Productname,
        description: req.body.description,
        category: req.body.category,
        price: req.body.price,
        image: req.body.image,
    }
    try{
        const updatedItem = await addproductSchema.findByIdAndUpdate(itemId, updatedData,{ new: true});
    if (!updatedItem) {
        return res.status(404).json({ message: 'item not found' });
    }
    res.redirect('../viewproduct');
    } catch(err) {
        res.status(500).json({ message: 'server error' });
    }
});

router.get("/viewregister",async(req,res) =>{
    try{
        const registerdata = await registerSchema.find({});
        res.render('dashboard/viewregister',{registerdata: registerdata});
        console.log(registerdata);
    } catch (err){
        console.log(err);
    }
});
//delete api
router.get("/delete/:id", async (req,res) => {
    try{
        const registerdata = await registerSchema.findByIdAndDelete
        (req.params.id);
        //return res.redirect("your url");
        res.redirect('/viewregister');
    } catch (err) {
        console.log(err);
    }
});

//edit api

router.get("/edit/:id", async (req,res) => {
    try{
        const registerdata = await registerSchema.findById
        (req.params.id);
        res.render('dashboard/edit-register',{registerdata: registerdata});
          
    } catch (err) {
        console.log(err);
    }

});

router.post('/edit/:id', async (req,res) =>{
    const itemId = req.params.id;
    const updatedData ={
        name:req.body.name,
        number:req.body.number,
        mail:req.body.mail,
        address:req.body.address,
        password:req.body.password,
    }
    try{
        const updatedItem = await registerSchema.findByIdAndUpdate(itemId, updatedData,{ new: true});
    if (!updatedItem) {
        return res.status(404).json({ message: 'item not found' });
    }
    res.redirect('../viewregister');
    } catch(err) {
        res.status(500).json({ message: 'server error' });
    }
});

// router.get('/viewbooking',function(req,res)
// {
//     res.render("dashboard/viewbooking");
// });

router.post('/book',(req,res) => {
    var regpost=
    {
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        persons: req.body.persons,
        date: req.body.date,
    };
    var reg = new bookSchema(regpost)
reg.save()
.then((item) =>
    res.json('booked successfully'))
.catch(err => res.status(400).json('error:' + err));
});
router.get("/viewbooking",async(req,res) =>{
    try{
        const bookdata = await bookSchema.find({});
        res.render('dashboard/viewbooking',{bookdata: bookdata});
        console.log(bookdata);
    } catch (err){
        console.log(err);
    }
});
//delete api
router.get("/delete3/:id", async (req, res) => {
    try{
        const bookdata = await bookSchema.findByIdAndDelete
        (req.params.id);

        //return res.redirect("your url");
        res.redirect('/viewbooking');
    }
    catch (err){
        console.log(err);
    }
})

//edit api
router.get("/edit3/:id", async (req, res) => {
    try{
        const bookdata = await bookSchema.findById
        (req.params.id);

        //return res.redirect("your url");
        res.render('dashboard/edit-book',{bookdata: bookdata});
    }
    catch (err){
        console.log(err);
    }
});
router.post('/edit3/:id', async (req,res) =>{
    const itemId = req.params.id;
    const updatedData ={
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        persons: req.body.persons,
        date: req.body.date,
    }
    try{
        const updatedItem = await bookSchema.findByIdAndUpdate(itemId, updatedData,{ new: true});
    if (!updatedItem) {
        return res.status(404).json({ message: 'item not found' });
    }
    res.redirect('../viewbooking');
    } catch(err) {
        res.status(500).json({ message: 'server error' });
    }
});

//order api

router.post('/order',(req,res) => {
    var regpost=
    {
        fname: req.body.fname,
        lname: req.body.lname,
        menu: req.body.menu,
        other: req.body.other,
        address: req.body.address,
        saddress: req.body.saddress,
        city: req.body.city,
        region: req.body.region,
        zip: req.body.zip,

    };
    var reg = new orderSchema(regpost)
reg.save()
.then((item) =>
    res.json('order successfully'))
.catch(err => res.status(400).json('error:' + err));
});

router.get("/vieworder",async(req,res) =>{
    try{
        const orderdata = await orderSchema.find({});
        res.render('dashboard/vieworder',{orderdata: orderdata});
        console.log(orderdata);
    } catch (err){
        console.log(err);
    }
});

//delete api
router.get("/delete4/:id", async (req, res) => {
    try{
        const orderdata = await orderSchema.findByIdAndDelete
        (req.params.id);

        //return res.redirect("your url");
        res.redirect('/vieworder');
    }
    catch (err){
        console.log(err);
    }
})

//edit api
router.get("/edit4/:id", async (req, res) => {
    try{
        const orderdata = await orderSchema.findById
        (req.params.id);

        //return res.redirect("your url");
        res.render('dashboard/edit-order',{orderdata: orderdata});
    }
    catch (err){
        console.log(err);
    }
});
router.post('/edit4/:id', async (req,res) =>{
    const itemId = req.params.id;
    const updatedData ={
        fname: req.body.fname,
        lname: req.body.lname,
        menu: req.body.menu,
        other: req.body.other,
        address: req.body.address,
        saddress: req.body.saddress,
        city: req.body.city,
        region: req.body.region,
        zip: req.body.zip,
    }
    try{
        const updatedItem = await orderSchema.findByIdAndUpdate(itemId, updatedData,{ new: true});
    if (!updatedItem) {
        return res.status(404).json({ message: 'item not found' });
    }
    res.redirect('../vieworder');
    } catch(err) {
        res.status(500).json({ message: 'server error' });
    }
});

router.get('/detail',function(req,res)
{
    res.render("detail");
});
router.get("/detail/:id", async (req, res) => {
    try{
        var productdata = await addproductSchema.findById(req.params.id);
        //  console.log(productdata);
        //return res.redirect("your url");
        res.render('detail',{productdata: productdata});
    }
    catch (err){
        console.log(err);
    }
});
router.get('/login',function(req,res)
{
    res.render("login");
});

router.post('/login',async (req, res) => {
    var mail = req.body.mail,
    password = req.body.password;

    try {
        var user = await registerSchema.findOne({mail: mail })
        .exec();
        if(!user) {
            res.redirect("/");
        }
        user.comparePassword(password,(error, match) => {
            if(!match) {
                res.redirect("/dashboard");
            }
        });
            req.session.user = user;
        res.redirect("/dashboard");
    }catch (error){
        console.log(error)
    }
});

module.exports = router;