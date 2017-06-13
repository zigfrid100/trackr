const config = require('config');

// set up express
const express = require('express');
const app = express();

// set up DB / mongoose
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(config.db);

// set up cors
const cors = require('cors');
app.use(cors());

// set up body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(bodyParser.text());

// error handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Something broke!');
  next(err);
});

/*===================== ROUTES ============================*/
const projectsRoutes = require('./app/routes/projectsRoutes');
app.use('/projects', projectsRoutes);

const tasksRoutes = require('./app/routes/tasksRoutes');
app.use('/tasks', tasksRoutes);

const usersRoutes = require('./app/routes/usersRoutes');
app.use('/users', usersRoutes);


app.listen(config.port, () => {
    console.log('Server running');
});

module.exports = app;
