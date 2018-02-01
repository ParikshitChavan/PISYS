//API routes for Willings members
const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const Member = require('./models/member');

//API routes for candidate
router.post('/register', (req, res, next)=>{
    res.send("Register a new Member");
});

router.get('/login', (req, res, next)=>{
    res.send("on candidate Login page");
});

router.get('/profile', (req, res, next)=>{
    res.send("on candidate Profile page");
});

router.post('/authenticate', (req, res, next)=>{
    res.send("on candidate Authentication page");
});

router.delete('/delete', (req, res, next)=>{
    res.send("Deleting a Willings Member");
});

module.exports = router;