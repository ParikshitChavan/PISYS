const express = require('express');
const path = require('path');
const router = express.Router();
const jwt = require('jsonwebtoken');
const mailer = require('./helpers/mailer');
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
//models
const Internship = require('./models/internship');
const User = require('./models/user');              
//config
const config = require('./config/cfg');

//setting up AWS authentication and S3
aws.config.update(config.awsAuthObj);
const s3 = new aws.S3();

//multer setup for offer letter
const uploadS3OfferLetter = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'piitscrm',
        /*acl: 'public-read',*/
        key: function (req, file, cb) {
          cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
        }
    }),
    fileFilter: function (req, file, cb){
      const filetypes = /pdf|docx|doc|/;
      const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
      const mimetype = filetypes.test(file.mimetype);
      if(mimetype && extname){
        return cb(null,true);
      } else {
        cb('Error: Please select an Image!');
      }
    }
}).single('offerLetter');

//multer setup for acceptance letter
const uploadS3AcceptanceLetter = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'piitscrm',
        /*acl: 'public-read',*/
        key: function (req, file, cb) {
          cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
        }
    }),
    fileFilter: function (req, file, cb){
      const filetypes = /pdf|docx|doc|/;
      const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
      const mimetype = filetypes.test(file.mimetype);
      if(mimetype && extname){
        return cb(null,true);
      } else {
        cb('Error: Please select an Image!');
      }
    }
}).single('acceptanceLetter');

//API routes for Internship data
router.post('/init', (req, res, next)=>{
    let token = req.headers['x-access-token'];
    User.validateToken(token, (err, serverStatus, decoded)=>{
        if(err) return res.status(serverStatus).json({ success: false, message: err });
        if(decoded.access!=2) return res.status(401).json({ success: false, message: 'Unauthorised' });
        newInternship = new Internship({
            candidate: req.body.candidateId,
            company: req.body.companyId,
        });
        Internship.create((err)=>{
            if(err) return res.json({success: false, message:err});
            res.json({success:true, message: 'Internship created successfully and mail sent to company'});
        });
    });
});

router.post('/upsertBasicInfo/:id', (req, res, next)=>{
    let token = req.headers['x-access-token'];
    User.validateToken(token, (err, serverStatus, decoded)=>{
        if(err) return res.status(serverStatus).json({ success: false, message: err });
        let basicInfo = {
            project: req.body.projectName,
            designation: req.body.designation,
            supervisors: req.body.supervisors,
            location: req.body.location,
            description: req.body.description
        }
        Internship.upsertBasicInfo(req.params.id, decoded._id, basicInfo, (err)=>{
            if(err) throw err;
            res.json({success:true, message: 'Internship basic information updated successfully'});
        });
    });
});

router.get('/info/:id', (req, res, next)=>{
    let token = req.headers['x-access-token'];
    User.validateToken(token, (err, serverStatus, decoded)=>{
        if(err) return res.status(serverStatus).json({ success: false, message: err });
        Internship.getInternshipDetails(req.params.id, decoded._id, decoded.access, (err, internship)=>{
            if(err) throw err;
            res.json(internship);
        });
    });
});

/*
router.delete('/delete/:id', (req, res, next)=>{
    res.send("Deleting an internship");
});*/

router.post('/updateCandidateWeeklyReport/:id', (req, res, next)=>{
    let token = req.headers['x-access-token'];
    User.validateToken(token, (err, serverStatus, decoded)=>{
        if(err) return res.status(serverStatus).json({ success: false, message: err });
        Internship.upsertSReport(req.params.id, decoded._id, (err)=>{
            if(err) throw err;
            res.json({success: true, msg: 'report updated successfully'});
        });
    });
});

router.post('/updateCompanyWeeklyReport/:id', (req, res, next)=>{
    let token = req.headers['x-access-token'];
    User.validateToken(token, (err, serverStatus, decoded)=>{
        if(err) return res.status(serverStatus).json({ success: false, message: err });
        Internship.upsertCReport(req.params.id, decoded._id, (err)=>{
            if(err) throw err;
            res.json({success: true, msg: 'report updated successfully'});
        });
    });
});

router.post('/updateWeeklyReportComment/:id',(req, res, next)=>{
    let token = req.headers['x-access-token'];
    User.validateToken(token, (err, serverStatus, decoded)=>{
        if(err) return res.status(serverStatus).json({ success: false, message: err });
        if(decoded.access!=2) return res.status(401).json({ success: false, message: 'Unauthorised' });
        let commentNumber = req.body.commentNumber ? req.body.commentNumber: null;
        Internship.upsertWReportComment(req.params.id, req.body.week, commentNumber, req.body.comment, decoded._id, (err)=>{
            if(err) throw err;
            res.json({success: true, msg: 'report updated successfully'});
        });
    });
});

