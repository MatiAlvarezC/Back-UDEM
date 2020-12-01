const Comment = require("../Models/Comment");
const Comment_Type = require("../Models/Comment_Type");
const User = require("../Models/User");
const Player = require("../Models/Player");
const Team_Player = require("../Models/Team_Player");
const Team = require("../Models/Team");
const Sport = require("../Models/Sport");


const create = async (req, res) => {
    try{
        const {content, commentTypeId, userPayrollNumberWriter} = req.body
        var {teamId} = req.body
        const id = req.params.id

        var fieldNotFound = false
        var missing = []
        if (!content) {
            fieldNotFound = true
            missing.push("texto del comentario")
        }
        if (!commentTypeId) {
            fieldNotFound = true
            missing.push("tipo de comentario")
        }
        if (!userPayrollNumberWriter) {
            fieldNotFound = true
            missing.push("usuario")
        }
        if (!id) {
            fieldNotFound = true
            missing.push("deportista")
        }

        if (fieldNotFound) {
            var errorMessage = "No se encontraron los siguientes datos: "
            missing.forEach(field => errorMessage += field + ", ")
            return res.status(400).send(errorMessage.slice(0, -2))
        }

        const type = await Comment_Type.findByPk(req.body.commentTypeId)
        const user = await User.findByPk(req.body.userPayrollNumberWriter)
        const player = await Player.findByPk(req.params.id)

        // Si no se indica el equipo para el comentario, se intenta tomar el equipo actual del deportista
        if (!teamId) {
            const team_player = await Team_Player.findOne(
                {
                    where: {
                        playerRegistrationNumber: id,
                        endDate: null
                    }
                }
            )
            if (team_player) {
                teamId = team_player.teamId
            }
        }

        const comment = await Comment.create({
            ...req.body,
            teamId
        })

        await type.addComment(comment)
        await comment.setCommentWriter(user)
        await player.addComment(comment)

        return res.sendStatus(200)

    } catch (e) {
        console.log(e)
        return res.sendStatus(500)
    }
}

const update = async (req, res) => {
    try {
        const comment = await Comment.findByPk(req.params.id)

        if (!comment) {
            return res.status(400).send({message: "ID de comentario inválido."})
        }

        const {userPayrollNumberEditor, content, commentTypeId} = req.body
        if (!userPayrollNumberEditor) {
            return res.status(400).send({message: "ID de usuario editor faltante."})
        }

        if(!content && !commentTypeId) {
            return res.status(400).send("Comentario no cambio")
        }

        await comment.update({...req.body}).then(async () => {
            const user = await User.findByPk(userPayrollNumberEditor)
            await comment.setCommentEditor(user)
            return res.send({status: 'SUCCESS'})
        }).catch(e => {
            return res.status(400).send({message: e.message})
        })
    } catch (e) {
        return res.status(400).send({message: e.message})
    }
}

const getAll = async (req, res) => {
    try {
        const comments = await Comment.findAll({
            order: [['createdAt', 'ASC']],
            include: [
                {
                    model: Team,
                    attributes: ['name'],
                    include: [
                        {
                            model: Sport,
                            attributes: ['name']
                        }
                    ]
                },
                {
                    model: User, as: "commentWriter",
                    attributes: [
                        'name',
                        'paternalLastName',
                        'maternalLastName'
                    ]
                },
                {
                    model: User, as: "commentEditor",
                    attributes: [
                        'name',
                        'paternalLastName',
                        'maternalLastName'
                    ]
                },
                {
                    model: Comment_Type,
                    attributes: ['name']
                }]
        })

        if (comments.length === 0) {
            return res.sendStatus(404)
        }

        return res.send(comments)

    } catch (e) {
        return res.sendStatus(500)
    }
}

module.exports = {
    create,
    update,
    getAll
}
