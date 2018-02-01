const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('./config/database');

const candidateSchema = mongoose.Schema({

});

const Candidate = module.exports = mongoose.model(Candidate, candidateSchema);