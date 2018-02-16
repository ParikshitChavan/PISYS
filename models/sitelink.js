const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const config = require('./config/cfg');

//importing Other models
const Internship = require('./models/internship');
const User = require('./models/user');
const Company = require('./models/company');

const sitelinkSchema = Schema({
    sentTo: {type: String, required: true},
    token: {type: String, required: true},
    expiry: Date,
    type: String                    //activation, passwordReset, emailVerification
});

const Sitelink = module.exports = mongoose.model(Sitelink, sitelinkSchema);

function createToken(){
    let chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let token = '';
    for (var i = 16; i > 0; --i) {
        token += chars[Math.round(Math.random() * (chars.length - 1))];
    }
    return token;
}

function validateEmail(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

module.exports.createActivationLink = function(email, callback){
    if(!validateEmail(email)) return callback(err, null);
    let token = createToken();
    let newSitelink = new Sitelink({
        sentTo: email,
        token: token,
        expiry: null,
        type: 'activation'
    })
    newSitelink.save((err, token)=>{
        if(err) return callback(err, null);
        let link = "http:/localhost:3000/users/activateaccount/" + token;
        callback(null, link);
    });
}

module.exports.createPasswordResetLink = function(email, callback){
    if(!validateEmail(email)) return callback(err, null);
    let token = createToken();
    let expiry = new Date();
    expiry.setHours(expiry.getHours() + 12);
    let newSitelink = new Sitelink({
        sentTo: email,
        token: token,
        expiry: expires,
        type: 'passwordReset'
    })
    newSitelink.save((err, token)=>{
        if(err) return callback(err, null);
        let link = "http:/localhost:3000/users/resetpassword/" + token;
        callback(null, link);
        //delete token after on successful change
    });
}

module.exports.createEmailVerificationLink = function(email, callback){
    if(!validateEmail(email)) return callback(err, null);
    let token = createToken();
    let newSitelink = new Sitelink({
        sentTo: email,
        token: token,
        expiry: null,
        type: 'emailVerification'
    })
    /*future scope check if already activated if not check if already token is preset*/
    newSitelink.save((err, token)=>{
        if(err) return callback(err, null);
        let link = "http:/localhost:3000/users/verifyemail/" + token;
        callback(null, link);
    });
}

/*module.exports.removeSitelinkById = function(){

}*/