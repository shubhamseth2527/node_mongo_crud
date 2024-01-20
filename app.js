const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json');
const cors = require('cors');
require('dotenv').config();

const {
  MONGO_URL,
  SERVER_PORT,
} = require('./src/util/constant');

const app = express();
app.use(cors())
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(MONGO_URL)
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



