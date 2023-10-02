const { Router } = require('express')
const fjRoute = Router()
const { FJ } = require('../controllers')

fjRoute.get('/', FJ.listFJs)
fjRoute.get('/information/:id/freelancer', FJ.FJInformation)
fjRoute.get('/jobInformation/:jobId/freelancer/:freeId', FJ.listFreelancOfJob)
fjRoute.get('/update/:jobId/freelancer/:freeId', FJ.updateOnListJob)
fjRoute.post('/create', FJ.create)
fjRoute.get('/delete/:id', FJ.delete)
fjRoute.post('/update/:id', FJ.update)

module.exports = fjRoute