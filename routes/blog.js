const { Router} = require('express');
const multer= require('multer');
const path= require('path');

const Blog = require('../models/blog')
const router = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(`./public/uploads/` ));
    },
    filename: function (req, file, cb) {
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
    }
  })
  
  const upload = multer({ storage: storage })

router.get('/add-new', (req, res) => {
   return res.render("addBlog",{
    user:req.user,
   });
});

router.post('/', upload.single("coverImage"),async(req, res) => {
   const{title, body}= req.body
   const blog= await Blog.create({
    body,
    title,
    coverImage: `/uploads/${req.file.filename}`,
    author: req.user._id,
   })
    return res.redirect(`/blog/${blog._id}`);
});