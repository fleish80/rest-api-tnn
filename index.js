const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// set up express app
const app = express();

// connect to mongodb
mongoose.connect('mongodb://localhost:27017/ninjago', {useNewUrlParser: true});

// ES6 promises
mongoose.Promise = global.Promise;

app.use(bodyParser.json());

// initialize routes
app.use('/api',  require('./routes/api'));

// errror handling middleware
app.use((err, req, res, next) => {
    res.status(422).send({error: err.message})
});

//listen for requests
app.listen(process.env.port || 4000, () => {
    console.log('now listening for requests on port ' + process.env.port || 4000)
});
