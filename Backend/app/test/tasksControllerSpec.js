'use_strict';

// Model & server
const Joke = require('../models/task');
const server = require('../../server');

// Require our dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should();

chai.use(chaiHttp);
