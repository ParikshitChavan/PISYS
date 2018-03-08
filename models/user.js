const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/cfg');
const mailer = require('../helpers/mailer')

//importing other models
const Company = require('../models/company');
const Internship = require('../models/internship');
const Sitelink = require ('../models/sitelink');

const userSchema = Schema({
    isActive: Boolean,
    name: {
        type: String
    },
    email: {
        type: String,
        index: true,
        unique: true,
        required: true
    },
    emailVerified: {
        type: Boolean,
        default: false
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    access: {
        type: Number,               //2 = Willings member | 1 = Company Admin | 0 = Candidate
        required: true              
    },
    DOB: Date,
    phNum: { countryCode: String, number: Number},
    DP: { key: String, url: String },                 //display picture
    internships: [{ type: Schema.Types.ObjectId, ref: 'Intership' }],       //What intership she/he has done!
    company: {type: Schema.Types.ObjectId, ref: 'Company'},                 //Company that she/he is an admin for
    inchargeOf: [{type: Schema.Types.ObjectId, ref: 'Intership'}]           //Interships for which she/he is a supervisor
    //gender: Number,              //1.Male, 2.Female, 3.Other, 4.Do not wish to disclose
});

const User = module.exports = mongoose.model('User', userSchema);

                                    /*====== Functions ======*/

function validateEmail(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

//jwt Validation function
module.exports.validateToken = function(token, callback){         
    if(!token){                                                     
        return callback("No token provided", 403, null);
    }
    jwt.verify(token, config.secret, (err, decoded)=>{
        if(err) return callback("Failed to authenticate the token", 500, decoded);
        callback(null, 200, decoded);
    });
}

module.exports.addUser = function(newUser, callback){
    bcrypt.genSalt(10, (err, salt)=>{
        if(err) throw err;
        bcrypt.hash(newUser.password, salt, (err, hash)=>{
            if(err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
}

module.exports.getUserByEmail = function(email, callback){
    const query = {email: email};
    User.findOne(query, callback);
}

module.exports.getCompany = function(userId, callback){
    User.findById(id, 'company', (err, user)=>{
        if (err) return callback(err, null);
        if (!user.company) return callback(null, null);
        callback(null, user.company);
    });
}

module.exports.addCompany = function(userId, companyId, callback){
    User.findByIdAndUpdate(userId, { $set: { company: companyId }}, callback);
}

module.exports.getInternships = function(userId, callback){
    User.findById(id, 'interships', (err, user)=>{
        if (err) return callback(err, null);
        if (!user.interships || user.interships.length) return callback(null, null);
        callback(null, user.interships);
    });
}

module.exports.addInternship = function(userId, internshipId, callback){
    User.findByIdAndUpdate(userId, { $push: { internships: internshipId }}, callback);
}

module.exports.getInchargeOf = function(userId, callback){
    User.findById(id, 'inchargeOf', (err, user)=>{
        if (err) return callback(err, null);
        if (!user.inchargeOf || user.inchargeOf.length) return callback(null, null);
        callback(null, user.inchargeOf);
    });
}

module.exports.addInchargeOf = function(userId, internshipId, callback){
    User.findByIdAndUpdate(userId, { $push: { inchargeOf: internshipId }}, callback);
}

module.exports.deleteUserById = function(id, callback){
    User.findByIdAndRemove(id,callback);
    /*
    User.update({_id: id}, set{isActive: false},(err)=>{
    if (err) throw err;
    })*/
}

module.exports.comparePasswords = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, (err, isMatch)=>{
        if(err) return callback(err, null);
        callback(null, isMatch);
    });
}

module.exports.setPassword = function(userId, newPass, callback){
    User.findById(userId, 'email password', (err, user)=>{
        if(err) throw err;
        bcrypt.genSalt(10, (err, salt)=>{
            if(err) throw err;
            bcrypt.hash(newPass, salt, (err, hash)=>{
                if(err) throw err;
                user.password = hash
                user.save(callback);
            });
        });
    });
}

module.exports.markEmailVerified = function(email){
    let query = {email: email};
    User.findOneAndUpdate(query, {emailVerified: true}, (err)=>{
        if(err) throw err;
    });
}

module.exports.setupEmailVerification = function(email, callback){
    if(!email) return callback('no email provided');
    const query = {email: email};
    User.findOne(query, (err, user)=>{
        if(err) throw err;
        Sitelink.createEmailVerificationLink(email,(err,siteLink)=>{
            if(err) throw err;
            let recipient = {name: user.name, email: user.email};
            mailer.sendEmailVerificationMail(recipient, siteLink, (err)=>{
                if(err) throw err;
                callback(null);
            });
        });
    });
}

module.exports.setupPasswordReset = function(email, callback){
    if(!email) return callback('no email provided');
    const query = {email: email};
    User.findOne(query, (err, user)=>{
        if(err) throw err;
        Sitelink.createPasswordResetLink(email,(err,siteLink)=>{
            if(err) throw err;
            let recipient = {name: user.name, email: user.email};
            mailer.sendPasswordResetMail(recipient, siteLink, (err)=>{
                if(err) throw err;
                callback(null);
            });
        });
    });
}

module.exports.getDP = function(userId, callback){
    User.findById(userId, 'DP', {lean: true}, (err, user) => {
        if(err) return callback(err, null);
        return callback(null, user.DP);
    });
}

module.exports.updateDP = function(userId, awsKey, awsUrl, callback){
    User.findByIdAndUpdate(userId, { $set: { DP: { key: awsKey, url: awsUrl } }}, callback);
}