const projectModel = require('./../models/project');

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
        .then(joke => {
            res.status(200)
                .json(joke)
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

};

exports.gettasks = (req, res) => {

};