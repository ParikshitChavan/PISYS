const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('./config/cfg');

//importing other models
const Company = require('./models/company');
const Internship = require('./models/internship');

const userSchema = Schema({
    isActive: Boolean,
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
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
        type: number,               //2 = Willings member | 1 = Company Admin | 0 = Candidate
        required: true              
    },
    DOB: Date,
    phNum: { countryCode: String, number: Number},
    displayPic: String,
    internships: [{ type: Schema.Types.ObjectId, ref: 'Intership' }],       //What intership she/he has done!
    company: {type: Schema.Types.ObjectId, ref: 'Company'},                 //Company that she/he is an admin for
    inchargeOf: [{type: Schema.Types.ObjectId, ref: 'Intership'}]           //Interships for which she/he is a supervisor
    //gender: Number,              //1.Male, 2.Female, 3.Other, 4.Do not wish to disclose
});

const User = module.exports = mongoose.model(User, userSchema);

                                    /*====== Functions ======*/

function validateEmail(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
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

////Validation functions\\\\
//made 3 separate functions to keep access number encapsulated
module.exports.validateToken = function(token, callback){         
    if(!token){                                                     
        return callback("No token provided", 403, null);
    }
    jwt.verify(token, config.secret, (err, decoded)=>{
        if(err) return callback("Failed to authenticate the token", 500, decoded);
        callback(null, 200, decoded);
    });
}