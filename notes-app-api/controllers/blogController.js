// blog_index, blog_details, blog_create_get, blog_create_post, blog_delete
const express = require("express");
const Blog = require("../models/blog");
const blogController = express();

// NOTE
// put those in app.js as middleware need to execute first
// then controller later

// var bodyParser = require("body-parser");
// blogController.use(bodyParser.urlencoded({ extended: true }));
// blogController.use(bodyParser.json());


const all_blogs = (req, res) => {
  Blog.find()
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      console.log(error);
    });
};

const single_blog = (req, res) => {
  const query = Blog.where({ title: "new blog1" });
  query
    .findOne()
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      console.log(error);
    });
};

const blog_create_post = (req, res) => {
  // need body parser to use req.body
  let blog = new Blog({
    title: req.body.title,
    content: req.body.content,
    snippet: req.body.snippet,
  });
  blog
    .save()
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      console.log(error);
    });
};

const single_blog_by_ID = (req, res) => {
    const id = req.params.id

    Blog.findById(id)
    .then((result) => {
        res.json(result)
    })
    .catch((error) => {
        console.log(error)
        console.log(id)
    })
}

const delete_blog_by_ID = (req, res) => {
    const id = req.params.id
    Blog.findByIdAndDelete({_id: id})
    .then((result) => {
        res.json("Xóa thành công")
    })
    .catch((error) => {
        console.log(error)
    })
}

module.exports = {
  getAllBlogs: all_blogs,
  getSingleBlog: single_blog,
  createPost: blog_create_post,
  getSingleBlogByID: single_blog_by_ID,
  deleteBlogByID: delete_blog_by_ID,
};
