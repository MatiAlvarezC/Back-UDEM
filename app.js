const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const Routes = require('./src/Routes/index')


const app = express();

app.use(express.json());
app.use(cors());
Routes(app)


app.listen(3001, () => {
    console.log('Started in PORT = ',3001)
})
