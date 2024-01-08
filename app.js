const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const {
  DB_URL,
  SERVER_PORT,
} = require('./src/util/constant');

const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(DB_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Connection error', error));

app.get('/', (req, res) => {
    res.json({"message": "Welcome to Users application."});
});
// Routes
app.use('/', require('./src/routes/users'));


app.listen(SERVER_PORT, () => {
    console.log(`App is listening on port:${SERVER_PORT}`);
});



