const config = require('config');

const express = require('express');
const app = express();

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(config.db);

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');						//add frontends address here
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(bodyParser.text());

app.listen(config.port, () => {
    console.log('Serv running');
});

const projectsRoutes = require('./routes/projectsRoutes');
const tasksRoutes = require('./routes/tasksRoutes');
const usersRoutes = require('./routes/usersRoutes');

//app.use('/api', projectsRoutes);          //uncomment after controller implementation
//app.use('/btc', tasksRoutes);
//app.use('/api', usersRoutes);

module.exports = app;