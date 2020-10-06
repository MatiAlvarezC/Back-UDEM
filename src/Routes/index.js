const Status_R = require('./Status-R');

module.exports = (app) => {
    app.use('/',Status_R);
}
