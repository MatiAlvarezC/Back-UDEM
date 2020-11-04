const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const routes = require('./src/Routes/index')
dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

routes(app);
require('./src/Database/Connection');

app.listen(PORT, () => {
    console.log('Started on PORT ',PORT);
});
