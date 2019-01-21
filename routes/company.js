//API routes for the Company (Company Admins info will be embedded in company document)
const express = require('express');
const router = express.Router();
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
        bucket: 'onetro',
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

router.post('/register', (req, res) => {
    Sitelink.createActivationLink(req.body.admin.adminEmail, (err, link)=>{
        if(err) throw err;
        let newAdmin = new User({
            isActive: true,
            access: 1,
            name: req.body.admin.adminName,
            email: req.body.admin.adminEmail,
            password: link,                 //save the link as the password until they use activation link to set password
            phNum: '',
            DP: {key:"", url:"https://s3-ap-northeast-1.amazonaws.com/piitscrm/noDP.png"}
        });
        newAdmin.save((err, admin)=>{                               //1.save admin
            if(err) throw err;
            let newCompany = new Company({
                isActive: true,
                name: req.body.name,
                est: Date.now(),
                address: '',
                admins: [admin._id],
                logo: {key: '', url: ''},
                phNum: req.body.phNum
            });
            newCompany.save((err, company)=>{                       //2. save company with admin
                if(err) throw err;
                User.addCompany(admin._id, company._id, (err)=>{     //3. add company to the admin account
                    if(err) throw err;
                    let recipient = {name: admin.name, email: admin.email, companyName: company.name};
                    mailer.sendActivationMail(recipient, link, (err)=>{
                        if(err) throw err;
                        return res.status(200).json({ success: true, message: "company added and activation mail is sent." });
                    });
                });
            });
        });
    });   
});

router.post('/info', (req, res, next) => {
    let token = req.headers['x-access-token'];
    User.validateToken(token, (err, serverStatus, decoded) => {
        if(err) return res.status(serverStatus).json({ success: false, message: err });
        const cmpId = req.body.companyId;
        if(cmpId == 'myCompany'){
            User.getCompany(decoded._id, (err, companyId) => {
                if (err) throw err;
                if(!companyId) return res.status(500).json({ success: false, message: "No company associated with the given user" });
                Company.getCompanyInfoById(companyId, (err, company)=>{
                    if(err) throw err;
                    return res.json({success: true , companyData: company});
                });
            });
        }
        else {
            if(decoded.access != 2) return res.json({ success: false, message: "not authorised" });
            Company.getCompanyInfoById(cmpId, (err, company) => {
                if(err) throw err;
                return res.json({success: true , companyData: company});
            });
        }
    });    
});

