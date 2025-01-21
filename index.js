const path = require('path'); // Importing the path module to resolve the views directory
const express= require('express');
const mongoose= require('mongoose');
const cookieParser = require('cookie-parser');

const userRoute= require('./routes/user');
const BlogRoute= require('./routes/blog');
const { checkForAuthenticationCookie } = require('./middlewares/authentication');

const app = express();

app.set('view engine', "ejs");
app.set("views", path.resolve("./views"));



mongoose.connect('mongodb://localhost:27017')
    .then((e)=>console.log('mongodb connected'));


app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie(token));
app.use(express.static(path.resolve(',/public')));

app.get('/', async(req, res) => {
    const allBlogs=await BlogRoute.find({}).sort('cratedAAt')
    res.render("home",{
        user: req.user,
        blogs: allBlogs,
    })
})
app.use('/user', userRoute);
app.use('/Blog', BlogRoute);

app.get('/signup', (req, res) => {
    res.render("signup");
});

app.listen(8000, ()=>{
    console.log('Server is running on port 8000');
})