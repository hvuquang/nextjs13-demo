const mongoose = require('mongoose')
const Schema = mongoose.Schema

//define the Schema Structure
const blogSchema =  new Schema({
    title: {
        type: String,
        require: true
    },
    content: {  
        type: String,
        require: true
    },
    snippet: {
        type: String,
        required: false
    }
}, {timestamps: true})

//create MODEL based on the Schema
const Blog = mongoose.model('Blog', blogSchema)

//export module to use
module.exports = Blog