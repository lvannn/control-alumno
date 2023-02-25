'use strict'
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const CursoSchema = Schema({
    courseName: String,
    section: String,
    profesor: String,
    students: [{
        type: String,
        required: false
    },
        {
        name: String,
        lastName: String,
        required: true
    },
    ]
})

module.exports = mongoose.model("course", CursoSchema);