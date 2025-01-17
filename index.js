const path = require('path'); // Importing the path module to resolve the views directory
const express= require('express');
const mongoose= require('mongoose');

const userRoute= require('./routes/user');

const app = express();

app.set('view engine', "ejs");
app.set("views", path.resolve("./views"));



mongoose.connect('mongodb://localhost:27017')
    .then((e)=>console.log('mongodb connected'));


    app.use(express.urlencoded({ extended: false }));
app.get('/', (req, res) => {
    res.render("home")
})
app.use('/user', userRoute)

app.get('/signup', (req, res) => {
    res.render("signup");
});

app.listen(8000, ()=>{
    console.log('Server is running on port 8000');
})