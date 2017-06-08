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
        required: false
    },
    status: {
        type: Number,
        required: false
    },
    interval: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Interval',
        required: false
    }]
});

// Registering a model Task with given mongoose schema
module.exports = mongoose.model('Task', TaskSchema);
