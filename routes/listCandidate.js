const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

//models
const User = require('../models/user');
const CvBuilder = require('../models/cvbuilder');
const ListCandidate = require('../models/listCandidate');

//config
const config = require('../config/cfg');

router.post('/addSeason', (req, res) => {
    let seasonYr = req.body.year;
    let data = [];
    User.getLastYearRegistrants((err, candidates) => {
        if(err) return res.json({success: false, error: err});
        candidates.forEach(candidate => {
            /*
            format
            the
            data(array of the data needed)
            */
        });
        ListCandidate.addSeason(seasonYr, data, (err) =>{
            if(err) return res.json({success: false, error: err});
            res.json({success: true, message: 'season created successfully'});
        });
    });
});

router.post('/addCandidate', (req, res) => {
    User.getUserById(req.body.candidateId, (err, user)=>{
        if(err) return res.json({success: false, error: err});
        CvBuilder.getDetailsForList(req.body.candidateId, (err, CV)=>{
            if(err) return res.json({success: false, error: err});
            //push into collection with year=req.body.year
        });
    });

});

router.post('/removeCandidate', (req, res) => {
    ListCandidate.removeCandidate(req.body.candidateId, err => {
        if(err) return res.json({success: false, error: err});
        res.json({success: true, message: 'candidate removed successfully'});
    });
});

router.post('/updateCandidate', (req, res)=>{
    ListCandidate.updateCandidateById(req.body.id, (err) => {
        if(err) return res.json({success: false, error: err});
        res.json({success: true, message: 'candidate removed successfully'});
    });
});