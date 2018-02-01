const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('./config/database');

const memberSchema = mongoose.Schema({

});

const Member = module.exports = mongoose.model(Member, memberSchema);