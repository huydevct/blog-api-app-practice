const express = require('express')
const router = express.Router();

// Load model
const Post = require('../models/Post');

//Show all posts
router.get('/', async (req,res,next) => {
    const posts = await Post.find().lean().sort({ date: -1 });
    res.render("posts/index", { posts })
})

//Show form add post
router.get('/add', (req,res,next) => {
    res.render('posts/add')
})

//create new post
router.post('/', async (req,res,next) => {
    const { title, text } = req.body;
    let errors = [];
    if(!title) errors.push({msg: 'title required'})
    if(!text) errors.push({msg: 'Text required'})
    if(errors.length > 0) res.render("posts/add", { title, text })
    else {
        const newPostData = { title, text };
        const newPost = new Post(newPostData);
        await newPost.save();
        res.redirect('/posts');
    }
})

//Show edit form
router.get('/edit/:id', async(req,res,next) => {
    const post = await Post.findOne({ _id: req.params.id }).lean();
    res.render("posts/edit", { post })
})

//update post to mongoDB
router.put('/:id', async(req,res,next) => {
    const { title, text } = req.body;
    await Post.findOneAndUpdate({ _id: req.params.id }, { title, text });
    res.redirect('/posts');
})

//Delete
router.delete('/:id', async(req,res,next) => {
    await Post.findOneAndRemove({ _id: req.params.id })
    res.redirect("/posts");
})

module.exports = router;