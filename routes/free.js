const { Router } = require('express')
const freeRoute = Router()
const { Free } = require('../controllers')

freeRoute.get('/', Free.listFreelancers)
freeRoute.get('/freelancer/:id', Free.findFreelancer)
freeRoute.get('/create', Free.createPage)
freeRoute.post('/create', Free.create)
freeRoute.get('/delete/:id', Free.delete)
freeRoute.get('/update/:id', Free.updatePage)
freeRoute.post('/update/:id', Free.update)

module.exports = freeRoute
