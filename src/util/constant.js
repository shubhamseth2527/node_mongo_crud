const MONGO_URL = `mongodb+srv://${process.env.MONGO_DB_USER_NAME}:${process.env.MONGO_DB_PASSWORD}.ttdv5no.mongodb.net/`;
const SERVER_PORT = process.env.SERVER_PORT || SERVER_PORT;
module.exports =  {
    MONGO_URL,
    SERVER_PORT
}