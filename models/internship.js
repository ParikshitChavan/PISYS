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
    supervisor: { type: Schema.Types.ObjectId, ref: 'User'},
    location: String,   //Copy Company branch location here...!
    description: String,
    candidate: {type: Schema.Types.ObjectId, ref: 'User'},
    company: {type: Schema.Types.ObjectId, ref: 'Company'},
    accommodation: {
        address: String,
        moveIn: Date,
        moveOut: Date,
        agency: {
            name: String,
            email: String,
            phNum: {countryCode: String, number: Number}
        }
    },
    payments: [{ date: Date, amount: Number }],
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
        sReport: {body:String, updated: {type: Date, default: Date.now}},
        cReport: {body:String, updated: {type: Date, default: Date.now}},
        comments: [{
                body:String,
                by:{type:Schema.Types.ObjectId, ref: 'User'},           //Only WL members allowed to comment for now 
                updated: {type: Date, default: Date.now}
            }],
        week:{startDate: Date, endDate: Date}
    }],
    valuation: String,
    jobOffer: {
        offered: {status: Boolean, on: Date, file: String},
        accepted: {status: Boolean, on: Date, file: String}
    }
});

const Internship = module.exports = mongoose.model(Internship, internshipSchema);

                                /*=====API Functions=====*/

module.exports.getInternshipById = function(id, callback){
    Internship.findById(id, callback);
}