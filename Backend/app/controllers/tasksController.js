const taskModel = require('./../models/task');
const projectModel = require('./../models/project');

exports.getTasks = (req, res) => {
    taskModel.find()
        .then(tasks => {
            res.status(200).json(tasks);
        })
        .catch(err => {
            res.status(500).send(err);
        });
};

exports.postTask = (req, res) => {
    delete(req.body.total);
    const newTask = new taskModel(req.body);
    newTask.save()
        .then(task => {
            res.status(200).json({message: 'Task successfully added!', task: task});
        })
        .catch(err => {
            res.status(400).send({error: 'You have to provide a name for your task'});
        })
};

exports.getTask = (req, res) => {
    taskModel.findById(req.params.id).populate('interval')
        .then(task => {
            res.status(200).json(task)
        })
        .catch(err => {
            res.status(400).send(err);
        });
};

exports.getProjects = (req, res) => {
    projectModel.find({ tasks: req.params.id })
        .then(projects => {
            res.status(200).json(projects);
        })
        .catch(err => {
            res.status(404).send(err);
        })
};

exports.deleteTask = (req, res) => {
    taskModel.findByIdAndRemove(req.params.id)
        .then(task => {
            res.status(200).json({message: 'Task successfully deleted!'});
        })
        .catch(err => {
            res.status(400).send(err)
        });
};

exports.putTask = (req, res) => {
    taskModel.findById(req.params.id)
        .then(task => {
            delete(req.body.total);
            Object.assign(task, req.body).save()
                .then(task => {
                    res.status(200).json({message: 'Task successfully updated!', task: task});
                })
                .catch(err => {
                    res.status(400).send(err);
                })
        })
        .catch(err => {
            res.status(400).send(err);
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
            task.save()
                .then(task => {
                    res.status(200).json({message: 'Task successfully started!', task: task});
                })
                .catch(err => {
                    res.status(400).send(err)
                });
        })
        .catch(err => {
            res.status(400).send(err);
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

            task.save()
                .then(task => {
                    res.status(200).json({message: 'Task successfully paused!', task: task});
                })
                .catch(err => {
                    res.status(400).send(err)
                });
        })
        .catch(err => {
            res.status(400).send(err);
        });
};
