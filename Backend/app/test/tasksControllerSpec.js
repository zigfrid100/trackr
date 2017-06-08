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
                        res.body.task.name.should.eql('Testtask');
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

    describe('PUT /tasks/:id/pause', () => {
        it('should pause a task', (done) => {

        });
    });

    describe('PUT /tasks/:id/stop', () => {
        it('should stop a task', (done) => {

        });
    });

    describe('PUT /tasks/:id/start', () => {
        it('should start a task', (done) => {

        });
    });
});
