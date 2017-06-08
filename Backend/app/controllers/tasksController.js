const taskModel = require('./../models/task');
const intervalModel = require('../models/interval');

exports.getTasks = (req, res) => {
    taskModel.find()
        .then(tasks => {
            res.status(200)
                .json(tasks);
        })
        .catch(err => {
            res.status(500)
                .send(err);
        });
};

exports.postTask = (req, res) => {
    const newTask = new taskModel(req.body);
    newTask.save()
        .then(task => {
            res.status(200)
                .json({message: "Task successfully added!", task});
        })
        .catch(err => {
            res.status(400)
                .send(err);
        })
};

exports.getTask = (req, res) => {
    taskModel.findById(req.params.id).populate('interval')
        .then(task => {
            res.status(200)
                .json(task)
        })
        .catch(err => {
            res.status(400)
                .send(err);
        });
};

exports.deleteTask = (req, res) => {
    taskModel.findByIdAndRemove(req.params.id)
        .then(() => {
            res.status(200)
                .json({message: "Task successfully deleted!"});
        })
        .catch(err => {
            res.status(400)
                .send(err)
        });
};

exports.putTask = (req, res) => {
    taskModel.findById(req.params.id)
        .then(task => {
            Object.assign(task, req.body).save()
                .then(task => {
                    res.status(200)
                        .json({message: "Task successfully updated!", task});
                })
                .catch(err => {
                    res.status(400)
                        .send(err);
                })
        })
        .catch(err => {
            res.status(400)
                .send(err);
        });
};

exports.startTask = (req, res) => {
    taskModel.findById(req.params.id).populate('interval')
        .then(task => {
            if(task.runPauseStop === 2) {
                res.status(400)
                    .json({error: "Task is stopped!"});
            } else {
                for (let i = 0; i < task.interval.length; i++) {
                    intervalModel.findOne({_id: task.interval[i]._id, run: true})
                        .then(interval => {
                            if (interval !== null || interval !== undefined) {
                                Object.assign(interval, {stopDate: Date.now(), run: false}).save();
                            }
                        })
                        .catch(err => {
                            res.status(400)
                                .send(err);
                        })
                }
                const newinterval = new intervalModel({changes: req.body.changes, startDate: Date.now(), run: true});
                newinterval.save()
                    .then(interval => {
                        task.interval.push(interval);
                        Object.assign(task, {interval: task.interval, runPauseStop: 0}).save()
                            .then(task => {
                                res.status(200)
                                    .json({message: "Task successfully started!", task});
                            })
                            .catch(err => {
                                res.status(400)
                                    .send(err);
                            })
                    })
                    .catch(err => {
                        res.status(400)
                            .send(err);
                    })
            }
        })
        .catch(err => {
            res.status(400)
                .send(err);
        });
};

exports.pauseTask = (req, res) => {
    pauseStopTask("Task successfully paused!", 1, req, res);
};

exports.stopTask = (req, res) => {
    pauseStopTask("Task successfully stopped!", 2, req, res);
};


const pauseStopTask = (message, runPauseStop, req, res) => {
    taskModel.findById(req.params.id).populate('interval')
        .then(task => {
            if(task.runPauseStop === 2) {
                res.status(400)
                    .json({error: "Task is stopped!"});
            } else {
                Object.assign(task, {runPauseStop: runPauseStop}).save()
                    .then(task => {
                        var run = false;
                        var intervalId = "";
                        task.interval.forEach(interval => {
                            if (interval.run) {
                                intervalId = interval._id;
                                interval.run = false;
                                run = true;
                            } else {
                                run = false;
                            }
                        });
                        if (run) {
                            intervalModel.findById(intervalId)
                                .then(interval => {
                                    Object.assign(interval, {stopDate: Date.now(), run: false}).save()
                                        .then(() => {
                                            res.status(200)
                                                .json({message: message, task});
                                        })
                                        .catch(err => {
                                            res.status(400)
                                                .send(err);
                                        })
                                })
                                .catch(err => {
                                    res.status(400)
                                        .send(err);
                                })
                        } else {
                            if (runPauseStop === 1) {
                                res.status(400)
                                    .json({error: "Task not running!"});
                            } else if (runPauseStop === 2) {
                                res.status(200)
                                    .json({message: message, task})
                            }
                        }
                    })
                    .catch(err => {
                        res.status(400)
                            .send(err);
                    })
            }
        })
        .catch(err => {
            res.status(400)
                .send(err);
        });
};
