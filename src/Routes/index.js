const Status_R = require('./Status_Routes');
const User_R = require('./User_Routes')
const Player_R = require('./Player_Routes')
const Campus_R = require('./Campus_Routes')

require("../models/Relations/Relations")

module.exports = (app) => {
    app.use('/',Status_R);
    app.use('/user', User_R);
    app.use('/player',Player_R)
    app.use('/campus',Campus_R)
}
