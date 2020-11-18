const Comment = require("../Models/Comment");
const Comment_Type = require("../Models/Comment_Type");
const User = require("../Models/User");
const Player = require("../Models/Player");
const Team_Player = require("../Models/Team_Player");


const create = async (req, res) => {
    try{
        const {content, commentTypeId, userPayrollNumber} = req.body
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
        if (!userPayrollNumber) {
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
        const user = await User.findByPk(req.body.userPayrollNumber)
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
            teamId = team_player.teamId
        }

        const comment = await Comment.create({
            ...req.body,
            teamId
        })

        await type.addComment(comment)
        await user.addComment(comment)
        await player.addComment(comment)

        return res.sendStatus(200)

    } catch (e) {
        console.log(e)
        return res.sendStatus(500)
    }
}

const update = async (req, res) => {
    try {
        await Comment.update({
            ...req.body
        }, {where: {id: req.params.id}}).then(() => {
            return res.send({status: 'SUCCESS'})
        }).catch(e => {
            return res.status(400).send({message: e.message})
        })
    } catch (e) {
        return res.status(400).send({message: e.message})
    }
}

module.exports = {
    create,
    update
}
