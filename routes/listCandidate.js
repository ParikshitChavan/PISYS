const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

//models
const User = require('../models/user');
const CvBuilder = require('../models/cvbuilder');
const ListCandidate = require('../models/listCandidate');

//config
const config = require('../config/cfg');

const validateWLMember = (req, res, next) => {
    let token = req.headers['x-access-token'];
    User.validateToken(token, (err, serverStatus, decoded)=>{
        if(err) return res.status(serverStatus).json({ success: false, message: err });
        if(decoded.access != 2) return res.status(500).json({ success: false, message: 'not authorised' });
        next();
    });
}

router.post('/createSeason', validateWLMember, (req, res) => {
    let seasonYr = req.body.year;
    User.getLastYearRegistrants(seasonYr, (err, candidates) => {              //{year, _id, skypeId}
        if(err) return res.json({success: false, error: err});
        CvBuilder.getDetailsForList(candidates, (err, entries) => {
            if(err) return res.json({success: false, error: err});
            ListCandidate.addSeason(entries, (err) => {
                if(err) return res.json({success: false, error: err});
                res.json({success: true, message: 'season created successfully'});
            });
        });
    });
});

router.post('/addCandidate', validateWLMember, (req, res) => {
    const userId = req.body.listCandidate.candidate._id;
    User.getSkypeId(userId, (err, user) => {
        if(err) return res.json({success: false, error: err});
        user['year'] = req.body.year;
        CvBuilder.getDetailsForList(user, (err, listEntry)=>{
            if(err) return res.json({success: false, error: err});
            ListCandidate.addCandidate(listEntry, (err) => {
                if(err) return res.json({success: false, error: err});
                res.json({success: true, message: 'candidate added successfully'});
            });
        });
    });
});

router.post('/removeCandidate', validateWLMember, (req, res) => {
    ListCandidate.removeCandidate(req.body.candidateId, err => {
        if(err) return res.json({success: false, error: err});
        res.json({success: true, message: 'candidate removed successfully'});
    });
});

router.post('/updateCandidate', validateWLMember, (req, res)=>{
    ListCandidate.updateCandidate(req.body.candidate, (err) => {
        if(err) return res.json({success: false, error: err});
        res.json({success: true, message: 'candidate information updated successfully'});
    });
});

router.post('/getListOfYear', validateWLMember, (req, res) => {
    let seasonYr = req.body.year;
    let data = [];
    ListCandidate.getCandidatesOfYear(seasonYr, (err, candidates) =>{
        if(err) return res.json({success: false, error: err});
        res.json({success: true, candidates: candidates});
    });
});

module.exports = router;