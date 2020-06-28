const restful = require('node-restful')
const mongoose = restful.mongoose
const imageSchema = require('../image/image').schema
const userSchema = require('../user/user').schema

const picMeSchema = new mongoose.Schema({
	user: userSchema,
	image: imageSchema
})

module.exports = restful.model('PicMe', picMeSchema)