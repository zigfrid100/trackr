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

describe('projects', () => {
    beforeEach((done) => {
        Project.remove({}, () => {
            done();
        });
    });

    describe('GET /projects', () => {
        it('should GET all the projects', (done) => {
            chai.request(server)
                .get('/projects')
                .end((_err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });

    describe('GET /projects/:id', () => {
        it('should GET a single project', (done) => {
            let project = new Project({ name: 'Testprojekt' });

            project.save((_err, project) => {
                chai.request(server)
                    .get(`/projects/${project.id}`)
                    .end((_err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('name').eql('Testprojekt');
                        res.body.should.have.property('_id').eql(project.id);
                        done();
                    });
            });
        });
    });

    describe('GET /projects/:id/tasks', () => {
        it('should return all tasks belonging to a project', (done) => {
            let task = new Task({ name: 'Testtask' });
            let project = new Project({ name: 'Testproject', tasks: [task]});

            project.save((_err, project) => {
                chai.request(server)
                    .get(`/projects/${project.id}/tasks`)
                    .end((_err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                        done();
                    });
            });
        });
    });

    describe('POST /projects/:id/tasks/:taskid', () => {
        it('should add a task to a new project', (done) => {
            let task = new Task({ name: 'Testtask' });
            let project = new Project({ name: 'Testproject' });

            project.save((_err, project) => {
                task.save((_err, task) => {
                    chai.request(server)
                        .post(`/projects/${project.id}/tasks/${task.id}`)
                        .send(task)
                        .end((_err, res) => {
                            res.should.have.status(200);
                            res.body.project.tasks[0].should.eql(task.id);
                            done();
                        });
                });
            });
        });
    });

    describe('POST /projects', () => {
        it('should create a new project', (done) => {
            let project = { name: 'Testproject' };

            chai.request(server)
                .post('/projects')
                .send(project)
                .end((_err, res) => {
                    res.should.have.status(200);
                    res.body.project.name.should.eql('Testproject');
                    done();
                });
        });
    });

    describe('DELETE /projects/:id', () => {
        it('should delete a project by id', (done) => {
            let project = new Project({ name: 'Testproject' });

            project.save((_err, project) => {
                chai.request(server)
                    .delete(`/projects/${project.id}`)
                    .end((_err, res) => {
                        res.should.have.status(200);
                        done();
                    });
            });
        });
    });

    describe('DELETE /projects/:id/tasks/:taskid', () => {
        it('should delete a task by id', (done) => {
            let task = new Task({ name: 'Testtask' });

            task.save((_err, task) => {
                let project = new Project({ name: 'Testproject', tasks: [task.id] });

                project.save((_err, project) => {
                    chai.request(server)
                        .delete(`/projects/${project.id}/tasks/${task.id}`)
                        .end((_err, res) => {
                            res.should.have.status(200);
                            done();
                        });
                });
            });
        });
    });

    describe('PUT /projects/:id', () => {
        it('should update an existing project', (done) => {
            let project = new Project({ name: 'Testproject' });

            project.save((_err, project) => {
                chai.request(server)
                    .put(`/projects/${project.id}`)
                    .send({ name: 'Updated Testproject' })
                    .end((_err, res) => {
                        res.should.have.status(200);
                        res.body.project.name.should.eql('Updated Testproject');
                        done();
                    });
            });
        });
    });
});
