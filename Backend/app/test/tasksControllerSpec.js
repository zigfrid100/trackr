'use_strict';

// Model & server
const Project = require('../models/project');
const Task = require('../models/task');
const server = require('../../server');

// Require our dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should();

chai.use(chaiHttp);

describe('tasks', () => {
    beforeEach((done) => {
        Task.remove({}, () => {
            done();
        });
    });

    describe('GET /tasks', () => {
        it('should return all tasks', (done) => {
            chai.request(server)
                .get('/tasks')
                .end((_err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });

    describe('GET /tasks/:id', () => {
        it('should return a single task', (done) => {
            let task = new Task({ name: 'Testtask' });

            task.save((_err, task) => {
                chai.request(server)
                    .get(`/tasks/${task.id}`)
                    .end((_err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.name.should.eql('Testtask');
                        done();
                    });
            });
        });
    });

    describe('POST /tasks', () => {
        it('should create a task', (done) => {
            let task = { name: 'Testtask' };

            chai.request(server)
                .post('/tasks')
                .send(task)
                .end((_err, res) => {
                    res.should.have.status(200);
                    res.body.task.name.should.eql('Testtask');
                    done();
                });
        });
    });

    describe('DELETE /tasks/:id', () => {
        it('should delete a task', (done) => {
            let task = new Task({ name: 'Testtask' });

            task.save((_err, task) => {
                chai.request(server)
                    .delete(`/tasks/${task.id}`)
                    .end((_err, res) => {
                        res.should.have.status(200);
                        done();
                    });
            });
        });

        it('should delete the task from all projects it belongs to', (done) => {
            let task = new Task({ name: 'Testtask' });

            task.save((_err, task) => {
                let project = new Project({ name: 'Testproject', tasks: [task._id] });

                project.save((_err, project) => {
                    chai.request(server)
                        .delete(`/tasks/${task.id}`)
                        .end((_err, res) => {
                            res.should.have.status(200);
                            chai.request(server)
                                .get(`/projects/${project.id}`)
                                .end((_err, res) => {
                                    res.should.have.status(200);
                                    res.body.should.have.property('tasks').eql([]);
                                });

                            done();
                        });
                });
            });
        });
    });

    describe('PUT /tasks/:id', () => {
        it('should update a task', (done) => {
            let task = new Task({ name: 'Testtask' });

            task.save((_err, task) => {
                chai.request(server)
                    .put(`/tasks/${task.id}`)
                    .send({ name: 'Test' })
                    .end((_err, res) => {
                        res.should.have.status(200);
                        res.body.task.name.should.eql('Test');
                        done();
                    });
            });
        });
    });

    describe('PUT /tasks/pause/:id', () => {
        it('should pause a task', (done) => {
            let task = new Task({ name: 'Testtask' });

            task.save((_err, task) => {
                chai.request(server)
                    .put(`/tasks/pause/${task.id}`)
                    .end((_err, res) => {
                        res.should.have.status(200);
                        res.body.task.name.should.eql('Testtask');
                        res.body.message.should.eql('Task successfully paused!');
                        done();
                    });
            });
        });
    });

    describe('PUT /tasks/start/:id', () => {
        it('should start a task', (done) => {
            let task = new Task({ name: 'Testtask' });

            task.save((_err, task) => {
                chai.request(server)
                    .put(`/tasks/start/${task.id}`)
                    .end((_err, res) => {
                        res.should.have.status(200);
                        res.body.task.name.should.eql('Testtask');
                        res.body.message.should.eql('Task successfully started!');
                        done();
                    });
            });
        });
    });
});
