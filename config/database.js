const mongoose = require('mongoose')
const uriMongoDB = process.env.MONGOLAB_URI || 'mongodb://localhost/database'

mongoose.Promise = global.Promise
module.exports = mongoose.connect(uriMongoDB, { useNewUrlParser: true, useUnifiedTopology: true })

mongoose.Error.messages.general.required = "O atributo '{PATH}' é obrigatório!"
mongoose.Error.messages.Number.min = "O '{VALUE}' é menor que o limite minimo de '{MIN}'."
mongoose.Error.messages.Number.max = "O '{VALUE}' é maior que o limite máximo de '{MAX}'."
mongoose.Error.messages.String.enum = "O '{VALUE}' não é válido para o atributo '{PATH}'."