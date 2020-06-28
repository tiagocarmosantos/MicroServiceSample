const _ = require('lodash')
const BillingCycle = require('../billingCycle/billingCycle')

//Method 01 - Define WebService function.
function getSummary(req, res) {
	BillingCycle.aggregate(
		 { $project: {credit:{$sum:"$credits.value"}, debt:{$sum: "$debts.value"}} }
		,{ $group: {_id: null, credit: {$sum: "$credit"}, debt: {$sum: "$debt"}} }
		,{ $project: {_id: 0, credit: 1, debt: 1} }
	, function(error, result) {
		if(error){
			res.status(500).json({errors: [error]})
		}else{
			res.json(_.defaults(result[0], {credit: 0, debt: 0}))
		}
	})
}

//Method 02 - Define Route and WebService (Node-Restful) function
// BillingCycle.route('billingSummary', function(req, res, next){
// 	BillingCycle.aggregate(
// 		 { $project: {credit:{$sum:"$credits.value"}, debt:{$sum: "$debts.value"}} }
// 		,{ $group: {_id: null, credit: {$sum: "$credit"}, debt: {$sum: "$debt"}} }
// 		,{ $project: {_id: 0, credit: 1, debt: 1} }
// 	, function(error, result) {
// 		if(error){
// 			res.status(500).json({errors: [error]})
// 		}else{
// 			res.json(_.defaults(result[0], {credit: 0, debt: 0}))
// 		}
// 	})
// })

//Method 01 - Export function
module.exports = { getSummary }

//Method 02 - Export WebService (Node-Restful)
//module.exports = BillingCycle
