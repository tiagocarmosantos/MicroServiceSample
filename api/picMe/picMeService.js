const _ = require('lodash')
const PicMe = require('./picMe')

PicMe.methods(['get', 'post', 'put', 'delete'])
PicMe.updateOptions({ new: true, runValidators: true })

PicMe.route('count', function(req, res, next) {
	PicMe.count(function(error, value){
		if(error){
			res.status(500).json({errors: [error]})
		}else{
			res.json({ value })
		}
	})
})

PicMe.after('post', sendErrorsOrNext).after('put', sendErrorsOrNext)

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

module.exports = PicMe