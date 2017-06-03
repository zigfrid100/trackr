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
            var task = new taskModel({name: "testTask", description: "be", status: 3});
            console.log(task);
            Object.assign(project.tasks, task).save()
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

exports.gettasks = (req, res) => {

};