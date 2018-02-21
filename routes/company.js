//API routes for the Company (Company Admins info will be embedded in company document)
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const mailer = require('./helpers/mailer');

const Company = require('./models/company');
const User = require('./models/user');              //To use authentication functions
const Sitelink = require ('./models/sitelink');

router.post('/register', (req, res, next)=>{
    let token = req.headers['x-access-token'];
    User.validateToken(token, (err, serverStatus, decoded)=>{
        if(err) return res.status(serverStatus).json({ success: false, message: err });
        if(decoded.access != 2) return res.status(403).json({ success: false, message: "Not authorised" });
        Sitelink.createActivationLink(req.body.adminEmail, (err, link)=>{
            let newAdmin = new Admin({
                isActive: True,
                name: req.body.adminName,
                email: req.body.adminEmail,
                password: link,                 //save the link as the password until they use activation link to set password
                DOB: req.body.DOB,
                phNum: { countryCode: req.body.countryCode, number: req.body.number},
                displayPic: 'defaultURL'
            });
            newAdmin.save((err, admin)=>{                               //1.save admin
                if(err) throw err;
                let newCompany = new Company({
                    isActive: true,
                    name: req.body.companyName,
                    established: req.body.established,
                    branches:[{ name: req.body.branchName, isHead: true, address: req.body.companyAddress }],
                    admins: [admin._id],
                    logoURL: 'tempLogoUrl',
                    phNum: {countryCode: req.body.countryCode, number: req.body.phNumber}
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
        User.getCompany(decoded.id, (err, companyId)=>{
            if (err) throw err;
            if(!companyId) return res.status(500).json({ success: false, message: "No company associated with the given user" });
            Company.getCompanyById(companyId, (err, company)=>{
                if(err) throw err;
                res.json({success: true , companyData: company});
            });
        });
    });    
});

//admins adding their colleagues
router.post('/registerAdmin', (req, res, next)=>{
    let token = req.headers['x-access-token'];
    User.validateToken(token, (err, serverStatus, decoded)=>{
        if(err) return res.status(serverStatus).json({ success: false, message: err });
        User.getCompany(decoded.id, (err, companyId)=>{
            if (err) throw err;
            if(!companyId) return res.status(500).json({ success: false, message: "No company associated with the requesting user" });
            let newAdmin = new User({
                isActive: True,
                name: req.body.name,
                email: req.body.email,
                username: req.body.username,
                password: req.body.password,
                DOB: req.body.DOB,
                phNum: { countryCode: req.body.countryCode, number: req.body.number},
                displayPic: 'defaultURL',
                company: companyId
            });
            Company.addAdmin(companyId, newAdmin, (err, company)=>{
                if (err) throw err;
                return res.json({ success: true, message: "New admin added to the company" });
                let recipient = {name: newAdmin.name, email: newAdmin.email};
                mailer.sendActivationMail(recipient, link, (err)=>{
                    if(err) throw err;
                    return res.status(200).json({ success: true, message: "admin added and activation mail is sent" });
                });
            });
        });  
    });
})

//deleting an admin account
router.delete('/delete', (req, res, next)=>{
    res.send("Deleting an Admin");
});

module.exports = router;