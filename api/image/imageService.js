const _ = require('lodash')
const Image = require('./image')

Image.methods(['get', 'post', 'put', 'delete'])
Image.updateOptions({ new: true, runValidators: true })

Image.route('count', function(req, res, next) {
	Image.count(function(error, value){
		if(error){
			res.status(500).json({errors: [error]})
		}else{
			res.json({ value })
		}
	})
})

Image.after('post', sendErrorsOrNext).after('put', sendErrorsOrNext)

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

module.exports = Image