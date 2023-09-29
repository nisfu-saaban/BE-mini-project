const { Router } = require('express')
const route = Router()

route.get('/', (req, res) => {
    res.render('index.ejs')
})

const jobRoutes = require('./job')
const freelancerRoutes = require('./free')
const fjRoutes = require('./FJ')

route.use('/jobs', jobRoutes)
route.use('/freelancers', freelancerRoutes)
route.use('/FJs', fjRoutes)

module.exports = route

