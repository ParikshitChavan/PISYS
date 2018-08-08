//API routes for the Company (Company Admins info will be embedded in company document)
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const mailer = require('../helpers/mailer');
//models
const Company = require('../models/company');
const User = require('../models/user');
const Sitelink = require ('../models/sitelink');
//config
const config = require('../config/cfg');

//setting up AWS authentication and S3
aws.config.update(config.awsAuthObj);
const s3 = new aws.S3();

//multer setup
const uploadCompanyLogo = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'piitscrm',
        acl: 'public-read',
        key: function (req, file, cb) {
          cb(null, file.fieldname + Date.now());
        }
    }),
    fileFilter: function (req, file, cb){
      const filetypes = /jpeg|jpg|png|gif/;
      const mimetype = filetypes.test(file.mimetype);
      if(mimetype){
        return cb(null,true);
      } else {
        cb('Error: Please select an Image!');
      }
    }
}).single('companyLogo');

router.post('/register', (req, res, next)=>{
    let token = req.headers['x-access-token'];
    User.validateToken(token, (err, serverStatus, decoded)=>{
        if(err) return res.status(serverStatus).json({ success: false, message: err });
        if(decoded.access != 2) return res.status(403).json({ success: false, message: "Not authorised" });
        Sitelink.createActivationLink(req.body.admin.adminEmail, (err, link)=>{
            if(err) throw err;
            let newAdmin = new User({
                isActive: true,
                access: 1,
                name: req.body.admin.adminName,
                email: req.body.admin.adminEmail,
                password: link,                 //save the link as the password until they use activation link to set password
                phNum: req.body.phNum,
                DP: {key:"", url:"https://s3-ap-northeast-1.amazonaws.com/piitscrm/noDP.png"}
            });
            newAdmin.save((err, admin)=>{                               //1.save admin
                if(err) throw err;
                let newCompany = new Company({
                    isActive: true,
                    name: req.body.name,
                    est: req.body.est,
                    address: req.body.address,
                    admins: [admin._id],
                    logo: {key: '', url: ''},
                    phNum: req.body.phNum
                });
                newCompany.save((err, company)=>{                       //2. save company with admin
                    if(err) throw err;
                    User.addCompany(admin._id, company._id, (err)=>{     //3. add company to the admin account
                        if(err) throw err;
                        let recipient = {name: admin.name, email: admin.email};
                        mailer.sendActivationMail(recipient, link, (err)=>{
                            if(err) throw err;
                            return res.status(200).json({ success: true, message: "company added and activation mail is sent" });
                        });
                   });
                });
            });
        });
    });    
});

router.get('/info', (req, res, next)=>{
    let token = req.headers['x-access-token'];
    User.validateToken(token, (err, serverStatus, decoded)=>{
        if(err) return res.status(serverStatus).json({ success: false, message: err });
        User.getCompany(decoded._id, (err, companyId)=>{
            if (err) throw err;
            if(!companyId) return res.status(500).json({ success: false, message: "No company associated with the given user" });
            Company.getCompanyById(companyId, (err, company)=>{
                if(err) throw err;
                res.json({success: true , companyData: company});
            });
        });
    });    
});

router.get('/companyNames', (req, res, next)=>{
    let token = req.headers['x-access-token'];
    User.validateToken(token, (err, serverStatus, decoded)=>{
        if(err) return res.status(serverStatus).json({ success: false, message: err });
        if(decoded.access!=2) return res.status(403).json({ success: false, message: "you are not authorised" });
        Company.getCompanyNames((err, companies)=>{
            if (err) throw err;
            res.json({success: true , companies: companies});
        });
    });    
});

router.post('/updateInfo', (req, res, next)=>{
    let token = req.headers['x-access-token'];
    User.validateToken(token, (err, serverStatus, decoded)=>{
        if(err) return res.status(serverStatus).json({ success: false, message: err });
        User.getCompany(decoded._id, (err, companyId)=>{
            if (err) throw err;
            if(!companyId) return res.status(500).json({ success: false, message: "No company associated with the given user" });
            const companyData = {
                name:req.body.name,
                est:req.body.est,
                phNum:req.body.phNum,
                address:req.body.address,
                website: req.body.website,
                abtUs: req.body.abtUs
            }
            Company.updateCmpInfoById(companyId, companyData,  (err)=>{
                if(err) throw err;
                res.json({success: true , message: 'Company info updated successfully'});
            });
        });
    });    
});

//admins adding their colleagues
router.post('/registerAdmin', (req, res, next) => {
    let token = req.headers['x-access-token'];
    User.validateToken(token, (err, serverStatus, decoded) => {
        if(err) return res.status(serverStatus).json({ success: false, message: err });
        User.getCompany(decoded._id, (err, companyId) => {
            if (err) throw err;
            if(!companyId) return res.status(500).json({ success: false, message: "No company associated with the requesting user" });
            Sitelink.createActivationLink(req.body.email, (err, link)=>{
                if (err) throw err;
                let newAdmin = new User({
                    isActive: true,
                    name: req.body.name,
                    email: req.body.email,
                    password: link,  //save the link as the password until they use activation link to set password
                    access: 1,
                    DP: {key:"", url:"https://s3-ap-northeast-1.amazonaws.com/piitscrm/noDP.png"},
                    company: companyId
                });
                Company.addAdmin(companyId, newAdmin, (err, company) => {
                    if (err) throw err;
                    let recipient = {name: newAdmin.name, email: newAdmin.email};
                    mailer.sendActivationMail(recipient, link, (err) => {
                        if(err) throw err;
                        return res.json({ success: true, message: "admin added and activation mail is sent" });
                    });
                });
            });
        });  
    });
});

