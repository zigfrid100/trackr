/**
 * Created by Leon on 01.06.2017.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const IntervalSchema = require('./intervall');

// Defining schema for the model Task
const TaskSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        required: true
    },
    interval: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'IntervalSchema'
    }
});

// Registering a model Task with given mongoose schema
module.exports = mongoose.model('Task', TaskSchema);
