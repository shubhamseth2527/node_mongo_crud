const mongoose = require('mongoose');
const usersSchema = mongoose.Schema({
    name: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: [true, "Please provide an Email!"],
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
    password: {
        type: String,
        required: [true, "Please provide a password!"],
        unique: false,
    },
    phone: {
        type: Number,
        required: false
    },
    place: {
        type: String,
        required: false
    },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    resetToken: {type: String, required: false},
    resetTokenExpiration: { type: String, required: false},
   });
   usersSchema.set('timestamps', true);
//Creating the collection Users
const UsersModel = mongoose.model('Users', usersSchema);
module.exports = UsersModel