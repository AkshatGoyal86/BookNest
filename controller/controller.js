const express = require('express'); // importing express
const router=express.Router(); // importing router

const signup = require('../model/sign-up'); // importing sign-up.js to our file
const contact = require('../model/contact-us'); // importing contact-us.js to our file

const addproduct = require('../model/add-product'); // importing add-product.js to our file
const registerSchema = require('../model/sign-up'); // importing sign-up.js to our file

const multer = require('multer'); // importing multer
const { v4: uuidv4 } = require('uuid'); // importing uuid

const session = require('express-session'); // importing express-session
const cookieParser = require('cookie-parser'); // importing cookie-parser


router.use(cookieParser());
router.use(
    session({
        key: "user_sid",
        secret: "somerandomstuffs",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 10000, // in milli seconds
        }
    })
);


// now posting the form for signup
router.post('/register', (req, res) => {
    var register = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        confirm_password: req.body.confirm_password,
    };
    var regpost = new signup(register);
    regpost.save()
        .then(() =>
        res.json('signup successfully'))
        .catch(err => res.status(400).json('error:' + err));
});

// now posting the form for contact-us
router.post('/contact-us', (req, res) => {
    var contactus = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        number: req.body.number,
        email: req.body.email,
        message: req.body.message
    };
    var regpost = new contact(contactus);
    regpost.save()
        .then(() =>
        res.json('contactus successfully'))
        .catch(err => res.status(400).json('error:' + err));
});


