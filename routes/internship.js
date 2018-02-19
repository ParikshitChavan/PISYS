const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const mailer = require('./helpers/mailer');

const Intership = require('./models/intership');
const User = require('./models/user');              //To use token authentication functions

//API routes for Intership data
router.post('/init', (req, res, next)=>{
    newInternship = new Internship({
        candidate: req.body.candidateId,
        company: req.body.companyId,
        
    });
    //send mail to the company to inform and ask them to fill details 
});

router.get('/internship', (req, res, next)=>{
    res.send("Getting Intership details");
});

router.delete('/delete:id', (req, res, next)=>{
    res.send("Deleting an internship");
});

router.post('/wreptcandi', (req, res, next)=>{
    res.send("writing a new weekly report by candidate");
});

router.put('/wreptcandi', (req, res, next)=>{
    res.send("Updating a report by candidate");
});

router.post('/wreptcomp', (req, res, next)=>{
    res.send("writing a new weekly report by company");
});

router.put('/wreptcomp', (req, res, next)=>{
    res.send("Updaing report by company");
});


router.post('/wrept',(req, res, next)=>{
    res.send("Members commenting on a weeks reports");
});

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

module.exports = router;