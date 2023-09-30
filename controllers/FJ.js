const { freelancer, freelancer_job, job } = require('../models')

class FJ {
    static async listFJs(req, res) {
        try {
            let freelancer_jobs = await freelancer_job.findAll({
                inclide: [freelancer, job]
            })
            if (freelancer_jobs.length === 0) {
                return res.status(200).json({
                    message: `freelancer_job has no items`
                })
            }
            res.status(200).json(freelancer_jobs)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    static async FJInformation(req, res) {
        try {
            const id = +req.params.id
            if (typeof id !== 'number') {
                return res.status(400).json({
                    message: `id invalid, id must a number`
                })
            }

            let result = await freelancer_job.findByPk({
                where: { jobId: id },
                include: [freelancer, job]
            })

            if (!result) {
                return res.status(404).json({
                    message: ``
                })
            }

            let freeJob = {}

            if (result.length === 0) {
                result = await job.findByPk(id)
                freeJob = {
                    ...result[0].job.dataValues,
                    freelancer
                }
            } else {
                let freelancer = result.map(free => {
                    return free.freelancer.dataValues
                })
                freeJob = {
                    ...result[0].job.dataValues,
                    freelancer
                }
            }

            res.status(200).json(result)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    static async create(req, res) {
        try {
            const { freelancerId, jobId } = req.body
            let result = await freelancer_job.create({
                freelancerId, jobId
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
            const { freelancerId, jobId } = req.body
            let result = await freelancer_job.update({
                title, budget, description, status
            }, {
                where: { id }
            })

            result[0] === 1 ?
                res.status(200).json({
                    message: `freelancer_job with id ${id} has been updated`
                }) :
                res.status(404).json({
                    message: `freelancer_job with id ${id} not found`
                })
        } catch (er) {
            res.status(500).json(er)
        }
    }

    static async delete(req, res) {
        try {
            const id = +req.params.id
            if (typeof id !== 'number') {
                return res.status(400).json({
                    message: `id invalid, id must a number`
                })
            }

            let result = await freelancer_job.destroy({
                where: { id }
            })

            result === 1 ?
                res.status(200).json({
                    message: `freelancer_job wuth id ${id} has been deleted`
                }) :
                res.status(404).json({
                    message: `freelancer_job wuth id ${id} not found`
                })
        } catch (e) {
            res.status(500).json(e)
        }
    }
}

module.exports = FJ