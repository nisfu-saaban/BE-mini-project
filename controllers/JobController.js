const { job } = require('../models')

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
            if (id !== 'number') {
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

            res.status(200).json(result)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    static async create(req, res) {
        try {
            const { title, budget, description, status } = req.body
            let result = await job.create({
                title, budget, description, status
            })

            res.status(201).json(result)
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
                res.status(200).json({
                    message: `job with id ${id} has been updated`
                }) :
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
                res.status(200).json({
                    message: `job with id ${id} has been deleted`
                }) :
                res.status(404).json({
                    message: `Job with id ${id} not found`
                })
        } catch (e) {
            res.status(500).json(e)
        }
    }

}

module.exports = JobController