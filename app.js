const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const {
  mongoDatabseConnect
} = require('./src/database/mongoose');
const cors = require('cors');

const {
  SERVER_PORT,
} = require('./src/util/constant');

const app = express();
app.use(cors())
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

(async () => {
  await mongoDatabseConnect();
})();

app.get('/', (req, res) => {
    res.json({"message": "Welcome to Users application."});
});
// Routes
app.use('/', require('./src/routes/users'));


app.listen(SERVER_PORT, () => {
    console.log(`App is listening on port:${SERVER_PORT}`);
});



