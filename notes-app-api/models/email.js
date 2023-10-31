const mongoose = require('mongoose')
const Schema = mongoose.Schema

//lib for validating string
const validator = require('validator')

const emailSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: (value) => {
            return validator.isEmail(value)
        }
    }
})

module.exports = mongoose.model('Email', emailSchema)