/**
 * Created by Leon on 01.06.2017.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IntervalSchema = new Schema({
    changes: {
        type: String,
        required: false
    },
    startDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    stopDate: {
        type: Date,
        required: false
    },
    run: {
        type: Boolean,
        required: true
    }
});

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
    runPauseStop: {
        type: Number,
        required: false
    },
    interval: [IntervalSchema],
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: false
    }
});

// Registering a model Task with given mongoose schema
module.exports = mongoose.model('Task', TaskSchema);
