'use_strict';

// Model & server
const User = require('../models/user');
const server = require('../../server');

// Require our dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should();

chai.use(chaiHttp);

describe('users', () => {
    const exampleUser = {
        firstName: 'Hans',
        lastName: 'Peter',
        email: 'hans@peter.de',
        password: 'test1234'
    };

    beforeEach((done) => {
        User.remove({}, () => {
            done();
        });
    });

    describe('GET /users', () => {
        it('should return all users', (done) => {
            chai.request(server)
                .get('/users')
                .end((_err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });

    describe('GET /users/:id', () => {
        it('should return a single user', (done) => {
            new User(exampleUser).save((_err, user) => {
                chai.request(server)
                    .get(`/users/${user.id}`)
                    .end((_err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.firstName.should.eql('Hans');
                        done();
                    });
            });
        });
    });

    describe('POST /users', () => {
        it('should create a user', (done) => {
            chai.request(server)
                .post('/users')
                .send(exampleUser)
                .end((_err, res) => {
                    res.should.have.status(200);
                    res.body.user.firstName.should.eql('Hans');
                    done();
                });
        });
    });

    describe('DELETE /users/:id', () => {
        it('should delete a user', (done) => {
            new User(exampleUser).save((_err, user) => {
                chai.request(server)
                    .delete(`/users/${user.id}`)
                    .end((_err, res) => {
                        res.should.have.status(200);
                        done();
                    });
            });
        });
    });

    describe('PUT /user/:id', () => {
        it('should update a user', (done) => {
            new User(exampleUser).save((_err, user) => {
                chai.request(server)
                    .put(`/users/${user.id}`)
                    .send({ firstName: 'Peter' })
                    .end((_err, res) => {
                        res.should.have.status(200);
                        res.body.user.firstName.should.eql('Peter');
                        done();
                    });
            });
        });
    });
});
