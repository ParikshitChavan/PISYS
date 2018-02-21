const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('./models/user');
const Sitelink = require('./models/sitelink');
const config = require('./config/database');

//API routes for User

router.post('/register', (req, res, next)=>{
    let newUser = new User({
        isActive: True,
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        DOB: req.body.DOB,
        phNum: { countryCode: req.body.countryCode, number: req.body.number},
        displayPic: 'defaultURL'
    });
    User.addUser(newUser, (err, user)=>{
        if(err) return res.json({success: false, message: "Failed to register the User"});
        else res.json({success: true, message: "User registered successfully"});
    });
});

router.post('/authenticate', (req, res, next)=>{
    const email = req.body.email;
    const password = req.body.password;

    User.getUserByEmail(email,(err, user)=>{
        if(err) throw err;
        if(!user) return res.json({success: false, message:'email address is not registered with us'});
        User.comparePassword(password, user.password, (err, isMatch)=>{
            if(err) throw err;
            if(!isMatch) return res.json({success:false, message:'Wrong password'});
            const token = jwt.sign(user.toJSON(), config.secret, {expiresIn: 604800});   //create token with 1 week validity
            res.json({
                success: true,
                token: token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    access: user.access
                }
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

module.exports = router;