const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const config = require('./config/cfg');

//importing Other models
const Internship = require('./models/internship');
const User = require('./models/user');

const companySchema = Schema({
    isActive: Boolean,
    name: {
        type: String,
        required: true
    },
    established: {
        type: Date
    },
    branches:[{
        name: String,
        isHead: Boolean,
        address: String
    }],
    admins: [{type: Schema.Types.ObjectId, ref: 'User'}],
    logoURL: String,
    phNum:{
        type: {countryCode: String, number: Number},
        required: true        //Careful for errors
    }
});

const Company = module.exports = mongoose.model(Company, companySchema);

function validateEmail(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


                                /*=====API Functions=====*/

module.exports.getCompanyById = function(id, callback){
    Company.findById(id, callback);
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

    //check if the comp id is correct 
        //yes => newAdmin.save()
            //   update company
            //   {success: true}
        //no => {success: false , err:invalid company id}
}