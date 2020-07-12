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
PicMe.after('get', filterRoute)

function filterRoute(req, res, next) {
	if(!!req.query.filter) {
		PicMe.find(function(error, value){
			if(error){
				res.status(500).json({errors: [error]})
			} else {
				let filterParam = req.query.filter.split(':')[0]
				let filterValue = req.query.filter.split(':')[1]
				valueFiltered = value.filter((item) => {
					let itemValue = getPropByString(item, filterParam)
					return itemValue == filterValue
				})
				res.json(valueFiltered)
			}
		})
	} else{
		next()
	}
}

function getPropByString(obj, propString) {
    if (!propString)
        return obj;

    var prop, props = propString.split('.');

    for (var i = 0, iLen = props.length - 1; i < iLen; i++) {
        prop = props[i];

        var candidate = obj[prop];
        if (candidate !== undefined) {
            obj = candidate;
        } else {
            break;
        }
    }
    return obj[props[i]];
}

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