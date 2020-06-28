const restful = require('node-restful')
const mongoose = restful.mongoose

const imageSchema = new mongoose.Schema({
	title: { type: String, required: [true, "Informe o titulo da imagem!"] },
	contentType: { type: String, required: [true, "Informe o tipo da imagem!"] },
	content: { type: String, required: [true, "Informe a imagem!"] }
})

module.exports = restful.model('Image', imageSchema)