router.get('/companyNames', (req, res, next) => {
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

router.post('/updateInfo', (req, res) => {
    let token = req.headers['x-access-token'];
    User.validateToken(token, (err, serverStatus, decoded)=>{
        if(err) return res.status(serverStatus).json({ success: false, error: err });
        const cmpId = req.body._id;
        const companyData = {
            name:req.body.name,
            est:req.body.est,
            phNum:req.body.phNum,
            address:req.body.address,
            website: req.body.website,
            empSize: req.body.empSize
        }
        Company.updateCmpInfoById(cmpId, decoded, companyData, (err) => {
            if(err) throw err;
            res.json({success: true , message: 'Company info updated successfully'});
        });        
    });
});

//admins adding their colleagues or WL members doing it for them
router.post('/registerAdmin', (req, res) => {
    let token = req.headers['x-access-token'];
    User.validateToken(token, (err, serverStatus, decoded) => {
        if(err) return res.status(serverStatus).json({ success: false, message: err });
        const companyId = req.body.companyId;
        if(!companyId) return res.status(500).json({ success: false, message: "No company id provided" });
        if(companyId == 'myCompany'){
            let newUserAccess = 1;
            if(decoded.access == 2) newUserAccess = 2;             //request coming from willings 'my Company' page
            User.getCompanyIdAndName(decoded._id, (err, companyId, cmpName) => {
                if (err) throw err;
                if(!companyId) return res.status(500).json({ success: false, message: "No company associated with the requesting user" });
                Sitelink.createActivationLink(req.body.email, (err, link)=>{
                    if (err) throw err;
                    let newAdmin = new User({
                        isActive: true,
                        name: req.body.name,
                        email: req.body.email,
                        password: link,  //save the link as the password until they use activation link to set password
                        access: newUserAccess,
                        DP: { key: '', url: "https://s3-ap-northeast-1.amazonaws.com/piitscrm/noDP.png" },
                        company: companyId
                    });
                    Company.addAdmin(companyId, newAdmin, (err) => {
                        if (err) throw err;
                        let recipient = {name: newAdmin.name, email: newAdmin.email, companyName: cmpName};
                        mailer.sendActivationMail(recipient, link, (err) => {
                            if(err) throw err;
                            return res.json({ success: true, message: "admin added and activation mail is sent" });
                        });
                    });
                });
            });
        }
        else{
            if(decoded.access != 2) return res.json({ success: false, message: "not authorised" });
            Company.getCompanyNameById(companyId, (err, cmpName)=>{
                if(err) throw err;
                if(!cmpName) return res.status(500).json({ success: false, message: "No such company in our database" });
                Sitelink.createActivationLink(req.body.email, (err, link)=>{
                    if (err) throw err;
                    let newAdmin = new User({
                        isActive: true,
                        name: req.body.name,
                        email: req.body.email,
                        password: link,  //save the link as the password until they use activation link to set password
                        access: 1,
                        DP: { key: '', url: "https://s3-ap-northeast-1.amazonaws.com/piitscrm/noDP.png" },
                        company: companyId
                    });
                    Company.addAdmin(companyId, newAdmin, (err) => {
                        if (err) throw err;
                        let recipient = {name: newAdmin.name, email: newAdmin.email, companyName: cmpName};
                        mailer.sendActivationMail(recipient, link, (err) => {
                            if(err) throw err;
                            return res.json({ success: true, message: "admin added and activation mail is sent" });
                        });
                    });
                });
            });
        }
    });
});

router.post('/updateLogo', (req, res, next) => {
    let token = req.headers['x-access-token'];
    User.validateToken(token, (err, serverStatus, decoded) => {
        if(err) return res.status(serverStatus).json({ success: false, message: err });
        if(decoded.access == 2){
            uploadCompanyLogo(req, res, (err) => {
                if(err) return res.json({success: false, message: err});
                const companyId = req.body.companyId;
                if(!companyId) return res.json({success: false, message: 'No company associated with the user'});
                Company.getLogo(companyId, (err, logo) => {
                    if(err) return res.json({success: false, msg: err});
                    if(logo.key){        //if present, delete current logo from AWS s3 
                        s3.deleteObject({Bucket: 'onetro', Key:logo.key}, (err) => {
                            if(err) return res.json({success: false, message: err});
                        });
                    }
                    Company.updateLogo(companyId, req.file.key, req.file.location, (err) => {
                        if(err) return res.json({success: false, message: err});
                        res.json({success: true, newLink: req.file.location});
                    });
                });
            });
        }
        else if(decoded.access == 1){
            User.getCompany(decoded._id, (err, companyId) => {
                if(err) return res.json({success: false, message: err});
                if(!companyId) return res.json({success: false, message: 'No company associated with the user'});
                Company.getLogo(companyId, (err, logo) => {
                    if(err) return res.json({success: false, msg: err});
                    if(logo.key){        //if present, delete current logo from AWS s3 
                        s3.deleteObject({Bucket: 'onetro', Key:logo.key}, (err) => {
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
        }
        else res.json({success: false, error: 'unauthorised'});
        
    });
});

//deleting an admin account
router.delete('/delete', (req, res, next) => {
    res.send("Deleting an Admin");
});

router.post('/suggestions', (req, res, next) => {
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
        Company.getRecruitmentPage(companyId, decoded, (err, company, editRights) => {
            if(err) return res.json({ success: false, error: err });
            res.json({success:true, recruitmentDetails: company, editRights: editRights});
        });
    });
});

router.post('/getInternshipOpenings', (req, res)=>{
    let token = req.headers['x-access-token'];
    User.validateToken(token, (err, serverStatus, decoded) => {
        if(err) return res.status(serverStatus).json({ success: false, message: err });
        let companyId = req.body.companyId;
        Company.getInternshipOpenings(companyId, decoded, (err, openings, editRights) => {
            if(err) return res.json({success: false, error: err});
            res.json({success:true, editRights: editRights, openings: openings});
        });
    });
});

router.post('/getOpeningDetails', (req, res, next)=>{
    let token = req.headers['x-access-token'];
    User.validateToken(token, (err, serverStatus, decoded) => {
        if(err) return res.status(serverStatus).json({ success: false, message: err });
        let companyId = req.body.companyId;
        let openingId = req.body.openingId;
        Company.getOpeningDetails(companyId, decoded, openingId, (err, opening, editRights) => {
            if(err) return res.json({success: false, error:err});
            res.json({success:true, editRights: editRights,  openingDetails: opening});
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

router.get('/getAllPublicOpenings', (req, res, next)=>{
    let token = req.headers['x-access-token'];
    User.validateToken(token, (err, serverStatus, decoded) => {
        if(err) return res.status(serverStatus).json({ success: false, message: err });
        Company.getAllPublicOpenings((err, companies) => {
            if(err) return res.json({success: false, error:err});
            res.json({success:true, companies: companies});
        });
    });
});

router.post('/updateAboutUs', (req, res, next)=>{
    let token = req.headers['x-access-token'];
    User.validateToken(token, (err, serverStatus, decoded) => {
        if(err) return res.status(serverStatus).json({ success: false, message: err });
        let companyId = req.body.companyId;
        let abtUs = req.body.aboutUs;
        Company.updateAboutUs(companyId, decoded, abtUs, (err) => {
            if(err) return res.json({success: false, error:err});
            res.json({success:true, message: 'about us updated successfully'});
        });
    });
});

router.post('/deactivateAdmin', (req, res) => {
    let token = req.headers['x-access-token'];
    User.validateToken(token, (err, serverStatus, decoded) => {
        if(err) return res.status(serverStatus).json({ success: false, message: err });
        const companyId = req.body.companyId;
        const adminId = req.body.adminId;
        Company.archiveAdmin(companyId, decoded, adminId, (err, cmpData) => {
            if(err) return res.json({ success: false, error: err });
            User.archiveUser(adminId, err => {
                if(err) throw err;
                res.json({ success:true, companyData: cmpData });
            });
        });
    });
});

router.post('/restoreAdmin', (req, res) => {
    let token = req.headers['x-access-token'];
    User.validateToken(token, (err, serverStatus, decoded) => {
        if(err) return res.status(serverStatus).json({ success: false, message: err });
        const companyId = req.body.companyId;
        const adminId = req.body.adminId;
        Company.restoreAdmin(companyId, decoded, adminId, (err, cmpData) => {
            if(err) return res.json({ success: false, error: err });
            User.restoreUser(adminId, err => {
                if(err) throw err;
                res.json({ success:true, companyData: cmpData });
            });
        });
    });
});

router.post('/addShortlisted', (req, res) => {
    let token = req.headers['x-access-token'];
    User.validateToken(token, (err, serverStatus, decoded) => {
        if(err) return res.status(serverStatus).json({ success: false, message: err });
        const companyId = req.body.companyId;
        const candidateId = req.body.candidateId;
        User.isCandidate(candidateId, err =>{
            if(err) return res.json({ success: false, error: err });
            Company.addShortlisted(companyId, decoded, candidateId, (err) => {
                if(err) return res.json({ success: false, error: err });
                res.json({ success: true, message: 'Candidate shortlisted successfully.' });
            });
        });
    });
});

router.post('/removeShortlisted', (req, res) => {
    let token = req.headers['x-access-token'];
    User.validateToken(token, (err, serverStatus, decoded) => {
        if(err) return res.status(serverStatus).json({ success: false, message: err });
        const companyId = req.body.companyId;
        const candidateId = req.body.candidateId;
        Company.removeShortlisted(companyId, decoded, candidateId, (err) => {
            if(err) return res.json({ success: false, error: err });
            res.json({ success: true, message: 'Candidate removed from shortlist successfully.' });
        });
    });
});

router.post('/getShortlist', (req, res) => {
    let token = req.headers['x-access-token'];
    User.validateToken(token, (err, serverStatus, decoded) => {
        if(err) return res.status(serverStatus).json({ success: false, message: err });
        const companyId = req.body.companyId;
        Company.getShortlist(companyId, decoded, (err, shortlist) => {
            if(err) return res.json({ success: false, error: err });
            res.json({ success: true, shortlist: shortlist });
        });
    });
});

router.post('/contactCandidate', (req, res) => {
    let token = req.headers['x-access-token'];
    User.validateToken(token, (err, serverStatus, decoded) => {
        if(err) return res.status(serverStatus).json({ success: false, message: err });
        const companyId = req.body.companyId;
        const candidateId = req.body.candidateId;
        Company.getContactCandiDetails(companyId, decoded, (err, company) => {
            if(err) return res.json({ success: false, error: err });
            if(company.cntacd.indexOf(candidateId) > -1){
                return res.json({ success: false, error: 'candidate already contacted' });
            }
            User.getUserInfoById(candidateId,(err, candidate) => {
                if(err) return res.json({ success: false, error: err });
                mailer.contactCandidate(company, candidate, (err) => {
                    if(err) return res.json({ success: false, error: err });
                    Company.addContacted(companyId, candidateId, (err) => {
                        if(err) return res.json({ success: false, error: err });
                        res.json({ success: true, message: 'candidate contacted successfully.' });
                    });
                });
            });
        });
    });
});

module.exports = router;
