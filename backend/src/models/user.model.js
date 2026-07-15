const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true, "username is required"],
        unique: [true, " username already taken "]
    },
    email:{
        type: String,
        required: [true, "email is required"],
        unique: [true, "Acount already exist with the given email address"]
    },
    password:{
        type: String,
        required: [true, "password is required"],
    }
})

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;