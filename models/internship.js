const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('./config/database');

const internshipSchema = mongoose.Schema({

});

const Internship = module.exports = mongoose.model(Internship, internshipSchema);