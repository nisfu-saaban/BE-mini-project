const { Router } = require('express')
const fjRoute = Router()
const { FJController } = require('../controllers')

fjRoute.get('/', FJController.listFJs)
fjRoute.get('/', FJController.FJInformation)
fjRoute.post('/create', FJController.create)
fjRoute.get('/delete/:id', FJController.delete)
fjRoute.post('/update/:id', FJController.update)

module.exports = fjRoute