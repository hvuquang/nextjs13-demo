const express = require('express')

// define a router to manage blog routes
const blog_router = express.Router()
const Blog = require('../models/blog')
var bodyParser = require('body-parser')

//install bodyParse
//parse data in req body
blog_router.use(bodyParser.json())
blog_router.use(bodyParser.urlencoded({extended: false}))

blog_router.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'new blog1',
        snippet: 'about my new blog',
        content: 'more about my new blog'
    })

    //save to db
    //promise
    blog.save()
    .then((result) => {
        res.send(result)
    })
    .catch((error) => {
        console.log(error)
    })
})

blog_router.get('/all-blogs', (req, res) => {
    Blog.find()
    .then((result) => {
        res.send(result)
    })
    .catch((error) => {
        console.log(error)
    })
})

blog_router.get('/single-blog', (req, res)=> {
    const query = Blog.where({title: 'new blog1'})
    query.findOne()
    .then((result) => {
        res.send(result)
    })
    .catch((error) => {
        console.log(error)
    })

})

blog_router.post('/blogs', (req, res) => {
    // need body parser to use req.body
    let blog = new Blog ({
        title: req.body.title,
        content: req.body.content,
        snippet: req.body.snippet,
    })
    // const blog = new Blog(req.body)
    blog
    .save()
    .then((result) => {
        res.json(result)
    })
    .catch((error) => {
        console.log(error);
    })

})

//route params
//localhost:3000/blog/:id
// :id là biến thay đổi tùy vào params client gửi
blog_router.get('/blog/:id', (req,res) => {
    const id = req.params.id

    Blog.findById(id)
    .then((result) => {
        res.json(result)
    })
    .catch((error) => {
        console.log(error)
        console.log(id)
    })
})

blog_router.delete('/blog/delete/:id', (req,res) => {
    const id = req.params.id
    Blog.findByIdAndDelete({_id: id})
    .then((result) => {
        res.json("Xóa thành công")
    })
    .catch((error) => {
        console.log(error)
    })
})

module.exports = blog_router