const mongoose = require("mongoose");
const {MONGO_URL} = require('../util/constant');
async function mongoDatabseConnect() {
  mongoose
    .connect(MONGO_URL)
    .then(() => {
      console.log("Successfully connected to MongoDB ");
    })
    .catch((error) => {
      console.log("Unable to connect to MongoDB");
      console.error(error);
    });
}

module.exports = {
    mongoDatabseConnect
};