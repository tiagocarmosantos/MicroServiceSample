const mongoose = require('mongoose')
const uriMongoDB = `mongodb+srv://admuser:Softtek01@cluster0.pg74r.mongodb.net/apptemplatesample?authSource=admin&replicaSet=atlas-tjga6r-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true` || 'mongodb://localhost/database'

mongoose.Promise = global.Promise
module.exports = mongoose.connect(uriMongoDB, { useNewUrlParser: true, useUnifiedTopology: true })

mongoose.Error.messages.general.required = "O atributo '{PATH}' é obrigatório!"
mongoose.Error.messages.Number.min = "O '{VALUE}' é menor que o limite minimo de '{MIN}'."
mongoose.Error.messages.Number.max = "O '{VALUE}' é maior que o limite máximo de '{MAX}'."
mongoose.Error.messages.String.enum = "O '{VALUE}' não é válido para o atributo '{PATH}'."