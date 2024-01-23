const MONGO_URL = `mongodb+srv://${process.env.MONGO_DB_USER_NAME}:${process.env.MONGO_DB_PASSWORD}.ttdv5no.mongodb.net/`;
const SWAGGER_LOCALHOST = process.env.SWAGGER_LOCALHOST
const SERVER_PORT = process.env.SERVER_PORT;
const BASE_USER_API_URL = '/api/users/';
const PATHS = {
    login: 'login',
    register: 'register',
    id: ':id',
    create: 'create',
    email: 'email'
}
module.exports =  {
    MONGO_URL,
    SERVER_PORT,
    SWAGGER_LOCALHOST,
    BASE_USER_API_URL,
    PATHS,
}