const { freelancer, freelancer_job, job } = require('../models')

class FJ {
    static async listFJs(req, res) {
        try {
            let freelancer_jobs = await freelancer_job.findAll({
                include: [freelancer, job]
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

            let result = await job.findByPk(id, {
                include: freelancer,

            }, {
                order: [
                    ['id', 'asc']
                ]
            })

            if (!result) {
                return res.status(404).json({
                    message: `record not found`
                })
            }

            const value = result.freelancers
            console.log(result)

            res.status(200).redirect(`/jobInformation/${id}?value=${value}`)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    static async listFreelancOfJob(req, res) {
        try {
            const job_id = +req.params.jobId
            const f_id = +req.params.freeId

            let freeList = await freelancer_job.findByPk({ job_id },
                {

                })

        } catch (e) {
            res.status(500).json(e)
        }
    }

    static async updateOnListJob(req, res) {
        try {
            const JobId = +req.params.jobId
            const FreeId = +req.params.freeId

            await freelancer_job.create({
                jobId: FreeId,
                freelancerId: JobId
            })

            return res.status(200).redirect('/jobs')

        } catch (e) {
            res.status(200).json(e)
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
                freelancerId, jobId
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