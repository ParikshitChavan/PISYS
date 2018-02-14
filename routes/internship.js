//API routs for the candidate

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const Intership = require('./models/intership');
const User = require('./models/user');              //To use authentication functions

//API routes for candidate
router.post('/init', (req, res, next)=>{
    res.send("Registering a new Intership");
});

router.get('/internship', (req, res, next)=>{
    res.send("Getting Intership details");
});

router.delete('/delete:id', (req, res, next)=>{
    res.send("Deleting an internship");
});

router.post('/wreptcandi', (req, res, next)=>{
    res.send("Updating a report by candidate");
});

router.put('/wreptcandi', (req, res, next)=>{
    res.send("writing a new weekly report by candidate");
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

module.exports = router;