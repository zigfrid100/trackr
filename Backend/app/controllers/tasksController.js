const taskModel = require('./../models/task');
const projectModel = require('./../models/project');

exports.getTasks = (req, res) => {
    taskModel.find({project: undefined})
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
        .then(task => {
            if(task.project != undefined) {
                projectModel.findById(task.project)
                    .then(project => {
                        for(let i = 0; i < project.tasks.length; i++) {
                            if(JSON.stringify(project.tasks[i]) === JSON.stringify(task._id)) {
                                project.tasks.splice(i, 1);
                                break;
                            }
                        }
                    })
                    .catch(err => {
                        res.status(400)
                            .send(err);
                    });
            }
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
            // Stop all running intervals
            task.interval.filter(interval => interval.run).map((interval) => {
                Object.assign(interval, {stopDate: Date.now(), run: false})
            });

            // Add a new interval
            task.interval.push({startDate: Date.now(), run:true});
            task.runPauseStop = 0;
            task.save().then(task => {
                res.status(200)
                    .json({message: 'Task successfully started!', task: task});
            })
            .catch(err => {
                res.status(400)
                    .send(err)
            });
        })
        .catch(err => {
            res.status(400)
                .send(err);
        });
};

exports.pauseTask = (req, res) => {
    taskModel.findById(req.params.id).populate('interval')
        .then(task => {
            // Stop all running intervals
            task.interval.filter(interval => interval.run).map((interval) => {
                Object.assign(interval, {stopDate: Date.now(), run: false})
            });

            task.runPauseStop = 1;

            task.save().then(task => {
                res.status(200)
                    .json({message: 'Task successfully paused!', task: task});
            })
            .catch(err => {
                res.status(400)
                    .send(err)
            });
        })
        .catch(err => {
            res.status(400)
                .send(err);
        });
};

exports.stopTask = (req, res) => {
    taskModel.findById(req.params.id).populate('interval')
        .then(task => {
            // Stop all running intervals
            task.interval.filter(interval => interval.run).map((interval) => {
                Object.assign(interval, {stopDate: Date.now(), run: false})
            });

            task.runPauseStop = 2;

            task.save().then(task => {
                res.status(200)
                    .json({message: "Task successfully stopped", task});
            })
            .catch(err => {
                res.status(400)
                    .send(err)
            });
        })
        .catch(err => {
            res.status(400)
                .send(err);
        });
};
