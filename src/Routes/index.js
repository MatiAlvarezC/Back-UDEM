const Status_R = require('./Status_Routes');
const User_R = require('./User_Routes')
const Sport_R = require('./Sport_Routes')
const Player_R = require('./Player_Routes')
const Campus_R = require('./Campus_Routes')
const Program_R = require('./Program_Routes')
const Team_R = require('./Team_Routes')
const Medical_R = require('./Medical_Routes')
const Comment_R = require('./Comment_Routes')
const Comment_Type_R = require('./Comment_Type_Routes')

require("../Models/Relations/Relations")

module.exports = (app) => {
    app.use('/user', User_R);
    app.use('/sport', Sport_R);
    app.use('/player',Player_R)
    app.use('/campus',Campus_R)
    app.use('/program',Program_R)
    app.use('/status',Status_R)
    app.use('/team', Team_R)
    app.use('/medical', Medical_R)
    app.use('/comment', Comment_R)
    app.use('/commentType', Comment_Type_R)
}
