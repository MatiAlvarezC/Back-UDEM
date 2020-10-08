const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const Routes = require('./src/Routes/index')

const app = express();

const PORT = process.env.PORT || 3001;


//Database
const db = require('./src/database/connection')
db.authenticate().then(() => { 
    console.log('Connection has been established successfully.');
  }).catch(err => console.error('Unable to connect to the databes:', err));



app.use(express.json());
app.use(cors());
Routes(app)


app.listen(PORT, () => {
    console.log('Started on PORT ',PORT);
});
