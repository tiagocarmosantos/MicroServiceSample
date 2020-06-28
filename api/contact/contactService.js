const _ = require('lodash')
const Contact = require('./contact')

Contact.methods(['get', 'post', 'put', 'delete'])
Contact.updateOptions({ new: true, runValidators: true })

Contact.route('count', function(req, res, next) {
	Contact.count(function(error, value){
		if(error){
			res.status(500).json({errors: [error]})
		}else{
			res.json({ value })
		}
	})
})

Contact.after('post', sendErrorsOrNext).after('put', sendErrorsOrNext)

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

module.exports = Contact