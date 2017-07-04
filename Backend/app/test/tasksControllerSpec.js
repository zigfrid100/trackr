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
    const exampleTask = {
        name: 'Testtask'
    };

    beforeEach((done) => {
        Task.remove({}, () => {
            Project.remove({}, () => {
                done();
            });
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
            new Task(exampleTask).save((_err, task) => {
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

        it('should return the projects for a single task', (done) => {
            new Task(exampleTask).save((_err, task) => {
                let project = new Project({ name: 'Testproject', tasks: [task._id] });

                project.save((_err, project) => {
                    chai.request(server)
                        .get(`/tasks/${task.id}/projects`)
                        .end((_err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('array');
                            res.body.length.should.eql(1);
                            done();
                        });
                });
            });
        })

        it('should correctly calculate the total time', (done) => {
            const intervals = [
                { startDate: new Date(1499003864449), stopDate: new Date(1499003868314), run: false },
                { startDate: new Date(1499003855926), stopDate: new Date(1499003861704), run: false }
            ]

            const task = Object.assign(new Task(exampleTask), { interval: intervals });

            task.save((_err, task) => {
                task.total.should.eql(9.643);
                done();
            });
        })
    });

    describe('POST /tasks', () => {
        it('should create a task', (done) => {
            chai.request(server)
                .post('/tasks')
                .send(exampleTask)
                .end((_err, res) => {
                    res.should.have.status(200);
                    res.body.task.name.should.eql('Testtask');
                    done();
                });
        });
    });

    describe('DELETE /tasks/:id', () => {
        it('should delete a task', (done) => {
            new Task(exampleTask).save((_err, task) => {
                chai.request(server)
                    .delete(`/tasks/${task.id}`)
                    .end((_err, res) => {
                        res.should.have.status(200);
                        done();
                    });
            });
        });

        it('should delete the task from all projects it belongs to', (done) => {
            new Task(exampleTask).save((_err, task) => {
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
            new Task(exampleTask).save((_err, task) => {
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

    describe('PUT /tasks/:id/pause', () => {
        it('should pause a task', (done) => {
            new Task(exampleTask).save((_err, task) => {
                chai.request(server)
                    .put(`/tasks/${task.id}/pause`)
                    .end((_err, res) => {
                        res.should.have.status(200);
                        res.body.task.name.should.eql('Testtask');
                        res.body.message.should.eql('Task successfully paused!');
                        done();
                    });
            });
        });
    });

    describe('PUT /tasks/:id/start', () => {
        it('should start a task', (done) => {
            new Task(exampleTask).save((_err, task) => {
                chai.request(server)
                    .put(`/tasks/${task.id}/start`)
                    .end((_err, res) => {
                        res.should.have.status(200);
                        res.body.task.name.should.eql('Testtask');
                        res.body.message.should.eql('Task successfully started!');
                        done();
                    });
            });
        });

        it('should stop all other tasks upon starting a task', (done) => {
            new Task(exampleTask).save((_err, task) => {
                chai.request(server)
                    .put(`/tasks/${task.id}/start`)
                    .end((_err, res) => {
                        res.should.have.status(200);
                        res.body.task.interval[0].run.should.eql(true);
                            new Task(exampleTask).save((_err, task) => {
                                chai.request(server)
                                    .put(`/tasks/${task.id}/start`)
                                    .end((_err, res) => {
                                        res.should.have.status(200);
                                        res.body.task.interval[0].run.should.eql(true);
                                        Task.count({ 'interval.run': true }).should.eql(1);
                                        done();
                                    });
                            });
                        done();
                    });
            });
        });
    });
});
