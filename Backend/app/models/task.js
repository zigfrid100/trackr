/**
 * Created by Leon on 01.06.2017.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Project = require('mongoose').model('Project');

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

/**
 * Get the duration of an interval in seconds.
 */
IntervalSchema.methods.getDuration = function() {
    if(!this.startDate || !this.stopDate) {
        return 0;
    }

    return (this.stopDate.getTime() - this.startDate.getTime()) / 1000;
}

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
    runPauseStop: {
        type: Number,
        required: false
    },
    interval: [IntervalSchema],
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: false
    },
    total: {
        type: Number,
        required: false
    }
});

/**
 * Remove to be deleted task reference from projects.
 */
TaskSchema.pre('remove', (next) => {
    Project.update(
        { projects: this._id },
        { $pull: { projects: this._id } },
        { multi: true },
        next
    )
});

/**
 * Calculate the total time by summing up all interval times.
 */
TaskSchema.pre('save', function(next) {
    if(!this.interval) {
        self.total = 0;
    } else {
        total = 0;

        for(const interval of this.interval) {
            total += interval.getDuration();
        }

        this.total = total;
    }

    next();
});

// Registering a model Task with given mongoose schema
module.exports = mongoose.model('Task', TaskSchema);
