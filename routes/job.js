const { Router } = require('express')
const jobRoute = Router()
const { JobController } = require('../controllers')

jobRoute.get('/', JobController.listJobs)
jobRoute.get('/jobInformation/:id', JobController.jobInformation)
jobRoute.post('/create', JobController.create)
jobRoute.get('/delete/:id', JobController.delete)
jobRoute.post('/update/:id', JobController.update)

module.exports = jobRoute