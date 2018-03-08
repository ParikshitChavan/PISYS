const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/cfg');
const mailer = require('../helpers/mailer');

const Schema = mongoose.Schema;

//importing sub models
const Company = require('../models/company');
const User = require('../models/user');

const internshipSchema = Schema({
    active: Boolean,
    project: String,
    designation: String,
    supervisors: [{ type: Schema.Types.ObjectId, ref: 'User'}],
    location: String,   //Copy Company branch location here...!
    description: String,
    candidate: {type: Schema.Types.ObjectId, ref: 'User'},
    company: {type: Schema.Types.ObjectId, ref: 'Company'},
    accommodation: {
        cost: Number,
        address: String,
        moveIn: Date,
        moveOut: Date,
        agency: {
            name: String,
            email: String,
            phNum: {countryCode: String, number: Number}
        }
    },
    payments: [{ amount: Number, date: Date, acptd: Boolean}],
    suica: {
        cardNo: Number,
        line: String,
        from: String,
        to: String,
        name: String,
        issued: Date,
        expiry: Date,
        acptd: Boolean
    },
    wifi: {
        cost: Number,
        agency: {
            name: String,
            email: String,
            phNum: {countryCode: String, number: Number}
        },
        startDate: Date,
        returnDate: Date,
        details: String,
        acptd: Boolean
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type:Date,
        required: true
    },
    wReports: [{
        sReport: {body:String, updated: Date},      //student report
        cReport: {body:String, updated: Date},      //company report not used as of now as we do the hearing
        comments: [{
                body:String,
                by:{type:Schema.Types.ObjectId, ref: 'User'},           //Only WL members allowed to comment for now 
                updated: Date
            }],
        week:{startDate: Date, endDate: Date}
    }],
    hearingRepts:[{
        rept: String,
        by:{type:Schema.Types.ObjectId, ref: 'User'},
        hearingOn: Date,
        updated: Date
    }],
    valuation: String,
    jobOffer: {
        offered: {status: Boolean, on: Date, file: { name: String, key: String, } },
        accepted: {status: Boolean, on: Date, file: { name: String, key: String, } }
    },
    feedbacks:{
        sFeedback: {body: String, updated: Date},
        cFeedback: {body: String, updated: Date},
        comments: [{
            body:String,
            by:{type:Schema.Types.ObjectId, ref: 'User'},           //Only WL members allowed to comment
            updated: Date
        }]
    }
});

const Internship = module.exports = mongoose.model('Internship', internshipSchema);

