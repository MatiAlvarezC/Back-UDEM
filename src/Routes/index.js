const Status_R = require('./Status-R');
const User_R = require('./User_Routes')
const Sport_R = require('./Sport_Routes')

require("../models/Relations/Relations")

module.exports = (app) => {
    app.use('/',Status_R);
    app.use('/user', User_R);
    app.use('/sport', Sport_R);
}
