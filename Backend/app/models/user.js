/**
 * Created by Leon on 01.06.2017.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Defining schema for the model Task
const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// Registering a model Task with given mongoose schema
module.exports = mongoose.model('User', UserSchema);