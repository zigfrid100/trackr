const projectModel = require('./../models/project');
const taskModel = require('./../models/task');

exports.getProjects = (req, res) => {
    projectModel.find()
        .then(projects => {
            res.status(200)
                .json(projects);
        })
        .catch(err => {
            res.status(400)
                .send(err);
        });
};

exports.postProject = (req, res) => {
    const newProject = new projectModel(req.body);
    newProject.save()
        .then(project => {
            res.status(200)
            .json({message: "Project successfully added!", project });
        })
        .catch(err => {
            res.status(400)
            .send(err);
        })
};

exports.getProject = (req, res) => {
    projectModel.findById(req.params.id)
        .then(project => {
            res.status(200)
                .json(project)
        })
        .catch(err => {
            res.status(400)
                .send(err);
        });
};

exports.deleteProject = (req, res) => {
   projectModel.findByIdAndRemove(req.params.id)
        .then(() => {
            res.status(200)
                .json({message: "Project successfully deleted!"});
        })
        .catch(err => {
            res.status(400)
                .send(err)
        });
};

exports.putProject = (req, res) => {
    projectModel.findById(req.params.id)
        .then(project => {
            Object.assign(project, req.body).save()
                .then(project => {
                    res.status(200)
                        .json({message: "Project successfully updated!", project});
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

exports.addtask = (req, res) => {
    projectModel.findById(req.params.id)
        .then( project => {
            taskModel.findById(req.params.taskid)
                .then (task => {
                    var exists = false;
                    for (var i=0; i<project.tasks.length; i++) {
                        if(JSON.stringify(project.tasks[i]) == JSON.stringify(task)) {
                            exists = true;
                            res.status(400)
                                .json({error: "Element exists"});
                            return;
                        } else {
                            exists = false;                        }
                    }
                    console.log(exists);
                    Object.assign(project, project.tasks.push(task)).save()
                        .then(project => {
                            res.status(200)
                                .json({message: "Project successfully updated!", project});
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

exports.gettasks = (req, res) => {

};