const Status_R = require('./Status-R');

//test

module.exports = (app) => {
    app.use('/',Status_R);
}
