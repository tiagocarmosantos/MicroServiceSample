const restful = require('node-restful')
const mongoose = restful.mongoose
const imageSchema = require('../image/image').schema
//const imageSchema = mongoose.model('Image').schema

const quickMenuSchema = new mongoose.Schema({
	title: { type: String, required: [true, "Informe o titulo do menu!"] },
	subTitle: { type: String, required: [true, "Informe o sub-titulo do menu!"] },
	image: imageSchema
})

module.exports = restful.model('QuickMenu', quickMenuSchema)