function validateEmail(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function isValidCandidate(internshipId, candidateId, callback){
    Internship.findById(internshipId, 'candidate', { lean: true }, (err, internship)=>{
        if(err) return callback(err, null);
        if(internship.candidate == candidateId) return callback(null, true);
        callback('Not authorised to access this Internship', false);
    });
}

function isValidAdmin(internshipId, supervisorId, callback){
    Internship.findById(internshipId, 'supervisors', { lean: true }, (err, internship)=>{
        if(err) return callback(err, null);
        if(internship.supervisors.includes(supervisorId)) return callback(null, true);
        callback('Not authorised to access this Internship', false);
    });
}

                                /*=====API Functions=====*/

module.exports.getInternshipDetails = function(id, userId, access, callback){
    switch(access){
        case 2: {
            isValidCandidate(id, userId, (err, isValid)=>{
                if(err) return callback(err, null);
                Internship.findById(id).lean()
                .populate({path: 'supervisors', select: '_id name email displayPic'})
                .populate({path: 'candidate', select: '_id name email displayPic'})
                .populate({path: 'company', select: '_id name email displayPic'})
                .populate({path:'wReports.comments.by', select: '_id name email displayPic'})
                .exec(callback);
            });
            break;
        }
        case 1: {
            isValidAdmin(id, userId, (err, isValid)=>{
                if(err) return callback(err, null);
                Internship.findById(id).select('-payments -suica -wifi -accommodation.cost -wReports.sReport -wReports.comments').lean()
                .populate({path: 'supervisors', select: '_id name email displayPic'})
                .populate({path: 'candidate', select: '_id name email displayPic'})
                .populate({path: 'company', select: '_id name email displayPic'})
                .populate({path:'wReports.comments.by', select: '_id name email displayPic'})
                .exec(callback);
            });
            break;
        }
        case 0: {
            Internship.findById(id).select('-wReports.cReport -wReports.comments -valuation -accommodation.cost -wifi.cost').lean()
            .populate({path: 'supervisors', select: '_id name email displayPic'})
            .populate({path: 'candidate', select: '_id name email displayPic'})
            .populate({path: 'company', select: '_id name email displayPic'})
            .populate({path:'wReports.comments.by', select: '_id name email displayPic'})
            .exec(callback);
            break;
        }
    }
}

//candidate
module.exports.upsertSReport = function(internshipId, userId, week, body, callback){
    isValidCandidate(internshipId, userId, (err, isValid)=>{
        if(err) return callback(err);
        Internship.findById(internshipId, 'wReports', (err, internship)=>{
            if(err) return callback(err);
            internship.wReports[week-1].sReport = {body: body, updated: new Date()};
            internship.save(callback);
        });
    });
}

module.exports.getAcceptanceLetter = function(internshipId, userId, callback){
    isValidCandidate(internshipId, userId, (err, isValid)=>{
        if(err) return callback(err);
        Internship.findById(internshipId, 'jobOffer', { lean: true }, (err, internship) => {
            if(err) return callback(err, null);
            return callback( null, internship.jobOffer.accepted.file);
        });
    });
}

module.exports.uploadAcceptanceLetter = function(internshipId, originalName, awsKey, callback){
    isValidCandidate(internshipId, userId, (err, isValid)=>{
        if(err) return callback(err);
        Internship.findById(internshipId, 'jobOffer', (err, internship)=>{
            if(err) return callback(err);
            internship.jobOffer.accepted = {status: true, on: new Date(), file:  { name: originalName, key: awsKey }};
            internship.save(callback);
        });
    });
}

module.exports.upsertSFeedback = function(internshipId, userId, body, callback){
    isValidCandidate(internshipId, userId, (err, isValid)=>{
        if(err) return callback(err);
        Internship.findById(internshipId, (err, internship)=>{
            if(err) return callback(err);
            internship.feedbacks.sFeedback = {body: body, updated: new Date()};
            internship.save(callback);
        });
    });
}

//company admin
module.exports.upsertCReport = function(internshipId, userId, week, body, callback){
    isValidAdmin(internshipId, userId, (err, isValid)=>{
        if(err) return callback(err);
        Internship.findById(internshipId, 'wReports', (err, internship)=>{
            if(err) throw err;
            internship.wReports[week-1].cReport = {body: body, updated: new Date()};
            internship.save(callback);
        });
    });
}

module.exports.upsertValuation = function(internshipId, userId, valuation, callback){
    isValidAdmin(internshipId, userId, (err, isValid)=>{
        if(err) return callback(err);
        Internship.findByIdAndUpdate(internshipId, {valuation: valuation}, {upsert: true}, callback);
    });
}

module.exports.getOfferLetter = function(internshipId, userId, callback){
    isValidAdmin(internshipId, userId, (err, isValid)=>{
        if(err) return callback(err, null);
        Internship.findById(internshipId, 'jobOffer', { lean: true }, (err, internship) => {
            if(err) return callback(err);
            return callback(null, internship.jobOffer.offered.file);
        });
    });
}

module.exports.uploadOfferLetter = function(internshipId, userId, originalName, awsKey, callback){
    isValidAdmin(internshipId, userId, (err, isValid)=>{
        if(err) return callback(err);
        Internship.findById(internshipId, (err, internship)=>{
            if(err) return callback(err);
            internship.jobOffer.offered = {status: true, on: new Date(), file: { name: originalName, key: awsKey }};
            internship.save(callback);
        });
    });
}

module.exports.upsertCFeedback = function(internshipId, userId, body, callback){
    isValidAdmin(internshipId, userId, (err, isValid)=>{
        if(err) return callback(err);
        Internship.findById(internshipId, (err, internship)=>{
            if(err) throw err;
            internship.feedbacks.cFeedback = {body: body, updated: new Date()};
            internship.save(callback);
        });
    });
}

module.exports.upsertBasicInfo = function(internshipId, userId, basicInfo, callback){
    isValidAdmin(internshipId, userId, (err, isValid)=>{
        if(err) return callback(err);
        Internship.findById(internshipId, (err, internship)=>{
            if(err) throw err;
            internship.project = basicInfo.projectName,
            internship.designation = basicInfo.designation,
            internship.supervisors = basicInfo.supervisors,
            internship.location = basicInfo.location,
            internship.description = basicInfo.description;
            internship.save((err) => {
                if(err) return callback(err);
                /*let intershipLink =
                mailer.studentNotification()*/
            });
        });
    });
}

//members only
module.exports.create = function(newInternship, callback){
    newInternship.save((err, internship)=>{
        if(err) return callback(err);
        mailer.initiateInternshipMails(intership.company, link, (err, success)=>{
            if(!success) return callback(err);
            return callback(null);
        });
    });
}

module.exports.upsertWReportComment = function(internshipId, week, commentNo, body, memberId, callback){
    Internship.findById(internshipId, 'wReports', (err, internship)=>{
        if(err) throw err;
        if(commentNo){
            internship.wReports[week-1].comments[commentNo] = {body: body, by:memberId, updated: new Date()};
        }
        else{
            internship.wReports[week-1].comments.push({body: body, by:memberId, updated: new Date()});
        }
        internship.save(callback);
    });
}

module.exports.upsertFeedbacksComment = function(internshipId, commentNo, body, memberId, callback){
    Internship.findById(internshipId, 'feedbacks', (err, internship)=>{
        if(err) throw err;
        if(commentNo){
            internship.feedbacks.comments[commentNo] = {body: body, by:memberId, updated: new Date()};
        }
        else{
            internship.feedbacks.comments.push({body: body, by:memberId, updated: new Date()});
        }
        internship.save(callback);
    });
}

module.exports.updateAccommodation = function(internshipId, accommodation, callback){
    Internship.findByIdAndUpdate(internshipId, {accommodation: accommodation}, callback);
}

module.exports.updateSuica = function(internshipId, suica, callback){
    Internship.findByIdAndUpdate(internshipId, {suica: suica}, callback);
}

module.exports.updateWifi = function(internshipId, wifi, callback){
    Internship.findByIdAndUpdate(internshipId, {wifi: wifi}, callback);
}

module.exports.upsertPayment = function(internshipId, paymentNo, amount, date, callback){
    Internship.findById(internshipId, 'payments', (err, internship)=>{
        if(err) return callback(err);
        if(paymentNo){
            internship.feedbacks.payments[paymentNo] = { amount: amount, date: date};
        }
        else{
            internship.feedbacks.payments.push({ amount: amount, date: date});
        }
        internship.save(callback);
    });
}

module.exports.deletePayment = function(internshipId, paymentNo, callback){
    Internship.findById(internshipId, 'payments', (err, internship)=>{
        if(err) return callback(err);
        internship.payments.splice(paymentNo, 1);
        internship.save(callback);
    });    
}

module.exports.deleteWReportComment = function(internshipId, week, commentNo, userId, callback){
    Internship.findById(internshipId, 'wReports', (err, internship)=>{
        if(err) return callback(err);
        if(internship.wReports[week-1].comments[commentNo].by != userId) return callback('not authorised to delete the comment')
        internship.wReports[week-1].comments.splice(commentNo, 1);
        internship.save(callback);
    });    
}

module.exports.deleteFeedbackComment = function(internshipId, commentNo, userId, callback){
    Internship.findById(internshipId, 'feedbacks', (err, internship)=>{
        if(err) throw err;
        if(internship.feedbacks.comments[commentNo].by != userId) return callback('not authorised to delete the comment');
        internship.feedbacks.comments.splice(commentNo, 1);
        internship.save(callback);
    });
}