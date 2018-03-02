const express = require('express');
const path = require('path');
const router = express.Router();
const jwt = require('jsonwebtoken');
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
//models
const User = require('../models/user');
const Sitelink = require('../models/sitelink');
//config
const config = require('../config/cfg');

//setting up AWS authentication and S3
aws.config.update(config.awsAuthObj);
const s3 = new aws.S3();

//multer setup
const uploadDisplayPic = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'piitscrm',
        acl: 'public-read',
        key: function (req, file, cb) {
          cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
        }
    }),
    fileFilter: function (req, file, cb){
      const filetypes = /jpeg|jpg|png|gif/;
      const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
      const mimetype = filetypes.test(file.mimetype);
      if(mimetype && extname){
        return cb(null,true);
      } else {
        cb('Error: Please select an Image!');
      }
    }
}).single('displayPicture');

//API routes for User
router.post('/register', (req, res, next)=>{
    let newUser = new User({
        isActive: true,
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        DOB: req.body.DOB,
        phNum: { countryCode: req.body.countryCode, number: req.body.number},
        access: 0
    });
    User.addUser(newUser, (err, user)=>{
        if(err) return res.json({success: false, message: "Failed to register the User   "+ err});
        else res.json({success: true, message: "User registered successfully"});
    });
});

router.post('/authenticate', (req, res, next)=>{
    const email = req.body.email;
    const password = req.body.password;

    User.getUserByEmail(email,(err, user)=>{
        if(err) throw err;
        if(!user) return res.json({success: false, message:'email address is not registered with us'});
        User.comparePasswords(password, user.password, (err, isMatch)=>{
            if(err) throw err;
            if(!isMatch) return res.json({success:false, message:'Wrong password'});
            const token = jwt.sign(user.toJSON(), config.secret, {expiresIn: 604800});   //create token with 1 week validity
            res.json({
                success: true,
                token: token
            });
        })
    })
});

router.get('/profile', (req, res, next)=>{
    let token = req.headers['x-access-token'];
    User.validateToken(token, (err, serverStatus, decoded)=>{
        if(err) return res.status(serverStatus).json({ success: false, message: err });
        User.getUserById(decoded._id, (err, user)=>{
            res.status(serverStatus).json({ success: true, profileData: user });
        });
    });
});

router.delete('/delete', (req, res, next)=>{
    let token = req.headers['x-access-token'];
    User.validateToken(token, (err, serverStatus, decoded)=>{
        if(err) return res.status(serverStatus).json({ success: false, message: err });
        User.deleteUserById(decoded._id, (err, user)=>{
            if (err) throw err;
            res.status(serverStatus).json({ success: true, message: "User deleted successfully" });
        });        
    });
});

router.post('/requestPasswordReset', (req, res, next)=>{
    User.setupPasswordReset(req.body.email, (err)=>{
        if(err) return res.json({success: false, message: err});
        return res.json({success: true, message: 'Password reset emil sent'});
    });
});

router.post('/requestEmailVerification', (req, res, next)=>{
    let token = req.headers['x-access-token'];
    User.validateToken(token, (err, serverStatus, decoded)=>{
        if(err) return res.status(serverStatus).json({ success: false, message: err });
        User.setupEmailVerification(req.body.email, (err)=>{
            if(err) return res.json({success: false, message: err});
            return res.json({success: true, message: 'Password reset email sent'});
        });
    });
});

//on page load validate the site link and its expiry 
router.post('/validateSitelink:id', (req, res, next)=>{
    Sitelink.validateSitelink(req.params.id, (err)=>{
        if(err) return res.json({success: false, msg: err});
        res.json({success:true, msg: 'verified link'});
    });
});

router.post('/resetPassword', (req, res, next)=>{
    Sitelink.deleteSitelinks(user.email, 'passwordReset', (err)=>{
        if(err) throw err;
        User.setPassword(req.body.userId, req.body.newPass, (err, user)=>{
            if(err) return res.json({success: false, message: "Failed to change the Password"});
           res.json({success: true, message: "Password changed successfully"});
        });
    });
});

router.post('/changePassword', (req, res, next)=>{
    let token = req.headers['x-access-token'];
    User.validateToken(token, (err, serverStatus, decoded)=>{
        if(err) return res.status(serverStatus).json({ success: false, message: err });
        User.comparePassword(password, user.password, (err, isMatch)=>{
            if(err) throw err;
            if(!isMatch) return res.json({success:false, message:'Wrong current password'});
            User.setPassword(decoded._id, req.body.newPass, (err, user)=>{
                if(err) throw err;
                res.json({success: true, message: "Password changed successfully"});
            });
        });
    });
});

router.post('/initPassword', (req, res, next)=>{
    User.setPassword(req.body.uId, req.body.newPass, (err, user)=>{
        if(err) return res.json({success: false, message: "Failed to change the Password"});
        markEmailVerified(user.email);      //verified because they came from email invitation
        Sitelink.deleteSitelinks(user.email, 'activation', (err)=>{
            if(err) throw err;
            res.json({success: true, message: "Password changed successfully"});
        });
    });
});

router.post('/updateDisplayPic', (req, res, next)=>{
    let token = req.headers['x-access-token'];
    User.validateToken(token, (err, serverStatus, decoded)=>{
        if(err) return res.status(serverStatus).json({ success: false, message: err });
        User.getDP(decoded._id, (err, DP) => {
            if(err) return res.json({success: false, message: err});
            if(DP.key){              //if present, delete current DP from AWS S3 
                s3.deleteObject({bucket: 'piitscrm', key:DP.key}, (err) => {
                    if(err) return res.json({success: false, message: err});
                });
            }
            uploadDisplayPic(req, res, next, (err) => {
                if(err) return res.json({success: false, message: err});
                User.updateDisplayPicture(decoded._id, req.file.key, req.file.location, (err) => {
                    if(err) return res.json({success: false, message: err});
                    res.json({success: false, message: 'display picture updated'});
                });
            });
        });
    });
});

module.exports = router;