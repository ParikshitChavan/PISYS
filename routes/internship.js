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

router.get('/internship:id', (req, res, next)=>{
    let token = req.headers['x-access-token'];
    User.validateToken(token, (err, serverStatus, decoded)=>{
        if(err) return res.status(serverStatus).json({ success: false, message: err });
        Intership.getIntershipDetails(req.params.id, decoded.access, (err, internship)=>{
            if(err) throw err;
            res.json(internship);
        });
    });
});

/*
router.delete('/delete:id', (req, res, next)=>{
    res.send("Deleting an internship");
});*/

router.post('/updateCandidateWeeklyReport', (req, res, next)=>{
    
});

router.post('/updateCandidateWeeklyReport', (req, res, next)=>{
    
});

router.post('/updateWeeklyReportComment',(req, res, next)=>{
    
});

router.delete('/deleteWeeklyReportComment',(req, res, next)=>{
    
});

router.post('/updateCandidateFeedback',(req, res, next)=>{
    
});

router.post('/updateCompanyFeedback',(req, res, next)=>{
    
});

router.post('/updateFeedbackComment',(req, res, next)=>{
    
});

router.delete('/deleteFeedbackComment',(req, res, next)=>{
    
});

router.post('/updateOfferLetter',(req, res, next)=>{
    
});

router.post('/updateAcceptanceLetter',(req, res, next)=>{
    
});

router.post('/updateCandidateValuation',(req, res, next)=>{
    
});

router.post('/updateAccommodationDetails',(req, res, next)=>{
    
});

router.post('/updateSuicaDetails',(req, res, next)=>{
    
});

router.post('/updateWifiDetails',(req, res, next)=>{
    
});

router.post('/updatePaymentDetails',(req, res, next)=>{
    
});

router.delete('/deletePayment',(req, res, next)=>{
    
});

module.exports = router;