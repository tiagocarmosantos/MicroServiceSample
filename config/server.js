require('dotenv').config()
const bodyParser = require('body-parser')
const express = require('express')
const server = express()
const allowCors = require('./cors')
const queryParser = require('express-query-int')
const port = 3003

server.listen(process.env.PORT || port, function() {
    console.log(`BACKEND is running on port ${port}.`)
})

server.use(express.urlencoded({ extended: true }))
server.use(express.json())

server.use(allowCors)
server.use(queryParser())

server.use(function(req, res, next) {
	console.log('Express: Request: ')
	//console.log(req)
	next()
})

module.exports = server