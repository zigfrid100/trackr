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

};

exports.getProject = (req, res) => {

};

exports.deleteProject = (req, res) => {

};

exports.patchProject = (req, res) => {

};

exports.addtask = (req, res) => {

};

exports.gettasks = (req, res) => {

};