router.delete('/deleteWeeklyReportComment/:id',(req, res, next)=>{
    let token = req.headers['x-access-token'];
    User.validateToken(token, (err, serverStatus, decoded)=>{
        if(err) return res.status(serverStatus).json({ success: false, message: err });
        if(decoded.access!=2) return res.status(401).json({ success: false, message: 'Unauthorised' });
        Internship.deleteWReportComment(req.params.id, req.body.week, commentNumber, decoded._id, (err)=>{
            if(err) throw err;
            res.json({success: true, msg: 'report deleted successfully'});
        });
    });
});

router.post('/updateCandidateFeedback/:id',(req, res, next)=>{
    let token = req.headers['x-access-token'];
    User.validateToken(token, (err, serverStatus, decoded)=>{
        if(err) return res.status(serverStatus).json({ success: false, message: err });
        Internship.upsertSFeedback(req.params.id, decoded._id, feedback, (err)=>{
            if(err) throw err;
            res.json({success: true, msg: 'feedback updated successfully'});
        });
    });
});

router.post('/updateCompanyFeedback/:id',(req, res, next)=>{
    let token = req.headers['x-access-token'];
    User.validateToken(token, (err, serverStatus, decoded)=>{
        if(err) return res.status(serverStatus).json({ success: false, message: err });
        Internship.upsertCFeedback(req.params.id, decoded._id, feedback, (err)=>{
            if(err) throw err;
            res.json({ success: true, msg: 'feedback updated successfully' });
        });
    });
});

router.post('/updateFeedbackComment/:id',(req, res, next)=>{
    let token = req.headers['x-access-token'];
    User.validateToken(token, (err, serverStatus, decoded)=>{
        if(err) return res.status(serverStatus).json({ success: false, message: err });
        if(decoded.access!=2) return res.status(401).json({ success: false, message: 'Unauthorised' });
        let commentNumber = req.body.commentNumber ? req.body.commentNumber: null;
        Internship.upsertFeedbackComment(req.params.id, commentNumber, req.body.comment, decoded._id, (err)=>{
            if(err) throw err;
            res.json({success: true, msg: 'Comment updated successfully'});
        });
    });
});

router.delete('/deleteFeedbackComment/:id',(req, res, next)=>{
    let token = req.headers['x-access-token'];
    User.validateToken(token, (err, serverStatus, decoded)=>{
        if(err) return res.status(serverStatus).json({ success: false, message: err });
        if(decoded.access!=2) return res.status(401).json({ success: false, message: 'Unauthorised' });
        Internship.deleteFeedbackComment(req.params.id, commentNumber, decoded._id, (err)=>{
            if(err) throw err;
            res.json({success: true, msg: 'Comment deleted successfully'});
        });
    });
});

router.post('/updateOfferLetter/:id',(req, res, next)=>{
    let token = req.headers['x-access-token'];
    User.validateToken(token, (err, serverStatus, decoded)=>{
        if(err) return res.status(serverStatus).json({ success: false, message: err });
        Internship.getOfferLetter(req.params.id, decoded._id, (err, file) => {
            if(err) return res.json({success: false, msg: err});
            if(file.key){        //if present, delete the current file from AWS S3
                s3.deleteObject({bucket: 'piitscrm', key: file.key}, (err) => {
                    if(err) return res.json({success: false, msg: err});
                });
            }
            uploadS3OfferLetter(req, res, next, (err) => {
                if(err) return res.json({success: false, msg: err});
                Internship.uploadOfferLetter(req.params.id, decoded._id, req.file.originalname, req.file.key, (err)=>{
                    if(err) return res.json({success: false, msg: err});
                    res.json({success: true, msg: 'Comment deleted successfully'});
                });
            });
        });
    });
});

router.get('/downloadOfferLetter/:id', (req, res, next) => {
    let token = req.headers['x-access-token'];
    User.validateToken(token, (err, serverStatus, decoded) => {
        if(err) return res.status(serverStatus).json({ success: false, message: err });
        Internship.getOfferLetter(req.params.id, decoded._id, (err, file) => {
            if(err) return res.json({success: false, msg: err});
            if(!file.key) return res.json({success: false, msg: 'no file present'});
            res.attachment(fileKey);
            let fileStream = s3.getObject({bucket: 'piitscrm', key: file.key}).createReadStream();
            fileStream.pipe(res);
        });
    });
});

router.post('/updateAcceptanceLetter/:id',(req, res, next)=>{
    let token = req.headers['x-access-token'];
    User.validateToken(token, (err, serverStatus, decoded) => {
        if(err) return res.status(serverStatus).json({ success: false, message: err });
        Internship.getAcceptanceLetter(req.params.id, decoded._id, (err, file) => {
            if(err) return res.json({success: false, msg: err});
            if(file.key){        //if present, delete the current file from AWS S3
                s3.deleteObject({bucket: 'piitscrm', key: file.key}, (err) => {
                    if(err) return res.json({success: false, msg: err});
                });
            }
            uploadS3AcceptanceLetter(req, res, next, (err) => {
                if(err) return res.json({success: false, msg: err});
                Internship.uploadAcceptanceLetter(req.params.id, decoded._id, req.file.originalname, req.file.key, (err)=>{
                    if(err) return res.json({success: false, msg: err});
                    res.json({success: true, msg: 'Comment deleted successfully'});
                });
            });
        });
    });
});

