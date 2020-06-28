const restful = require('node-restful')
const mongoose = restful.mongoose

const operatorSchema = new mongoose.Schema({
	nome: { type: String, required: [true, "Informe o nome!"] },
	codigo: { type: Number, required: [true, "Informe o código!"] },
	categoria: { type: String, required: true, uppercase: true, 
				 enum: ['CELULAR', 'FIXO'] },
	preco: { type: Number, required: [true, "Informe o preço!"] }
})

module.exports = restful.model('Operator', operatorSchema)