const userModel = require('./../models/user');

exports.getUsers = (req, res) => {
    userModel.find()
        .then(users => {
            res.status(200)
                .json(users);
        })
        .catch(err => {
            res.status(400)
                .send(err);
        });
};

exports.postUser = (req, res) => {
    const newUser = new userModel(req.body);
    newUser.save()
        .then(user => {
            res.status(200)
                .json({message: "User successfully created!", user});
        })
        .catch(err => {
            res.status(400)
                .send(err);
        })
};

exports.getUser = (req, res) => {
    userModel.findById(req.params.id)
        .then(user => {
            res.status(200)
                .json(user)
        })
        .catch(err => {
            res.status(400)
                .send(err);
        });
};

exports.deleteUser = (req, res) => {
    userModel.findByIdAndRemove(req.params.id)
        .then(() => {
            res.status(200)
                .json({message: "User successfully deleted!"});
        })
        .catch(err => {
            res.status(400)
                .send(err)
        });
};

exports.putUser = (req, res) => {
    userModel.findById(req.params.id)
        .then(user => {
            Object.assign(user, req.body).save()
                .then(user => {
                    res.status(200)
                        .json({message: "Task successfully updated!", user});
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