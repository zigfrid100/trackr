const config = require('config');

const express = require('express');
const app = express();

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(config.db);

const cors = require('cors');
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(bodyParser.text());

app.listen(config.port, () => {
    console.log('Server running');
});

const projectsRoutes = require('./app/routes/projectsRoutes');
const tasksRoutes = require('./app/routes/tasksRoutes');
const usersRoutes = require('./app/routes/usersRoutes');

app.use('/projects', projectsRoutes);
app.use('/tasks', tasksRoutes);
app.use('/users', usersRoutes);

module.exports = app;
