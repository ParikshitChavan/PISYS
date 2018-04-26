const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const config = require('../config/cfg');

//importing Other models
const Internship = require('../models/internship');
const User = require('../models/user');
const Company = require('../models/company');

const sitelinkSchema = Schema({
    sentTo: {type: String, required: true},
    expiry: Date,
    type: String                    //activation, passwordReset, emailVerification
});

const Sitelink = module.exports = mongoose.model('Sitelink', sitelinkSchema);

function validateEmail(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

module.exports.createActivationLink = function(email, callback){
    if(!validateEmail(email)) return callback('Invalid Email', null);
    let newSitelink = new Sitelink({
        _id: new mongoose.Types.ObjectId(),
        sentTo: email,
        expiry: null,
        type: 'activation'
    })
    newSitelink.save((err)=>{
        if(err) return callback(err, null);
        let link = "http:/localhost:3000/users/activateaccount/:" + newSitelink._id;
        callback(null, link);
    });
}

module.exports.createPasswordResetLink = function(email, callback){
    if(!validateEmail(email)) return callback('Invalid Email', null);
    let expiry = new Date();
    expiry.setHours(expiry.getHours() + 12);
    let newSitelink = new Sitelink({
        _id: new mongoose.Types.ObjectId(),
        sentTo: email,
        expiry: expires,
        type: 'passwordReset'
    })
    newSitelink.save((err)=>{
        if(err) return callback(err, null);
        let link = "http:/localhost:3000/users/resetpassword/:" + newSitelink._id;
        callback(null, link);
        //delete token after on successful change
    });
}

module.exports.createEmailVerificationLink = function(email, callback){
    if(!validateEmail(email)) return callback('Invalid Email', null);
    let newSitelink = new Sitelink({
        _id: new mongoose.Types.ObjectId(),
        sentTo: email,
        expiry: null,
        type: 'emailVerification'
    })
    /*future scope check if already activated if not check if already token is preset*/
    newSitelink.save((err)=>{
        if(err) return callback(err, null);
        let link = "http:/localhost:3000/users/verifyemail/:" + newSitelink._id;
        callback(null, link);
    });
}

module.exports.validateSitelink = function(token, callback){        //callback(err, userId)
    Sitelink.findById(token, (err, sitelink)=>{
        if(err) throw err;
        if(!sitelink) return callback('sitelink not valid', null);
        if(sitelink.expiry){
            var currDate = new Date();
            if(expiry - currDate < 0) return callback('sitelink expired', null);
            else {
                User.getUserIdByEmail(sitelink.sentTo, (err, userId)=>{
                    if(err) throw err;
                    return callback(null, userId);
                });
            }
        }
        else{
            if(sitelink.type == 'activation'){
                User.getUserIdByEmail(sitelink.sentTo, (err, userId)=>{
                    if(err) throw err;
                    return callback(null, userId);
                });
            }
            if(sitelink.type == 'emailVerification') {
                User.markEmailVerified(sitelink.sentTo);
                sitelink.remove((err)=>{
                    if(err) throw err;
                    return callback(null, null);
                });
            }
        }
    });
}

module.exports.deleteSitelinks = function(email, type, callback){
    Sitelink.deleteMany({ sentTo: email, type: type }, callback);
}