const Status_R = require('./Status-R');
const User_R = require('./User_Routes')
const Player_R = require('./Player_Routes')

require("../models/Relations/Relations")

module.exports = (app) => {
    app.use('/',Status_R);
    app.use('/user', User_R);
    app.use('/player',Player_R)
}
