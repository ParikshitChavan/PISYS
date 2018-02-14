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

                                /*=====API Functions=====*/

module.exports.getCompanyById = function(id, callback){
    Company.findById(id, callback);
}

module.exports.addCompany = function(newCompany, callback){
    let newAdmin = newCompany.admin;
    User.addUser(newAdmin, (err, admin)=>{
        if(err) throw err;
       //save company with  admin _id reference
    });
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