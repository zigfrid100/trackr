/**
 * Created by Leon on 01.06.2017.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Defining schema for the model Task
const ProjectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tasks: [TaskSchema]
});

// Registering a model Task with given mongoose schema
module.exports = mongoose.model('Project', ProjectSchema);
