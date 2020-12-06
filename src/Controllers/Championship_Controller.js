const Championship = require('../Models/Championship')
const Team = require('../Models/Team')
const Player = require('../Models/Player')
const Sport = require('../Models/Sport')
const itemsPerPage = 6;
/** Campeonatos por pagina **/


/** ======= FUNCIONES CRUD ======= **/

const create = async (req, res) => {
    const {name, place, date, isActive} = req.body
    if (isActive == null || name == null || place == null || date == null ) {
        return res.status(400).send({message: 'Uno de los campos esta vacío'})
    }
    try {
        const championships = await Championship.findOne({where: {name:name, date:date}})
        if (championships) {
            return res.status(400).send("Campeonato ya existente")
        } else {
            Championship.create({
                ...req.body
            }).then(championships => {
                return res.send(championships)
            })
        }
    } catch (e) {
        return res.status(400).send({message: e.message})
    }
}

const update = async (req, res) => {
    try {
        await Championship.update({
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

const getAll = async (req, res) => {
    try {
        const championships = await Championship.findAll({
            attributes: ['name', 'place', 'date', 'isActive'],
            order: [['date', 'ASC']],
            include: [
                {
                    model: Team,
                    attributes: ['name'],
                    through: {
                        attributes: {
                            exclude: ['championshipId', 'teamId']
                        },
                    },
                    include: [
                        {
                            model: Sport,
                            attributes: ['name'],
                        }
                    ]
                },
                {
                    model: Player,
                    attributes: ['name'],
                    through: {
                        attributes: {
                            exclude: ['championshipId', 'playerRegistrationNumber']
                        }
                    },
                    include: [
                        {
                            model: Team,
                            attributes: ['name'],
                            include: [
                                {
                                    model: Sport,
                                    attributes: ['name'],
                                }
                            ],
                            through: {
                                attributes: []
                            },
                        }
                    ],
                }
            ]
        })
        return res.send(championships)
    } catch (e) {
        return res.status(400).send({message: e.message})
    }
}
/** ======= FIN FUNCIONES CRUD ======= **/

/** ======= Obtención de lista de campeonato por pagina, orden y es activo o no ======= **/
const getByPage = async (req, res) => {
    let {page, order, by} = req.params
    const from = (((page <= 0 ? 1 : page) - 1) * itemsPerPage);
    order = order.toUpperCase();
    by = by.toUpperCase();
    /** Solo puede recibir ASC o DESC **/
    if (order !== 'ASC' && order !== 'DESC') {
        order = 'ASC'
    }
    /** Solo puede recibir ISACTIVE o ISNOTACTIVE **/
    if (by !== 'ISACTIVE' && by !== 'ISNOTACTIVE') {
        by = 'NAME'
    }
    try {
        if (by === 'ISACTIVE') {
            await Championship.findAll({
                attributes: ['name', 'place', 'date', 'isActive'],
                order: [[by, order]],
                where: {isActive: order === 'ASC'},
                include: [
                    {
                        model: Team,
                        attributes: ['name'],
                        through: {
                            attributes: {
                                exclude: ['championshipId', 'teamId']
                            }
                        },
                        include: [
                            {
                                model: Sport,
                                attributes: ['name'],
                            }
                        ]
                    },
                    {
                        model: Player,
                        attributes: ['name'],
                        through: {
                            attributes: {
                                exclude: ['championshipId', 'playerRegistrationNumber']
                            }
                        },
                        include: [
                            {
                                model: Team,
                                attributes: ['name'],
                                include: [
                                    {
                                        model: Sport,
                                        attributes: ['name'],
                                    }
                                ],
                                through: {
                                    attributes: []
                                },
                            }
                        ],
                    }
                ]
            }).then(async CHAMPIONSHIP => {
                console.log(CHAMPIONSHIP.length)
                return res.send(await CHAMPIONSHIP.slice(from, from + itemsPerPage))
            })
        } else  {
            await Championship.findAll({
                attributes: ['name', 'place', 'date', 'isActive'],
                order: [[by, order]],
                include: [
                    {
                        model: Team,
                        attributes: ['name'],
                        through: {
                            attributes: {
                                exclude: ['championshipId', 'teamId']
                            }
                        },
                        include: [
                            {
                                model: Sport,
                                attributes: ['name'],
                            }
                        ]
                    },
                    {
                        model: Player,
                        attributes: ['name'],
                        through: {
                            attributes: {
                                exclude: ['championshipId', 'playerRegistrationNumber']
                            }
                        },
                        include: [
                            {
                                model: Team,
                                attributes: ['name'],
                                include: [
                                    {
                                        model: Sport,
                                        attributes: ['name'],
                                    }
                                ],
                                through: {
                                    attributes: []
                                },
                            }
                        ],
                    }
                ]
            }).then(async CHAMPIONSHIP => {
                return res.send(await CHAMPIONSHIP.slice(from, from + itemsPerPage))
            })
        }
    } catch (e) {
        console.log(e)
        return res.status(500).send({message: e.message})
    }
}
/** ======= FIN Obtención de lista de campeonato por pagina, orden y es activo o no ======= **/

/** ======= Obtención de numero maximo de paginas ======= **/

const getMaxPages = async (req, res) => {
    try {
        const items = await Championship.count();
        const maxPages = Math.ceil(items / itemsPerPage); // 2
        return res.send({pages: maxPages})
    } catch (e) {
        return res.status(500).send({message: 'INTERNAL_ERROR'})
    }
}
/** ======= Fin Obtención de numero maximo de paginas ======= **/

module.exports = {
    create,
    update,
    getAll,
    getMaxPages,
    getByPage
}
