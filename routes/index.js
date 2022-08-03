const express = require("express");
const app = express()
const productsRoute = require('./productsRoute')
const categoriesRoute = require('./categoriesRoute')
const usersRoute = require('./usersRoute')
const authRoute = require('./authRoute')

app.use('/products', productsRoute)
app.use('/categories', categoriesRoute)
app.use('/users', usersRoute)
app.use('/auth', authRoute)

module.exports = app