// file upload
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './upload');
    },
    filename: function (req, file, cb) {
        cb(null,file.originalname);
        // cb(null, uuidv4()+'-'+ Date.now() + path.extname(file.originalname))
        // Appending .jpg
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg','image/png','image/webp',];
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
let upload = multer({ storage, fileFilter });


// now posting the form for add-product
router.post('/addproduct',upload.single('fourimage1'), (req, res) =>{
    var add_product = {
        fourimage1: req.file.filename,
        fourimage2: req.body.fourimage2,
        fourimage3: req.body.fourimage3,
        fourimage4: req.body.fourimage4
    };
    var regpost = new addproduct(add_product);
    regpost.save()
    .then(() =>
    res.json('add-product successfully'))
    .catch(err => res.status(400).json('error:' + err));
});

router.get('/rooms', async (req,res) => {
    try {
        const regdata = await addproduct.find({});
        res.render('rooms', {regdata: regdata});
        console.log(regdata);
    }catch (err) {
        console.log(err);
    }
});

// products-details
router.get("/productdetails/:id", async (req, res) => {
    try {
        const regdata = await addproduct.findById(req.params.id);
        res.render('product-details', {regdata: regdata});
    }catch (err) {
        console.log(err);
    }
});

// login api

router.get('/dashboard', function(req, res) {
    if(req.session.user && req.cookies.user_sid) {
        
        res.render('dashboard/index')
    }
    else {
        res.redirect("/");
    }
});

router.post('/login',async (req,res) => {
    var email = req.body.email,
    password = req.body.password;
    try {
        var user = await signup.findOne({email: email})
        .exec();
        console.log(signup);
        if(!signup) {
            res.redirect("/");
        }
        user.comparePassword(password,(error, match) => {
            if(!match) {
                res.redirect("/");
            }
        });
        req.session.user = user;
        res.redirect("/dashboard");
    }
        catch (error) {
            console.log(error)
        }
});

router.get('/',function(req,res){
    res.render('index');
})

router.get('/about',function(req,res){
    res.render('about');
})

router.get('/contact',function(req,res){
    res.render('contact');
})

router.get('/rooms',function(req,res){
    res.render('rooms');
})

router.get('/signup',function(req,res){
    res.render('signup');
})

// connecting dashboard to server

router.get('/dashboard',function(req,res){
    res.render('dashboard/index');
})

router.get('/add-product',function(req,res){
    if(req.session.user && req.cookies.user_sid) {
        res.render('dashboard/add-product');
    }
    else {
        res.redirect("/");
    }
})

router.get('/view-product', async (req,res) => {
    if(req.session.user && req.cookies.user_sid) {
        try {
            const regdata = await addproduct.find({});
            res.render('dashboard/view-product', {regdata: regdata});
            console.log(regdata);
        }catch (err) {
            console.log(err);
        }
    }
    else {
        res.redirect("/");
    }
});

router.get('/view-registration', async (req,res) => {
    if(req.session.user && req.cookies.user_sid) {
        try {
            const regdata = await signup.find({});
            res.render('dashboard/view-registration', {regdata: regdata});
            console.log(regdata);
        }catch (err) {
            console.log(err);
        }
    }
    else {
        res.redirect("/");
    }
});

router.get('/view-contact', async (req,res) => {
    if(req.session.user && req.cookies.user_sid) {
        try {
            const regdata = await contact.find({});
            res.render('dashboard/view-contact', {regdata: regdata});
            console.log(regdata);
        }catch (err) {
            console.log(err);
        }
    }
    else {
        res.redirect("/");
    }
});


// delete api
router.get("/delete-1/:id", async (req, res) => {
    try {
        const regdata = await addproduct.findByIdAndDelete(req.params.id);
        res.redirect('/view-product');
    }catch (err) {
        console.log(err);
    }
});
router.get("/delete-2/:id", async (req, res) => {
    try {
        const regdata = await signup.findByIdAndDelete(req.params.id);
        res.redirect('/view-registration');
    }catch (err) {
        console.log(err);
    }
});
router.get("/delete-3/:id", async (req, res) => {
    try {
        const regdata = await contact.findByIdAndDelete(req.params.id);
        res.redirect('/view-contact');
    }catch (err) {
        console.log(err);
    }
});

// update api
router.get("/update_products/:id", async (req, res) => {
    try {
        const regdata = await addproduct.findById(req.params.id);
        res.render('./dashboard/edit-product', {regdata: regdata});
    }catch (err) {
        console.log(err);
    }
});
router.get("/update_contacts/:id", async (req, res) => {
    try {
        const regdata = await contact.findById(req.params.id);
        res.render('./dashboard/edit-contact', {regdata: regdata});
    }catch (err) {
        console.log(err);
    }
});
router.get("/update_registrations/:id", async (req, res) => {
    try {
        const regdata = await signup.findById(req.params.id);
        res.render('./dashboard/edit-registration', {regdata: regdata});
    }catch (err) {
        console.log(err);
    }
});

// post api
router.post('/update_products/:id', upload.single('fourimage1'), async (req, res) => {
    const itemId = req.params.id;
    const updatedData = {
        fourimage1: req.file.filename,
        fourimage2: req.body.fourimage2,
        fourimage3: req.body.fourimage3,
        fourimage4: req.body.fourimage4
    }; // Data to update with

    try {
        const updatedItem = await addproduct.findByIdAndUpdate(itemId, updatedData, {new:true});

        if (!updatedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.redirect('/view-product');
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/update_contacts/:id', async (req, res) => {
    const itemId = req.params.id;
    const updatedData = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        number: req.body.number,
        email: req.body.email,
        message: req.body.message
    }; // Data to update with

    try {
        const updatedItem = await contact.findByIdAndUpdate(itemId, updatedData, {new:true});

        if (!updatedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.redirect('/view-contact');
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/update_registrations/:id', async (req, res) => {
    const itemId = req.params.id;
    const updatedData = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        confirm_password: req.body.confirm_password
    }; // Data to update with

    try {
        const updatedItem = await signup.findByIdAndUpdate(itemId, updatedData, {new:true});

        if (!updatedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.redirect('/view-registration');
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// logout api
router.get("/logout", (req,res) => {
    if (req.session.user && req.cookies.user_sid) {
        res.clearCookie("user_sid");
        res.redirect("/");
    } else {
        res.redirect("/");
    }
});

// connecting database to server
router.get('/database',function(req,res){
    res.render('db/config.js');
})

module.exports = router;