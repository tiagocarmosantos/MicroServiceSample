const restful = require('node-restful')
const mongoose = restful.mongoose
const operatorSchema = mongoose.model('Operator').schema

const contactSchema = new mongoose.Schema({
	nome: { type: String, required: [true, "Informe o nome!"] },
	telefone: { type: String, required: [true, "Informe o telefone!"] },
	data: { type: Date, required: [true, "Informe a data!"], default: Date.now },
	operadora: operatorSchema,
	cor: { type: String, required: [false, "Informe a cor!"] },
	selecionado: { type: Boolean },
	visualizavel: { type: Boolean },
	editavel: { type: Boolean },
	deletavel: { type: Boolean }
})

module.exports = restful.model('Contact', contactSchema)