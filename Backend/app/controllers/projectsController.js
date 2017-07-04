const projectModel = require('./../models/project');
const taskModel = require('./../models/task');

exports.getProjects = (req, res) => {
    projectModel.find().populate('tasks')
        .then(projects => {
            res.status(200).json(projects);
        })
        .catch(err => {
            res.status(400).send(err);
        });
};

exports.postProject = (req, res) => {
    const newProject = new projectModel(req.body);

    newProject.save()
        .then(project => {
            res.status(200).json({message: 'Project successfully added!', project});
        })
        .catch(err => {
            res.status(400).send({error: 'You have to provide a name for your project'});
        })
};

exports.getProject = (req, res) => {
    projectModel.findById(req.params.id).populate('tasks')
        .then(project => {
            res.status(200).json(project)
        })
        .catch(err => {
            res.status(400).send(err);
        });
};

exports.deleteProject = (req, res) => {
   projectModel.findByIdAndRemove(req.params.id)
        .then(() => {
            res.status(200).json({message: 'Project successfully deleted!'});
        })
        .catch(err => {
            res.status(400).send(err)
        });
};

exports.putProject = (req, res) => {
    projectModel.findById(req.params.id)
        .then(project => {
            Object.assign(project, req.body).save()
                .then(project => {
                    res.status(200).json({message: 'Project successfully updated!', project});
                })
                .catch(err => {
                    res.status(400).send(err);
                })
        })
        .catch(err => {
            res.status(400).send(err);
        });
};

exports.addTask = (req, res) => {
    projectModel.findById(req.params.id)
        .then(project => {
            taskModel.findById(req.params.taskid)
                .then (task => {
                    if(task.project) {
                        return res.status(400)
                            .json({error: 'Task already assigned to a project!'});
                    }

                    // Check if task is already assigned to the project
                    if (project.tasks.indexOf(task._id) !== -1) {
                        res.status(400).json({error: 'Task is already assigned to the project!'});
                    } else {
                        Object.assign(project, project.tasks.push(task)).save()
                            .then(project => {
                                Object.assign(task, task.project = project._id).save()
                                    .then(task => {
                                        res.status(200).json({message: 'Task successfully added to project!', project: project});
                                    })
                                    .catch(err => {
                                        res.status(400).send(err);
                                    });
                            })
                            .catch(err => {
                                res.status(400).send(err);
                            })
                    }
                })
                .catch(err => {
                    res.status(404).send(err);
                })
        })
        .catch(err => {
            res.status(404).send(err);
        });
};

exports.removeTask = (req, res) => {
    projectModel.findById(req.params.id)
        .then(project => {
            // Get the task
            taskModel.findById(req.params.taskid)
                .then (task => {
                    // Check if task is assigned to the project
                    const index = project.tasks.indexOf(task._id)
                    if (index !== -1) {
                        project.tasks.splice(index, 1);

                        project.save().then(project => {
                            task.project = undefined;
                            task.save()
                                .then(task => {})
                                .catch(err => {
                                    res.status(500).send(err);
                                });

                            res.status(200).json({message: 'Task successfully removed from project!', project: project});
                        })
                        .catch(err => {
                            res.status(500).send(err);
                        })
                    } else {
                        res.status(404).json({error: 'Task does not belong to project!'});
                    }
                })
                .catch(err => {
                    res.status(404).send(err);
                })
        })
        .catch(err => {
            res.status(404).send(err);
        });
};

exports.getTasks = (req, res) => {
    taskModel.find(req.params.id).populate('tasks')
        .then(project => {
            if (project.tasks) {
                res.status(200).json(project.tasks);
            } else {
                res.status(200).json([]);
            }
        })
        .catch(err => {
            res.status(404).send(err);
        });
};
