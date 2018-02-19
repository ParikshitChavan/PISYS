const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('./config/cfg');
const Schema = mongoose.Schema;

//importing sub models
const Company = require('./models/company');
const User = require('./models/user');

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
    payments: [{ amount: Number, date: Date}],
    suica: {
        cardNo: Number,
        line: String,
        from: String,
        to: String,
        name: String,
        issued: Date,
        expiry: Date
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
        details: String
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
        cReport: {body:String, updated: Date},      //company report 
        comments: [{
                body:String,
                by:{type:Schema.Types.ObjectId, ref: 'User'},           //Only WL members allowed to comment for now 
                updated: Date
            }],
        week:{startDate: Date, endDate: Date}
    }],
    valuation: String,
    jobOffer: {
        offered: {status: Boolean, on: Date, file: String},
        accepted: {status: Boolean, on: Date, file: String}
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

const Internship = module.exports = mongoose.model(Internship, internshipSchema);

function validateEmail(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

                                /*=====API Functions=====*/

module.exports.getIntershipDetails = function(id, access, callback){
    switch(access){
        case 2:{
            Internship.findById(id).lean()
            .populate({path: 'supervisors', select: '_id name email displayPic'})
            .populate({path: 'candidate', select: '_id name email displayPic'})
            .populate({path: 'company', select: '_id name email displayPic'})
            .populate({path:'wReports.comments.by', select: '_id name email displayPic'})
            .exec(callback);
            break;
        }
        case 1:{
            Internship.findById(id).select('-payments -suica -wifi -accommodation.cost -wReports.sReport -wReports.comments').lean()
            .populate({path: 'supervisors', select: '_id name email displayPic'})
            .populate({path: 'candidate', select: '_id name email displayPic'})
            .populate({path: 'company', select: '_id name email displayPic'})
            .populate({path:'wReports.comments.by', select: '_id name email displayPic'})
            .exec(callback);
            break;
        }
        case 0:{
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
module.exports.upsertSReport = function(intershipId, week, body, callback){
    Internship.findById(id, 'wReports', (err, internship)=>{
        if(err) throw err;
        internship.wReports[week-1].sReport = {body: body, updated: new Date()};
        internship.save(callback);
    });
}

module.exports.uploadAcceptanceLetter = function(intershipId, file, callback){
    //rename and store the file on the server and get the fileURL
   
    Internship.findById(intershipId, (err, internship)=>{
        if(err) throw err;
        internship.jobOffer.accepted = {status: true, on: new Date(), file: fileURL};
        internship.save(callback);
    });
}

module.exports.upsertSFeedback = function(intershipId, body, callback){
    Internship.findById(id, (err, internship)=>{
        if(err) throw err;
        internship.feedbacks.sFeedback = {body: body, updated: new Date()};
        internship.save(callback);
    });
}

//company admin
module.exports.upsertCReport = function(intershipId, week, body, callback){
    Internship.findById(id, 'wReports', (err, internship)=>{
        if(err) throw err;
        internship.wReports[week-1].cReport = {body: body, updated: new Date()};
        internship.save(callback);
    });
}

module.exports.upsertValuation = function(intershipId, valuation, callback){
    Internship.findByIdAndUpdate(intershipId, {valuation: valuation}, {upsert: true}, callback);
}

module.exports.uploadOfferLetter = function(intershipId, file, callback){
    //rename and store the file on the server and get the fileURL
   
    Internship.findById(intershipId, (err, internship)=>{
        if(err) throw err;
        internship.jobOffer.offered = {status: true, on: new Date(), file: fileURL};
        internship.save(callback);
    });
}

module.exports.upsertCFeedback = function(intershipId, body, callback){
    Internship.findById(id, (err, internship)=>{
        if(err) throw err;
        internship.feedbacks.cFeedback = {body: body, updated: new Date()};
        internship.save(callback);
    });
}

//members
module.exports.upsertWReportComment = function(intershipId, week, commentNo, body, memberId, callback){
    Internship.findById(id, 'wReports', (err, internship)=>{
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

module.exports.upsertFeedbacksComment = function(intershipId, commentNo, body, memberId, callback){
    Internship.findById(id, 'feedbacks', (err, internship)=>{
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

module.exports.updateAccommodation = function(intershipId, accommodation, callback){
    Internship.findByIdAndUpdate(intershipId, {accommodation: accommodation}, callback);
}

module.exports.updateSuica = function(intershipId, suica, callback){
    Internship.findByIdAndUpdate(intershipId, {suica: suica}, callback);
}

module.exports.updateWifi = function(intershipId, wifi, callback){
    Internship.findByIdAndUpdate(intershipId, {wifi: wifi}, callback);
}

module.exports.upsertPayment = function(intershipId, paymentNo, amount, date, callback){
    Internship.findById(intershipId, 'payments', (err, internship)=>{
        if(err) throw err;
        if(paymentNo){
            internship.feedbacks.payments[paymentNo] = { amount: amount, date: date};
        }
        else{
            internship.feedbacks.payments.push({ amount: amount, date: date});
        }
        internship.save(callback);
    });
}

module.exports.deletePayment = function(intershipId, paymentNo, callback){
    Internship.findById(intershipId, 'payments', (err, internship)=>{
        if(err) throw err;
        //splice..? read about mongoose array pull 
    });    
}

module.exports.deleteWReportComment = function(intershipId, week, commentNo, callback){
    Internship.findById(intershipId, 'wReports', (err, internship)=>{
        if(err) throw err;
        
    });    
}

module.exports.deleteFeedbackComment = function(intershipId, paymentNo,commentNo, callback){
    Internship.findById(intershipId, 'feedbacks', (err, internship)=>{
        if(err) throw err;
        
    });    
}