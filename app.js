const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const Routes = require('./src/Routes/index')

const app = express();

require('./src/database/database')


const PORT = process.env.PORT || 3001;


app.use(express.json());
app.use(cors());
Routes(app)


app.listen(PORT, () => {
    console.log('Started on PORT ',PORT);
});
