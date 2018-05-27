const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/cfg');
const mailer = require('../helpers/mailer');

const Schema = mongoose.Schema;

const internshipSchema = Schema({
    active: Boolean,
    project: String,
    designation: String,
    supervisors: [{ type: Schema.Types.ObjectId, ref: 'User'}],
    location: String,   //Copy Company branch location here...!
    description: String,
    cmpGivenEmail: String,
    candidate: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    company: {type: Schema.Types.ObjectId, ref: 'Company', required: true},
    startDate: Date,
    endDate: Date,
    accommodation: {
        cost: Number,
        address: String,
        mIn: Date,              //move in date.
        mOut: Date,             //move out date.
        agency: {
            name: String,
            email: String,
            phNum: String
        },
        cmnts: String
    },
    payments: [{ amt: Number, date: Date, acptd: Boolean}],
    suica: {
        cardNo: Number,
        line: String,
        from: String,
        to: String,
        name: String,       //issuing company name
        issued: Date,
        expiry: Date,
        acptd: Boolean,
        cmnts: String
    },
    wifi: {
        cost: Number,
        agency: {
            name: String,
            email: String,
            phNum: String
        },
        sDate: Date,                    //Start Date
        rDate: Date,                    //Return Date
        cmnts: String,
        acptd: Boolean
    },
    wRepts: [{                                     //student weekely reports
        rept: {body:String, updated: Date},      //student report
        cmnts: [{
            body:String,
            by:{type:Schema.Types.ObjectId, ref: 'User'},           //Only WL members allowed to comment for now 
            updated: Date
        }],
        week:{sDate: Date, eDate: Date}         //start and end date
    }],
    herRepts:[{                             //hearing reports to be uploaded by WL members after doing hearing at the company
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

                                /*=====exported functions=====*/

module.exports.getInternshipDetails = function(id, userId, access, callback){
    switch(access){
        case 2: {
            isValidCandidate(id, userId, (err, isValid)=>{
                if(err) return callback(err, null);
                Internship.findById(id).lean()
                .populate({path: 'supervisors', select: '_id name email DP'})
                .populate({path: 'candidate', select: '_id name email DP'})
                .populate({path: 'company', select: '_id name email '})
                .populate({path:'wReports.comments.by', select: '_id name email DP'})
                .exec(callback);
            });
            break;
        }
        case 1: {
            isValidAdmin(id, userId, (err, isValid)=>{
                if(err) return callback(err, null);
                Internship.findById(id).select('-payments -suica -wifi -accommodation.cost -wRepts -herRepts').lean()
                .populate({path: 'supervisors', select: '_id name email DP'})
                .populate({path: 'candidate', select: '_id name email DP'})
                .populate({path: 'company', select: '_id name email DP'})
                .populate({path:'wReports.comments.by', select: '_id name email DP'})
                .exec(callback);
            });
            break;
        }
        case 0: {
            Internship.findById(id).select('-wReports.comments -valuation -accommodation.cost -wifi.cost -herRepts').lean()
            .populate({path: 'supervisors', select: '_id name email DP'})
            .populate({path: 'candidate', select: '_id name email DP'})
            .populate({path: 'company', select: '_id name email DP'})
            .populate({path:'wReports.comments.by', select: '_id name email DP'})
            .exec(callback);
            break;
        }
    }
}

module.exports.getInternshipsOfYear = function(year, callback){
    query = {startDate: {$gte: new Date(year, 00, 00), $lt: new Date(year, 11, 32)}};
    Internship.find(query)
    .populate({path: 'candidate', select: 'name'})
    .populate({path: 'company', select: 'name'})
    .exec(callback);
}

module.exports.upsertSReport = function(data, callback){
    isValidCandidate(internshipId, userId, (err, isValid)=>{
        if(err) return callback(err);
        Internship.findById(data.intnshpId, 'wReports', (err, internship)=>{
            if(err) return callback(err);
            if(data.index==-1){
                internship.wReports.push({
                    rept: {body: data.rept, updated: new Date()},
                    week: data.week
                });
            }
            else{
                internship.wReports[data.index].rept = {body: data.rept, updated: new Date()};
                internship.wReports[data.index].week = data.week;
            }
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

module.exports.upsertWReportComment = function(data, userId, callback){
    Internship.findById(data.id, 'wReports', (err, internship)=>{
        if(err) throw err;
        if(data.cmtIndex==-1){                  //new not update
            internship.wReports[data.reptIndex].cmnts.push({body: data.body, by:userId, updated: new Date()});
        }
        else{
            internship.wReports[data.reptIndex].cmnts[data.cmtIndex] = {body: data.body, by:userId, updated: new Date()};
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

module.exports.getAccommodation = function(intnshpId, decodedToken, callback){
    Internship.findById(intnshpId, 'supervisors candidate accommodation', { lean: true }, (err, internship)=>{
        if(err) return callback(err, null);
        requesterId = decodedToken._id;
        requesterAccess = decodedToken.access;
        if(requesterAccess == 2) return callback(null, internship.accommodation);
        if(requesterAccess == 0){
            if(requesterId == internship.candidate){
                delete internship.accommodation.cost;
                delete internship.accommodation.cmnts;
                return callback(null, internship.accommodation);
            }
            else return callback('Unauthorized', null);
        }
        if(requesterAccess == 1){
            if(internship.supervisors.includes(requesterId)){
                delete internship.accommodation.cost;
                delete internship.accommodation.cmnts;
                return callback(null, internship.accommodation);
            }
            else return callback('Unauthorized', null);
        }
    });
}

module.exports.upsertAccommodation = function(internshipId, accommodation, callback){
    Internship.findByIdAndUpdate(internshipId, {accommodation: accommodation}, { lean: true, new:true }, (err, newInternship)=>{
        if(err) return callback(err, null);
        callback(null, newInternship.accommodation);
    });
}

module.exports.getSuica = function(intnshpId, decodedToken, callback){
    requesterId = decodedToken._id;
    requesterAccess = decodedToken.access;
    Internship.findById(intnshpId, 'candidate suica', { lean: true }, (err, internship)=>{
        if(err) return callback(err, null);
        if(requesterAccess == 2) return callback(null, internship.suica);
        if(requesterId == internship.candidate){
            delete internship.suica.cmnts;
            return callback(null, internship.suica);
        }
        callback('Unauthorized', null);
    });
}

module.exports.upsertSuica = function(internshipId, suica, callback){
    Internship.findByIdAndUpdate(internshipId, {suica: suica}, { lean: true, new:true }, (err, newInternship)=>{
        if(err) return callback(err, null);
        callback(null, newInternship.suica);
    });
}

module.exports.getWiFi = function(intnshpId, decodedToken, callback){
    Internship.findById(intnshpId, 'candidate wifi', { lean: true }, (err, intnshp)=>{
        if(err) return callback(err, null); 
        if(requesterAccess == 2) return callback(null, intnshp.wifi);
        if(requesterId == internship.candidate){
            delete internship.wifi.cmnts;
            return callback(null, internship.wifi);
        }
        callback('Unauthorized', null);
    });
}

module.exports.upsertWiFi = function(internshipId, wifi, callback){
    Internship.findByIdAndUpdate(internshipId, {wifi: wifi}, { lean: true, new:true }, (err, newInternship)=>{
        if(err) return callback(err, null);
        callback(null, newInternship.wifi);
    });
}

module.exports.getPayments = function(intnshpId, decodedToken, callback){
    Internship.findById(intnshpId, 'payments', { lean: true }, (err, intnshp)=>{
        if(err) return callback(err, null);
        callback(null, intnshp.payments);
    });
}

module.exports.upsertPayment = function(internshipId, data, callback){
    Internship.findById(internshipId, 'payments', (err, internship)=>{
        if(err) return callback(err, null);
        if(data.index!=-1){
            internship.feedbacks.payments[paymentNo] = { amount: amount, date: date};
        }
        else{
            internship.feedbacks.payments.push({ amount: amount, date: date});
        }
        internship.save((err, updatedInternship)=>{
            if(err) callback(err, null);
            callback(null, updatedInternship.payments)
        });
    });
}

module.exports.deletePayment = function(internshipId, paymentNo, callback){
    Internship.findById(internshipId, 'payments', (err, internship)=>{
        if(err) return callback(err);
        internship.payments.splice(paymentNo, 1);
        internship.save(callback);
    });    
}

module.exports.markPaymentAccepted = function(internshipId, paymentNo, callback){
    Internship.findById(internshipId, 'payments', (err, internship)=>{
        if(err) return callback(err);
        internship.payments[paymentNo].acpted = true;
        internship.save(callback);
    });    
}

module.exports.deleteWReportComment = function(data, userId, callback){
    Internship.findById(data.id, 'wReports', (err, internship)=>{
        if(err) return callback(err);
        if(internship.wReports[data.reptIndex].cmnts[data.cmtIndex].by != userId) return callback('not authorised to delete the comment')
        internship.wReports[data.reptIndex].cmnts.splice(data.cmtIndex, 1);
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