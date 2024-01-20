const mongoose = require('mongoose');
const usersSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(value) {
                const self = this;
                const errorMsg = 'Email already in use!';
                return new Promise((resolve, reject) => {
                    self.constructor.findOne({ email: value })
                        .then(model => model._id ? reject(new Error(errorMsg)) : resolve(true)) // if _id found then email already in use 
                        .catch(err => resolve(true)) // make sure to check for db errors here
                });
            },
        }
     
    },
    phone: {
        type: Number,
        required: true
    },
    place: {
        type: String,
        required: true
    }
   });
//Creating the collection Users
const UsersModel = mongoose.model('Users', usersSchema);
module.exports = UsersModel