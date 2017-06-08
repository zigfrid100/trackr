/**
 * Created by Leon on 01.06.2017.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TaskSchema = require('./task');

// Defining schema for the model Project
const ProjectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
        required: false
    }]
});

// Registering a model Project with given mongoose schema
module.exports = mongoose.model('Project', ProjectSchema);