router.get('/downloadAcceptanceLetter/:id', (req, res, next) => {
    let token = req.headers['x-access-token'];
    User.validateToken(token, (err, serverStatus, decoded) => {
        if(err) return res.status(serverStatus).json({ success: false, message: err });
        Internship.getAcceptanceLetter(req.params.id, decoded._id, (err, file) => {
            if(err) return res.json({success: false, msg: err});
            if(!file.key) return res.json({success: false, msg: 'no file present'});
            res.attachment(fileKey);
            let fileStream = s3.getObject({bucket: 'piitscrm', key: file.key}).createReadStream();
            fileStream.pipe(res);
        });
    });
});

router.post('/updateCandidateValuation/:id',(req, res, next)=>{
    let token = req.headers['x-access-token'];
    User.validateToken(token, (err, serverStatus, decoded)=>{
        if(err) return res.status(serverStatus).json({ success: false, message: err });
        Internship.upsertValuation(req.params.id, decoded._id, valuation,  (err)=>{
            if(err) throw err;
            res.json({success: true, msg: 'Valuation uploaded successfully'});
        });
    });
});

router.post('/updateAccommodationDetails/:id',(req, res, next)=>{
    let token = req.headers['x-access-token'];
    User.validateToken(token, (err, serverStatus, decoded)=>{
        if(err) return res.status(serverStatus).json({ success: false, message: err });
        if(decoded.access!=2) return res.status(401).json({ success: false, message: 'Unauthorised' });
        let accommodation = {
            cost: req.body.cost,
            address: req.body.address,
            moveIn: req.body.moveInDate,
            moveOut: req.body.moveOutDate,
            agency: {
                name: req.body.agencyName,
                email: req.body.agencyEmail,
                phNum: {countryCode: req.body.countryCode, number: req.body.phNum}
            }
        };
        Internship.updateAccommodation(req.params.id, accommodation, (err)=>{
            if(err) throw err;
            res.json({success: true, msg: 'Accommodation information updated successfully'});
        });
    });
});

router.post('/updateSuicaDetails/:id',(req, res, next)=>{
    let token = req.headers['x-access-token'];
    User.validateToken(token, (err, serverStatus, decoded)=>{
        if(err) return res.status(serverStatus).json({ success: false, message: err });
        if(decoded.access!=2) return res.status(401).json({ success: false, message: 'Unauthorised' });
        let suica = {
            cardNo: req.body.cardNo,
            line: req.body.subwayLine,
            from: req.body.fromStation,
            to: req.body.toStation,
            name: req.body.candidateName,
            issued: req.body.IssuedOn,
            expiry: req.body.expiryDate
        }
        Internship.updateSuica(req.params.id, suica, (err)=>{
            if(err) throw err;
            res.json({success: true, msg: 'Suica information updated successfully'});
        });
    });
});

router.post('/updateWifiDetails/:id',(req, res, next)=>{
    let token = req.headers['x-access-token'];
    User.validateToken(token, (err, serverStatus, decoded)=>{
        if(err) return res.status(serverStatus).json({ success: false, message: err });
        if(decoded.access!=2) return res.status(401).json({ success: false, message: 'Unauthorised' });
        let wifi = {
            cost: req.body.cost,
            agency: {
                name: req.body.agencyName,
                email: req.body.agencyEmail,
                phNum: {countryCode: req.body.countryCode, number: req.body.phNum}
            },
            startDate: req.body.startDate,
            returnDate: req.body.returnDate,
            details: req.body.extraDetails
        }
        Internship.updateWifi(req.params.id, wifi, (err)=>{
            if(err) throw err;
            res.json({success: true, msg: 'Wifi information updated successfully'});
        });
    }); 
});

router.post('/updatePaymentDetails/:id',(req, res, next)=>{
    let token = req.headers['x-access-token'];
    User.validateToken(token, (err, serverStatus, decoded)=>{
        if(err) return res.status(serverStatus).json({ success: false, message: err });
        if(decoded.access!=2) return res.status(401).json({ success: false, message: 'Unauthorised' });
        let paymentNumber = req.body.paymentNumber ? req.body.paymentNumber : null;
        Internship.upsertPayment(req.params.id, paymentNumber, req.body.amount, req.body.date, (err)=>{
            if(err) throw err;
            res.json({success: true, msg: 'Payment information updated successfully'});
        });
    });
});

router.delete('/deletePayment/:id',(req, res, next)=>{
    let token = req.headers['x-access-token'];
    User.validateToken(token, (err, serverStatus, decoded)=>{
        if(err) return res.status(serverStatus).json({ success: false, message: err });
        if(decoded.access!=2) return res.status(401).json({ success: false, message: 'Unauthorised' });
        Internship.deletePayment(req.params.id, paymentNumber, (err)=>{
            if(err) throw err;
            res.json({success: true, msg: 'Payment deleted successfully'});
        });
    }); 
});

module.exports = router;