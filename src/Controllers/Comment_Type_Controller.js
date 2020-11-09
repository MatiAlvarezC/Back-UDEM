const Comment_Type = require('../Models/Comment_Type')

const create = async (req, res) => {
    try {
        await Comment_Type.create({
            ...req.body
        })

        return res.sendStatus(200)

    } catch (e) {
        return res.sendStatus(500)
    }
}

const getAll = async (req, res) => {
    try {
        const commentType = await Comment_Type.findAll()

        if (commentType.length === 0) {
            return res.sendStatus(404)
        }

        return res.send(commentType)

    } catch (e) {
        return res.sendStatus(500)
    }
}

const update = async (req, res) => {
    try {
        const commentType = await Comment_Type.findByPk(req.params.id)

        if (!commentType) {
            return res.sendStatus(404)
        }

        await commentType.update({
            ...req.body
        })

        return res.sendStatus(201)

    } catch (e) {
        return res.sendStatus(500)
    }
}

module.exports = {
    create,
    getAll,
    update
}
