const { job, freelancer_job, freelancer } = require('../models')


class JobController {
    static async listJobs(req, res) {
        try {
            let result = await job.findAll()
            if (result.length === 0) {
                return res.status(200).json({
                    message: `job has no items`
                })
            }
            res.status(200).render('job/index.ejs', { jobs: result })
        } catch (e) {
            res.status(500).json(e)
        }
    }

    static async jobInformation(req, res) {
        try {
            const id = +req.params.id
            if (typeof id !== 'number') {
                res.status(400).json({
                    message: `id invalid, id must a number`
                })
            }

            const result = await job.findByPk(id)
            if (!result) {
                res.status(404).json({
                    message: `job with id ${id} not found`
                })
            }

            const value = req.query.value;

            res.status(200).render('job/job_detail.ejs', { job: result, value })
        } catch (e) {
            res.status(500).json(e)
        }
    }

    static async createByParams(req, res) {
        try {
            const id = +req.params.id

            if (typeof id !== 'number') {
                res.status(400).json({
                    message: `id invalid (id must a number)`
                })
            }

            let freelancers = await freelancer.findAll()

            res.status(200).render('job/list_freelancer.ejs', { job_id: id, freelancers })
        } catch (e) {
            res.status(500).json(e)
        }

    }

    static createPage(req, res) {
        res.status(200).render('job/create.ejs')
    }

    static async create(req, res) {
        try {
            const { title, budget, description, status } = req.body
            let result = await job.create({
                title, budget, description, status
            })

            res.status(201).redirect('/jobs')
        } catch (e) {
            res.status(500).json(e)
        }
    }

    static async updatePage(req, res) {
        try {
            const id = +req.params.id
            const findJob = await job.findByPk(id)
            if (!findJob) {
                return res.status(404).json({
                    message: `job not found`
                })
            }

            res.status(200).render('job/update.ejs', { job: findJob })
        } catch (e) {
            res.json(e)
        }
    }

    static async updateStatus(req, res) {
        try {
            const status = req.body.radioStatus
            const id = +req.params.id
            if (typeof id !== 'number') {
                return res.status(400).json({
                    message: `id invalid, id must a number`
                })
            }

            const findJob = await job.findByPk(id)
            if (!findJob) {
                return res.status(404).json({
                    message: `job with id ${id} not found`
                })
            }

            let result = await job.update({
                status
            }, {
                where: { id }
            })

            result[0] === 1 ?
                res.status(200).redirect('/jobs') :
                res.status(400).json({
                    message: `cannot update job`
                })

        } catch (e) {
            res.status(500).json(e)
        }
    }

    static async update(req, res) {
        try {
            const id = +req.params.id
            if (typeof id !== 'number') {
                return res.status(400).json({
                    message: `id invalid, id must a number`
                })
            }

            const findJob = await job.findByPk(id)
            if (!findJob) {
                return res.status(404).json({
                    message: `job with id ${id} not found`
                })
            }
            const { title, budget, description, status } = req.body
            let result = await job.update({
                title, budget, description, status
            }, {
                where: { id }
            })

            result[0] === 1 ?
                res.status(200).redirect('/jobs') :
                res.status(400).json({
                    message: `cannot update job`
                })
        } catch (er) {
            res.status(500).json(er)
        }
    }

    static async delete(req, res) {
        try {
            const id = +req.params.id
            if (typeof id !== 'number') {
                res.status(400).json({
                    message: `id invalid, id must a number`
                })
            }

            let result = await job.destroy({
                where: { id }
            })

            result === 1 ?
                res.status(200).redirect('/jobs') :
                res.status(404).json({
                    message: `Job with id ${id} not found`
                })
        } catch (e) {
            res.status(500).json(e)
        }
    }

}

module.exports = JobController