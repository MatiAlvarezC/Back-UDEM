const Status_R = require('./Status_Routes');
const User_R = require('./User_Routes')
const Sport_R = require('./Sport_Routes')
const Player_R = require('./Player_Routes')
const Campus_R = require('./Campus_Routes')
const Program_R = require('./Program_Routes')

require("../models/Relations/Relations")

module.exports = (app) => {
    app.use('/user', User_R);
    app.use('/sport', Sport_R);
    app.use('/player',Player_R)
    app.use('/campus',Campus_R)
    app.use('/program',Program_R)
    app.use('/status',Status_R)
}
