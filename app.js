const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/cfg');

//connect to database and checking connection
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
app.listen(port,()=>{
    console.log("Server started on port "+ port);
});

//Importing routes files
const user = require('./routes/user');
const company = require('./routes/company');
const internship = require('./routes/internship');
const cvbuilder = require('./routes/cvbuilder');
const migrate = require('./routes/migrate');

//static folder
app.use(express.static(path.join(__dirname,'public')));

//Middlewares
app.use(cors());
app.use(bodyParser.json());

app.use(function(req, res, next) {
    req.tempStore = {};
    return next();
});

//Index request
app.get("/", (req, res)=>{
    res.send("Invalid route");
});

//subdirectory requests
app.use('/user', user);
app.use('/company', company);
app.use('/internship', internship);
app.use('/cv', cvbuilder);
app.use('/migrate',migrate)

app.get('*', function(req, res){
    res.sendFile('./public/index.html', {root: __dirname});
});