const { freelancer } = require('../models')

class Free {
    static async listFreelancers(req, res) {
        try {
            let freelancers = await freelancer.findAll()
            // if (freelancers.length === 0) {
            //     res.status(200).json({
            //         message: `freelancer has no items`
            //     })
            // }
            res.status(200).render('freelancer/index.ejs', {
                freelancers
            })
        } catch (e) {
            res.status(500).json(e)
        }
    }

    static createPage(req, res) {
        res.render('freelancer/create.ejs')
    }

    static async findFreelancer(req, res) {
        try {
            const id = +req.params.id
            if (typeof id !== 'number') {
                res.status(400).json({
                    message: `id invalid, id must a number`
                })
            }

            let result = await freelancer.findByPk(id)

            if (!result) {
                return res.status(404).json({
                    message: `freelancer with id ${id} not found`
                })
            }

            res.status(200).json(result)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    static async create(req, res) {
        try {
            const { first_name, last_name, image, email, password, contact_information } = req.body
            let result = await freelancer.create({
                first_name, last_name, image, email, password, contact_information
            })

            res.status(201).redirect('/freelancers')
        } catch (e) {
            res.status(500).json(e)
        }
    }

    static async updatePage(req, res) {
        try {
            const id = +req.params.id
            let freelance = await freelancer.findByPk(id)
            if (!freelance) {
                return res.status(404).json({
                    message: `freelancer not found`
                })
            }

            res.render('/freelancer/update.ejs', { freelance })
        } catch (e) {
            res.status(500).json(e)
        }
    }

    static async update(req, res) {
        try {
            const id = +req.params.id
            if (typeof id !== 'number') {
                res.status(400).json({
                    message: `id invalid, id must a number`
                })
            }
            const { first_name, last_name, image, email, password, contact_information } = req.body
            let result = await freelancer.update({
                first_name, last_name, image, email, password, contact_information
            }, {
                where: { id }
            })

            result[0] === 1 ?
                res.status(200).redirect('/freelancers') :
                res.status(404).json({
                    message: `freelancer with id ${id} not found`
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

            let result = await freelancer.destroy({
                where: { id }
            })

            result === 1 ?
                res.status(200).redirect('/freelancers') :
                res.status(404).json({
                    message: `freelancer wuth id ${id} not found`
                })
        } catch (e) {
            res.status(500).json(e)
        }
    }
}

module.exports = Free