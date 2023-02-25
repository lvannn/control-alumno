'use strict'
const express = require('express')
const {Router} = require('express')
const {createCourse, aalumno, listCourse, updateCourse, deleteCourse} = require ("../controllers/course.controller")
const {validateJWT} = require('../middlewares/validate-jwl')
const api = Router()

api.post('/create-course',validateJWT,createCourse)
api.put('/alumno-curso/:id', aalumno)
api.get('/list-courses', listCourse)
api.put('/edit-course/:id',validateJWT, updateCourse)
api.delete('/delete-course/:id',validateJWT, deleteCourse)

module.exports=api  