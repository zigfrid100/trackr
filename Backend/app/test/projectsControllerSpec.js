'use_strict';

// Model & server
const Joke = require('../models/project');
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
            res.body.should.eql([task]);
          });
      });
    });

    describe('POST /projects/:id/tasks', () => {
      it('should add a tas to a new project', (done) => {
        let task = new Task({ name: 'Testtask' });
        let project = new Project({ name: 'Testproject' });

        chai.request(server)
          .post(`/projects/${project.id}/tasks`)
          .send(task)
          .end((_err, res) => {
            res.should.have.status(200);
            res.body.should.eql(task);
          });
      });
    });
  });
