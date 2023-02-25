'use strict'
const express = require('express')
const {Router} = require('express')
const {createUser, readUser, updateUser, deleteUser, loginUser} = require("../controllers/user.controller")
const { check } = require("express-validator");
const {validateParams} = require('../middlewares/validate-params');
const {validateJWT} = require('../middlewares/validate-jwl')
const api = Router()

api.post('/create-user',
[validateJWT,
check('name','el nombre es olbigatorio').not().isEmpty(),
check('password','el pasword debe tener minimo 6 digitos').isLength({min: 6}),
check('email','es un campo obligatorio').not().isEmpty(),
validateParams
],
createUser)

api.post('/login', loginUser)
api.get('/list-users',validateJWT,readUser)
api.put('/update-user/:id',
[   validateJWT,
    check('password','el password debe tener un minimo de 6 digitos').isLength({min:6}),
    validateParams
],
 updateUser)

api.delete('/delete-user/:id',validateJWT,deleteUser)
module.exports = api