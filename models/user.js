const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectID;
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/cfg');
const mailer = require('../helpers/mailer')

const Sitelink = require ('../models/sitelink');

const userSchema = Schema({
    isActive: Boolean,
    name: {
        type: String,
        required: true
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
    /*username: {
        type: String,
        required: true,
    },*/
    password: {
        type: String,
        required: true
    },
    access: {
        type: Number,               //2 = Willings member | 1 = Company Admin | 0 = Candidate
        required: true              
    },
    DOB: Date,
    phNum: String,
    skypeId: String,
    DP: { key: String, url: String },                 //display picture
    internships: [{ type: Schema.Types.ObjectId, ref: 'Internship' }],       //What internship she/he has done!
    company: {type: Schema.Types.ObjectId, ref: 'Company'},                 //Company that she/he is an admin for
    inchargeOf: [{type: Schema.Types.ObjectId, ref: 'Internship'}],
    likedPos : {
        batch2019: [{
            _id: false,
            cmpId: {type: Schema.Types.ObjectId, ref: 'Company'},
            opng: {type: Schema.Types.ObjectId}
        }]
    },           //Internships for which she/he is a supervisor
    cv: [{type: Schema.Types.ObjectId, ref: 'CvBuilder'}]
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

module.exports.getUserInfoById = function(userId, callback){
    User.findById(userId,'name email phNum DP DOB skypeId', callback);
}

module.exports.getUserPassById = function(userId, callback){
    User.findById(userId, 'password', callback);
}

module.exports.getUserByEmail = function(email, callback){
    const query = {email: email};
    User.findOne(query, 'name email DP access password', callback);
}

module.exports.getUserIdByEmail = function(userId, callback){ //callback(err, id)
    const query = {email: email};
    User.findOne(query, 'name', { lean: true }, (err, user)=>{
        if(err) return callback(err, null);
        callback(null, user._id);
    });
}

module.exports.getDashBoardInternships = function(decoded, callback){         //callback(err, internships)
    if(decoded.access == 0){
        User.findById(decoded._id, '_id', { lean: true })
        .populate({
            path:'internships',
            select: 'projectName description',
            populate: [{path: 'candidate', select:'name'}, {path: 'company', select:'name logo'}]
        }).exec((err, user)=>{
            if(err) return callback(err, null);
            let internships = user.internships;
            let count = internships.length;
            if(count){
                for(let i = 0; i < count; i++){
                    internships[i]['img'] = internships[i].company.logo.url;
                }
            }
            callback(null, internships);
        });
    }
    else{
        User.findById(decoded._id, '_id', {lean: true})
        .populate({
            path:'company',
            populate:{
                path: 'internships',
                select:'projectName description',
                populate:[{path: 'candidate', select:'name DP'}, {path: 'company', select:'name'}]
            }
        }).exec((err, user)=>{
            if(err) return callback(err, null);
            let internships = user.company.internships;
            let count = internships.length;
            if(count){
                for(let i = 0; i < count; i++){
                    let imgUrl = internships[i].candidate.DP.url;
                    internships[i]['img'] = imgUrl;
                }
            }
            callback(null, internships);
        });
    }
}

module.exports.updateInfoById = function(userId, userInfo, callback){
    User.findByIdAndUpdate(userId, { $set: { name: userInfo.name, DOB: userInfo.DOB, phNum: userInfo.phNum, skypeId: userInfo.skypeId }}, callback);
}

module.exports.getCompany = function(userId, callback){
    User.findById(userId, 'company', {lean: true}, (err, user)=>{
        if (err) return callback(err, null);
        if (!user.hasOwnProperty('company')) return callback(null, null);
        callback(null, user.company);
    });
}

module.exports.addCompany = function(userId, companyId, callback){
    User.findByIdAndUpdate(userId, { $set: { company: companyId }}, callback);
}

module.exports.getInternships = function(userId, callback){
    User.findById(id, 'internships', (err, user)=>{
        if (err) return callback(err, null);
        if (!user.internships || user.internships.length) return callback(null, null);
        callback(null, user.internships);
    });
}

module.exports.addInternship = function(userId, internshipId, callback){
    User.findByIdAndUpdate(userId, { $push: { internships: internshipId }}, callback);
}

module.exports.getInchargeOf = function(userId, callback){
    User.findById(userId, 'inchargeOf', (err, user)=>{
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
    User.findById(userId, 'name email password DP', (err, user)=>{
        if(err) return callback(err, null);
        bcrypt.genSalt(10, (err, salt)=>{
            if(err) return callback(err, null);
            bcrypt.hash(newPass, salt, (err, hash)=>{
                if(err) return callback(err, null);
                user.password = hash
                user.save(callback);
            });
        });
    });
}

module.exports.markEmailVerified = function(email, callback){
    let query = {email: email};
    User.findOneAndUpdate(query, {$set: {emailVerified: true}}, (err)=>{
        if(err) return callback(err);
        callback(null);
    });
}

module.exports.setupEmailVerification = function(email, callback){
    if(!email) return callback('no email provided');
    const query = {email: email};
    User.findOne(query, (err, user)=>{
        if(err) return callback(err);
        Sitelink.createEmailVerificationLink(email,(err,siteLink)=>{
            if(err) return callback(err);
            let recipient = {name: user.name, email: user.email};
            mailer.sendEmailVerificationMail(recipient, siteLink, (err)=>{
                if(err) return callback(err);
                callback(null);
            });
        });
    });
}

module.exports.setupPasswordReset = function(email, callback){
    if(!email) return callback('no email provided');
    const query = {email: email};
    User.findOne(query, (err, user)=>{
        if(err) return callback(err);
        if(user == null) return callback('No user found');
        if(!user.email || !user.name) return callback('No user found');
        Sitelink.createPasswordResetLink(email,(err,siteLink)=>{
            if(err) return callback(err);
            let recipient = {name: user.name, email: user.email};
            mailer.sendPasswordResetMail(recipient, siteLink, (err)=>{
                if(err) return callback(err);
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

module.exports.updateDisplayPic = function(userId, awsKey, awsUrl, callback){
    User.findByIdAndUpdate(userId, { $set: { DP: { key: awsKey, url: awsUrl } }}, callback);
}

module.exports.getSuggestions = function(searchTerm, callback){
    let query = {name: { $regex : '.*' + searchTerm + '.*', $options: 'i' }};
    User.find(query).select('email DP').limit(10).lean().exec((err, users)=>{
        if(err) callback(err, null);
        data = {};
        for( let user of users){
            data[user.email] = user.DP.url
        }
        callback(null, data);
    });
}

module.exports.getUserIdByEmail = function(email, callback){
    User.findOne( { email: email }, '_id', {lean: true}, (err, user) =>{
        if(err) callback(err, null);
        callback(null, user._id);
    });
}

module.exports.validateSitelink = function(token, callback){        //callback(err, userId)
    Sitelink.findById(token, (err, sitelink)=>{
        if(err) return callback(err, null);
        if(!sitelink) return callback('sitelink not valid', null);
        if(sitelink.expiry){
            var currDate = new Date();
            if(expiry - currDate < 0) return callback('sitelink expired', null);
            else {
                User.getUserIdByEmail(sitelink.sentTo, (err, userId)=>{
                    if(err) return callback(err, null);
                    return callback(null, userId);
                });
            }
        }
        else{
            if(sitelink.type == 'activation'){
                User.getUserIdByEmail(sitelink.sentTo, (err, userId)=>{
                    if(err) return callback(err, null);
                    return callback(null, userId);
                });
            }
            if(sitelink.type == 'emailVerification') {
                User.markEmailVerified(sitelink.sentTo, (err)=>{
                    if(err) return callback(err, null);
                    sitelink.remove((err)=>{
                        if(err) return callback(err, null);
                        return callback(null, null);
                    });
                });
            }
        }
    });
}

module.exports.addOpeningLike = function(companyId, openingId, userId, callback){              //callback(err, maxLmt)
    User.findById(userId, 'likedPos', (err, user) => {
        if(err) return callback(err, false);
        if(user.likedPos.batch2019.length == 3) return callback(null, true);
        else{
            user.likedPos.batch2019.push({cmpId: companyId, opng: openingId});
            user.save(err => {
                if(err) return callback(err, false);
                callback(null, false);
            });
        }  
    });
}

module.exports.removeOpeningLike = function(companyId, openingId, userId, callback){           //callback(err)
    User.findById(userId, 'likedPos', (err, user) =>{
        if(err) return callback(err);
        let length =  user.likedPos.batch2019.length;
        let index = -1;
        for(let i=0; i<length; i++){
            if(user.likedPos.batch2019[i].cmpId == companyId && user.likedPos.batch2019[i].opng == openingId){
                index = i;
                break;
            }
        }
        if(index != -1){
            user.likedPos.batch2019.splice(index, 1);
            user.save(callback);
        }
        else callback('Liked opening not found.');
    });
}

module.exports.getCv = function(userId, callback){
    User.findById(userId, 'cv', {lean: true}, (err, user)=>{
        if (err) return callback(err, null);
        if(!user) return callback(null, null);
        if(!user.cv) return callback(null, null);
        callback(null, user.cv);
    });
}

module.exports.getUsers = (query, callback) => {
 User.find(query, 'email access cv', callback);
}

module.exports.addCv = function(userId, cvId, callback){
    User.findByIdAndUpdate(userId, { $set: { cv: cvId }}, callback);
}


module.exports.getLastYearRegistrants = function(season, callback){
    User.find(
        { _id: { $gt: ObjectId.createFromTime(new Date(new Date().setFullYear(new Date().getFullYear() - 1)))}},
        'skypeId',
        (err, users)=>{
            if(err) return callback(err, null);
            users.forEach(user=>{
                user['year'] = season;
            });
        }
    );
}

module.exports.getSkypeId = function(candidateId, callback){
    User.findById(candidateId, 'skypeId', {lean: true}, callback);
}
module.exports.pullCandidates = (query, perPage, pageNumber, callback) => {
    User.find(query, callback).sort('-name').skip((pageNumber-1)*perPage).limit(perPage);;
}
