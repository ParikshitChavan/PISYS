//API routes for the Company (Company Admins info will be embedded in compnay document)
const express = require('express');
const router = express.Router();

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

//deleting an admin account
router.delete('/delete', (req, res, next)=>{
    res.send("Deleting an Admin");
});

module.exports = router;