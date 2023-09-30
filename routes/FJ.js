const { Router } = require('express')
const fjRoute = Router()
const { FJ } = require('../controllers')

fjRoute.get('/', FJ.listFJs)
fjRoute.get('/information/:id/freelancer', FJ.FJInformation)
fjRoute.post('/create', FJ.create)
fjRoute.get('/delete/:id', FJ.delete)
fjRoute.post('/update/:id', FJ.update)

module.exports = fjRoute