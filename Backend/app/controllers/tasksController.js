const taskModel = require('./../models/task');

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
                // Stop all running intervals
                task.interval.filter(interval => interval.run).map((interval) => {
                    Object.assign(interval, {stopDate: Date.now(), run: false})
                });

                // Add a new interval
                task.interval.push({startDate: Date.now(), run:true});
                task.runPauseStop = 2;

                task.save().then(task => {
                    res.status(200)
                        .json({message: "Task successfully started!"});
                })
                .catch(err => {
                    res.status(400)
                        .send(err)
                });
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
    taskModel.findById(req.params.id).populate('interval')
        .then(task => {
            if(task.runPauseStop === 2) {
                res.status(400)
                    .json({error: "Task is stopped!"});
            } else {
                // Stop all running intervals
                task.interval.filter(interval => interval.run).map((interval) => {
                    Object.assign(interval, {stopDate: Date.now(), run: false})
                });

                task.runPauseStop = 2;

                task.save().then(task => {
                    res.status(200)
                        .json({message: "Task successfully stopped"});
                })
                .catch(err => {
                    res.status(400)
                        .send(err)
                });
            }
        })
        .catch(err => {
            res.status(400)
                .send(err);
        });
};
