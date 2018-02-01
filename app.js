const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

//connect to database and checking connection
mongoose.connect(config.database);
mongoose.connection.on('connected', ()=>{
    console.log("Connection successful");
});
mongoose.connection.on('error', (error)=>{
    console.log("Error: "+ error);
});

//starting up server
const app = express();
const port = 3000;
app.listen(port,()=>{
    console.log("Server started on port "+ port);
});

//Importing routes files
const candidate = require('./routes/candidate');
const member = require('./routes/member');
const company = require('./routes/company');
const internship = require('./routes/internship');

//static folder
app.use(express.static(path.join(__dirname,'public')));

//Middlewares
app.use(cors());
app.use(bodyParser.json());

//Index request
app.get("/", (req, res)=>{
    res.send("Invalid route");
});

//subdirectory requests
app.use('/candidate', candidate);
app.use('/member', member);
app.use('/company', company);
app.use('/internship', internship);