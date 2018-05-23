const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const config = require('../config/cfg');

//importing Other models
const Internship = require('../models/internship');
const User = require('../models/user');

const companySchema = Schema({
    isActive: Boolean,
    name: { type: String, required: true },
    est: {
        type: Date
    },
    branches:[{
        name: String,
        isHead: Boolean,
        address: String
    }],
    admins: [{type: Schema.Types.ObjectId, ref: 'User'}],
    logo: { key: String, url: String },
    phNum: { type: String, required: true }
});

const Company = module.exports = mongoose.model('Company', companySchema);

function validateEmail(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


                                /*=====API Functions=====*/

module.exports.getCompanyById = function(id, callback){
    Company.findById(id, "-isActive").populate('admins', 'name email').exec(callback);
}

module.exports.getCompanyNames = function (callback){
    Company.find({ isActive: true }, "name" , callback);
}

module.exports.updateCmpInfoById = function(id, cmpInfo, callback){
    Company.findByIdAndUpdate(id,{ $set: { name: cmpInfo.name, est: cmpInfo.est, phNum: cmpInfo.phNum, branches: cmpInfo.branches }}, callback);
}

module.exports.addAdmin = function(companyId, newAdmin, callback){
    newAdmin.save((err, admin)=>{
        if (err) throw err;
        Company.findById(companyId, (err, company)=>{
            if(err) throw err;
            company.admins.push(admin._id);
            company.save(callback);
        })
    }); 
}

module.exports.getAdmins = function(companyId, callback){
    Company.findById(companyId, 'admins').lean()
    .populate({ path: 'admins', select: 'name email' })
    .exec((err, company)=>{
        if(err) return callback(err, null);
        return callback(null, company.admins);
    });
}

module.exports.getLogo = function(id, callback){
    Company.findById(id, 'logo', {lean: true}, (err, company) => {
        if(err) return callback(err, null);
        return callback(null, user.logo);
    });
}

module.exports.updateLogo = function(companyId, awsKey, awsUrl, callback){
    Company.findByIdAndUpdate(companyId, { $set: { logo: { key: awsKey, url: awsUrl } }}, callback);
}

module.exports.getSuggestions = function(searchTerm, callback){
    let query = {name: { $regex : '.*' + searchTerm + '.*', $options: 'i' }};
    Company.find(query).select('name logo').limit(10).lean().exec((err, companies)=>{
        if(err) callback(err, null);
        data = {};
        for( let company of companies){
            data[company.name] = company.logo.url
        }
        callback(null, data);
    });
}

module.exports.getCompanyIdByName = function(name, callback){
    Company.findOne({name:name}, '_id', {lean: true}, (err, company) =>{
        if(err) callback(err, null);
        callback(null, company._id);
    });
}