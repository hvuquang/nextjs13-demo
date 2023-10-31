const express = require('express')

// define a router to manage blog routes
const blog_router = express.Router()

// get the controller
const blogController = require('../controllers/blogController')

blog_router.get('/all-blogs', blogController.getAllBlogs)

blog_router.get('/single-blog', blogController.getSingleBlog)

blog_router.post('/add-blog', blogController.createPost)

//route params
//localhost:3000/blog/:id
// :id là biến thay đổi tùy vào params client gửi
blog_router.get('/blog/:id', blogController.getSingleBlogByID)

blog_router.delete('/blog/delete/:id', blogController.deleteBlogByID)

module.exports = blog_router