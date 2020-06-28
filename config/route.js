const express = require('express')
const auth = require('./auth')

module.exports = function(server) {

    /*
	 * Rotas abertas
	 */
	const openApi = express.Router()
	server.use('/oapi', openApi)

	const AuthService = require('../api/user/authService')
	openApi.post('/login', AuthService.login)
	openApi.post('/signup', AuthService.signup)
	openApi.post('/validateToken', AuthService.validateToken)

	const operatorService = require('../api/operator/operatorService')
	operatorService.register(openApi, '/operadoras')

	const contactService = require('../api/contact/contactService')
	contactService.register(openApi, '/contatos')

	const quickMenuService = require('../api/quickMenu/quickMenuService')
	quickMenuService.register(openApi, '/quickMenu')

	const picMeService = require('../api/picMe/picMeService')
	picMeService.register(openApi, '/picMe')

	/*
	 * Rotas protegidas por Token JWT
	 */
	const protectedApi = express.Router()
	server.use('/api', protectedApi)
	protectedApi.use(auth)

	//API Routes
	// const router = express.Router()
	// server.use('/api', router)
	// router.route('/teste').get(function(req, res, next) {
	// 	res.send('Router Funcionou...')
	// })

	//Rotas da API
	const billingCycleService = require('../api/billingCycle/billingCycleService')
	billingCycleService.register(protectedApi, '/billingCycles')

	const billingSummaryService = require('../api/billingSummary/billingSummaryService')
	// Method 01 - Mapping route to WebService function.
	protectedApi.route('/billingSummary').get(billingSummaryService.getSummary)
	// Method 02 - Register route on WebServer Express.
	//billingSummaryService.register(protectedApi, '')
}