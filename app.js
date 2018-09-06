const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/cfg');

//Routes
const user = require('./routes/user');
const company = require('./routes/company');
const internship = require('./routes/internship');
const cvbuilder = require('./routes/cvbuilder');
const listCandidate = require('./routes/listCandidate');
const migrate = require('./routes/migrate');

//connect to database and checking connection
mongoose.set('useFindAndModify', false);
mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);

mongoose.connect(config.database.uri, config.database.options);
mongoose.connection.on('connected', ()=>{
    console.log("Connection to database successful");
});
mongoose.connection.on('error', (error)=>{
    console.log("Error: "+ error);
});

//starting up server
const app = express();
const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log("Server started on port "+ port);
});

//static folder
app.use(express.static(path.join(__dirname, 'public')));

//Middlewares
app.use(cors());
app.use(bodyParser.json());

app.use(function(req, res, next) {
    req.tempStore = {};
    return next();
});

//subdirectory requests sent to routes
app.use('/user', user);
app.use('/company', company);
app.use('/internship', internship);
app.use('/cv', cvbuilder);
app.use('/listCandidate', listCandidate);
app.use('/migrate', migrate);

//invalid route fallback to index.js for angular path based routing strategy 
app.get('*', function(req, res){
    res.sendFile('./public/index.html', {root: __dirname});
});