router.post('/updateLogo', (req, res, next) => {
    let token = req.headers['x-access-token'];
    User.validateToken(token, (err, serverStatus, decoded) => {
        if(err) return res.status(serverStatus).json({ success: false, message: err });
        User.getCompany(decoded._id, (err, companyId) => {
            if(err) return res.json({success: false, message: err});
            if(!companyId) return res.json({success: false, message: 'No company associated with the user'});
            Company.getLogo(companyId, (err, logo) => {
                if(err) return res.json({success: false, msg: err});
                if(logo.key){        //if present, delete current logo from AWS s3 
                    s3.deleteObject({Bucket: 'piitscrm', Key:logo.key}, (err) => {
                        if(err) return res.json({success: false, message: err});
                    });
                }
                uploadCompanyLogo(req, res, (err) => {
                    if(err) return res.json({success: false, message: err});
                    Company.updateLogo(companyId, req.file.key, req.file.location, (err) => {
                        if(err) return res.json({success: false, message: err});
                        res.json({success: true, newLink: req.file.location});
                    });
                });
            });
        });
    });
});

//deleting an admin account
router.delete('/delete', (req, res, next)=>{
    res.send("Deleting an Admin");
});

router.post('/suggestions', (req, res, next)=>{
    let token = req.headers['x-access-token'];
    User.validateToken(token, (err, serverStatus, decoded) => {
        if(err) return res.status(serverStatus).json({ success: false, message: err });
        if(decoded.access!=2) return res.status(401).json({ success: false, message: 'Unauthorised' });
        let searchTerm = req.body.searchTerm;
        Company.getSuggestions(searchTerm, (err, suggestions) => {
            if(err) return res.json({success: false, message:err});
            res.json({success:true, data: suggestions});
        });
    });
});

router.post('/getRecruitmentPage', (req, res)=>{
    let token = req.headers['x-access-token'];
    User.validateToken(token, (err, serverStatus, decoded) => {
        if(err) return res.status(serverStatus).json({ success: false, message: err });
        let companyId = req.body.companyId;
        Company.getRecruitmentPage(companyId, (err, company) => {
            if(err) return res.json({ success: false, error: err });
            res.json({success:true, recruitmentDetails: company});
        });
    });
});

router.post('/getInternshipOpenings', (req, res)=>{
    let token = req.headers['x-access-token'];
    User.validateToken(token, (err, serverStatus, decoded) => {
        if(err) return res.status(serverStatus).json({ success: false, message: err });
        let companyId = req.body.companyId;
        Company.getInternshipOpenings(companyId, decoded, (err, openings, editWrites) => {
            if(err) return res.json({success: false, error: err});
            res.json({success:true, editWrites: editWrites, openings: openings});
        });
    });
});

router.post('/getOpeningDetails', (req, res, next)=>{
    let token = req.headers['x-access-token'];
    User.validateToken(token, (err, serverStatus, decoded) => {
        if(err) return res.status(serverStatus).json({ success: false, message: err });
        let companyId = req.body.companyId;
        let openingId = req.body.openingId;
        Company.getOpeningDetails(companyId, decoded, openingId, (err, opening, editWrites) => {
            if(err) return res.json({success: false, error:err});
            res.json({success:true, editWrites: editWrites,  openingDetails: opening});
        });
    });
});

router.post('/upsertOpening', (req, res, next)=>{
    let token = req.headers['x-access-token'];
    User.validateToken(token, (err, serverStatus, decoded) => {
        if(err) return res.status(serverStatus).json({ success: false, message: err });
        let companyId = req.body.companyId;
        let action = req.body.action;
        let opening = req.body.opening;
        Company.upsertOpening(companyId, decoded, action, opening, (err) => {
            if(err) return res.json({success: false, error:err});
            res.json({success:true});
        });
    });
});

router.post('/addOpeningLike', (req, res, next)=>{
    let token = req.headers['x-access-token'];
    User.validateToken(token, (err, serverStatus, decoded) => {
        if(err) return res.status(serverStatus).json({ success: false, message: err });
        let companyId = req.body.companyId;
        let openingId = req.body.openingId;
        let userId = decoded._id;
        User.addOpeningLike(companyId, openingId, userId, (err, maxLimit) => {
            if(err) return res.json({ success: false, error:err });
            if(maxLimit) return res.json({ success: true, atMaxLimit: maxLimit });        // maxLimit 'true' = cant like anymore
            Company.addOpeningLiker(companyId, openingId, userId, err => {
                if(err) return res.json({ success: false, error: err });
                res.json({ success: true, atMaxLimit: false });
            });
        });
    });
});

router.post('/removeOpeningLike', (req, res, next)=>{
    let token = req.headers['x-access-token'];
    User.validateToken(token, (err, serverStatus, decoded) => {
        if(err) return res.status(serverStatus).json({ success: false, message: err });
        let companyId = req.body.companyId;
        let openingId = req.body.openingId;
        let userId = decoded._id;
        User.removeOpeningLike(companyId, openingId, userId, (err) => {
            if(err) return res.json({success: false, error:err});
            Company.removeOpeningLiker(companyId, openingId, userId, err => {
                if(err) return res.json({ success: false, error: err });
                res.json({ success: true });
            });
        });
    });
});

module.exports = router;