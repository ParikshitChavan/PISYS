//API routes for the Company (Company Admins info will be embedded in company document)
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const Company = require('./models/company');
const User = require('./models/user');              //To use authentication functions

router.post('/register', (req, res, next)=>{
    res.send("Register a new Company");
});

router.get('/info', (req, res, next)=>{
    res.send("on candidate Profile page");
});

router.post('/registerAdmin', (req, res, next)=>{
    let token = req.headers['x-access-token'];
    User.validateToken(token, (err, serverStatus, decoded)=>{
        if(err) return res.status(serverStatus).json({ success: false, message: err });
        User.getCompany(decoded.id, (err, companyId)=>{
            if (err) throw err;
            if(!companyId) return res.status(500).json({ success: false, message: "No company associated with the given user" });
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
            });
        });  
    });
})

//deleting an admin account
router.delete('/delete', (req, res, next)=>{
    res.send("Deleting an Admin");
});

module.exports = router;