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
            for (let i=0; i<task.interval.length; i++){
                intervalModel.findOne({_id: task.interval[i]._id, run: true})
                    .then(interval => {
                        if (interval != null || interval != undefined) {
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
                    Object.assign(task, {interval: task.interval, runPauseStop: 0 }).save()
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
        })
        .catch(err => {
            res.status(400)
                .send(err);
        });
};

exports.pauseTask = (req, res) => {
    taskModel.findById(req.params.id).populate('interval')
        .then(task => {
            Object.assign(task, {runPauseStop: 1 }).save()
                .then(task => {
                    var hasInterval = true;
                    for (let i=0; i<task.interval.length; i++){
                        intervalModel.findOne({_id: task.interval[i]._id, run: true})
                            .then(interval => {
                                if (interval != null || interval != undefined || hasInterval) {
                                    hasInterval = true;
                                } else {
                                    hasInterval = false;
                                }
                            })
                            .catch(err => {
                                res.status(400)
                                    .send(err);
                            })
                    }
                    if (hasInterval) {
                        Object.assign(interval, {stopDate: Date.now(), run: false}).save()
                            .then(interval => {
                                res.status(200)
                                    .json({message: "Task successfully paused!", interval});
                            })
                            .catch(err => {
                                res.status(400)
                                    .send(err);
                            });
                    } else {
                        res.status(200)
                            .json({message: "Task not running!"});
                    }
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

exports.stopTask = (req, res) => {
    taskModel.findById(req.params.id).populate('interval')
        .then(task => {
            Object.assign(task, {runPauseStop: 2 }).save()
                .then(task => {
                    for (let i=0; i < task.interval.length; i++){
                        intervalModel.findOne({_id: task.interval[i]._id, run: true})
                            .then(interval => {
                                if (interval != null || interval != undefined) {
                                Object.assign(interval, {stopDate: Date.now(), run: false}).save()
                                    .then(interval => {
                                        res.status(200)
                                            .json({message: "Task successfully stoped!", interval});
                                    })
                                    .catch(err => {
                                        res.status(400)
                                            .send(err);
                                    });
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
                })
        })
        .catch(err => {
            res.status(400)
                .send(err);
        });
};
