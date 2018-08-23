const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

//models
const User = require('../models/user');
const CvBuilder = require('../models/cvbuilder');
const Sitelink = require('../models/sitelink');
const ListCandidate = require('../models/listCandidate');

//config
const config = require('../config/cfg');

router.post('/addSeason', (req, res) => {
    seasonYr = req.body.year;
    User.getLastYearRegistrants((err, candidates) => {
        if(err) return res.json({success: false, error: err});
        candidates.forEach(candidate => {
            
        });
    });
});

router.post('/addCandidate', (req, res) => {

});

router.post('/removeCandidate', (req, res) => {
    
});