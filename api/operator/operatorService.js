const _ = require('lodash')
const Operator = require('./operator')

Operator.methods(['get', 'post', 'put', 'delete'])
Operator.updateOptions({ new: true, runValidators: true })

Operator.route('count', function(req, res, next) {
	Operator.count(function(error, value){
		if(error){
			res.status(500).json({errors: [error]})
		}else{
			res.json({ value })
		}
	})
})

Operator.after('post', sendErrorsOrNext).after('put', sendErrorsOrNext)

function sendErrorsOrNext(req, res, next) {
	const bundle = res.locals.bundle
	if(bundle.errors) {
		var errors = parseErrors(bundle.errors)
		res.status(500).json({errors})
	}else {
		next()
	}
}

function parseErrors(nodeRestfulErrors){
	const errors = []
	_.forIn(nodeRestfulErrors, error => errors.push(error.message))
	return errors

}

module.exports = Operator