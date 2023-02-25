'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = Schema({
    name:{
        type: String,
        required : true,
    },
    lastName:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    
    },
    password:{
        type: String,
        required: true
    },
    rol: {
        type: String,
        required: true,
    },
    age: Number
    
})

module.exports = mongoose.model("users", UserSchema);
