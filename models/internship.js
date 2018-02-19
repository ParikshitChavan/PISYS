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
        sReport: {body:String, updated: Date},
        cReport: {body:String, updated: Date},
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

function validateEmail(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

                                /*=====API Functions=====*/

module.exports.getInternshipById = function(id, callback){
    Internship.findById(id, callback);
}


/*
candidate
upsert weekly report
see/download offer letter
upload signed offer letter

supervisor
upsert weekly report
add feedback and evaluation
upsert valuation
upload offer latter
see/download signed offer letter

members
upsert and remove comment on a week
upsert and remove accommodation details
upsert and remove payment details
upsert and remove suica details
upsert and remove wifi details
*/