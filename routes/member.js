//API routes for Willings members
const express = require('express');
const router = express.Router();

//API routes for candidate
router.post('/register', (req, res, next)=>{
    res.send("on candidate Registration page");
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