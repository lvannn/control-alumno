'use strict'

const express = require("express")
const app = express()
const {connection}= require('./src/database/connection')
require('dotenv').config()
const port = process.env.PORT

const routes = require('./src/routers/user.router')
const routersCou = require('./src/routers/course.router')

connection()
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use('/api', routes)
app.use('/api', routersCou)

app.listen(port, () =>{
    console.log(`el servidor funciona en el puerto: ${port}`)
})


