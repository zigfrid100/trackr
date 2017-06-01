/**
 * Created by Leon on 01.06.2017.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Defining schema for the model Task
const IntervalSchema = new Schema({
    changes: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    stopDate: {
        type: Date,
        required: false
    }
});

// Registering a model Task with given mongoose schema
module.exports = mongoose.model('Interval', IntervalSchema);