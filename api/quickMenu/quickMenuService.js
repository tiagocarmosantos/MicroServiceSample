const _ = require('lodash')
const QuickMenu = require('./quickMenu')

QuickMenu.methods(['get', 'post', 'put', 'delete'])
QuickMenu.updateOptions({ new: true, runValidators: true })

QuickMenu.route('count', function(req, res, next) {
	QuickMenu.count(function(error, value){
		if(error){
			res.status(500).json({errors: [error]})
		}else{
			res.json({ value })
		}
	})
})

QuickMenu.after('post', sendErrorsOrNext).after('put', sendErrorsOrNext)

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

module.exports = QuickMenu