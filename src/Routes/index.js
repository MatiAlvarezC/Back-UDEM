const Status_R = require('./Status-R');
const apiRouter = require('./api');


module.exports = (app) => {
    app.use('/',Status_R);
    app.use('/api', apiRouter);
}
 