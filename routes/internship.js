const express = require('express');
const path = require('path');
const router = express.Router();
const jwt = require('jsonwebtoken');
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const mailer = require('../helpers/mailer');
//models
const Internship = require('../models/internship');
const User = require('../models/user');
const Company = require('../models/company');       
//config
const config = require('../config/cfg');

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
router.post('/initInternship', (req, res, next)=>{
    let token = req.headers['x-access-token'];
    User.validateToken(token, (err, serverStatus, decoded) => {
        if(err) return res.status(serverStatus).json({ success: false, message: err });
        if(decoded.access!=2) return res.status(401).json({ success: false, message: 'Unauthorised' });
        Company.getCompanyIdByName(req.body.companyName, (err, companyId)=>{
            if(err) return res.json({success: false, message: err});
            User.getUserIdByEmail(req.body.candidateEmail, (err, candidateId) =>{
                if(err) return res.json({success: false, message: err});
                newInternship = new Internship({
                    company: companyId,
                    candidate: candidateId,
                    accommodation: {cost: 0, address: '', agency: { name: '', email: '', phNum: '' }, mIn: '', mOut: '', cmnts: ''},
                    suica : { cardNo: 0, line: '', from: '', to: '', name: '', issued: '', expiry: '', acptd: false, cmnts:'' },
                    wifi: {cost: 0, dId: 0, agency: { name: '', email: '', phNum: '' }, sDate: '', rDate: '', cmnts: '', acptd: false},
                    payments: []
                });
                newInternship.save((err, internship) => {
                    if(err) return res.json({success: false, error:err});
                    let link = 'https://www.willings.com/piits/internship/' + internship._id;
                    Company.addInternshipAndGetAdmins(companyId, internship._id, (err, admins)=>{
                        if(err) return res.json({success: false, error: err });
                        User.addInternship(candidateId, internship._id, (err)=>{
                            if(err) return res.json({success: false, error: err });
                            mailer.initiateInternshipMails(admins, link, (success, ErrorMsg)=>{
                                if(!success) return res.json({ success: false, error: ErrorMsg });
                                res.json({ success: true, error: 'Internship created successfully and mail sent to company' });
                            });
                        });
                    });
                });
            });
        });
    });
});

router.post('/yearInternships', (req, res, next)=>{
    let token = req.headers['x-access-token'];
    let year = req.body.year;
    User.validateToken(token, (err, serverStatus, decoded) => {
        if(err) return res.status(serverStatus).json({ success: false, message: err });
        if(decoded.access!=2) return res.status(401).json({ success: false, message: 'Unauthorised' });
        if(year=='' || year==null) return res.status(401).json({ success: false, message: 'No Year provided' });
        Internship.getInternshipsOfYear(year, (err, internships)=>{
            if(err) return res.json({success: false, message: err});
            res.json({success:true, internships: internships});
        });
    });
});

router.post('/upsertBasicInfo', (req, res, next)=>{
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
        Internship.upsertBasicInfo(req.body.id, decoded._id, basicInfo, (err)=>{
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

router.post('/updateCandidateWeeklyReport', (req, res, next)=>{
    let token = req.headers['x-access-token'];
    User.validateToken(token, (err, serverStatus, decoded)=>{
        if(err) return res.status(serverStatus).json({ success: false, message: err });
        let data = {
            id: req.body.intnshpId,
            rept: req.body.rept,
            week: req.body.week,
            index: req.body.index
        }
        Internship.upsertSReport(data, (err)=>{
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

router.post('/updateWeeklyReportComment',(req, res, next)=>{
    let token = req.headers['x-access-token'];
    User.validateToken(token, (err, serverStatus, decoded)=>{
        if(err) return res.status(serverStatus).json({ success: false, message: err });
        if(decoded.access!=2) return res.status(401).json({ success: false, message: 'Unauthorised' });
        let data = {
            id: req.body.intnshpId,
            reptIndex: req.body.wReportIndex,
            body: req.body.body,
            cmtIndex: req.body.index
        }
        Internship.upsertWReportComment(data, decoded._id, (err)=>{
            if(err) throw err;
            res.json({success: true, msg: 'report updated successfully'});
        });
    });
});

router.delete('/deleteWeeklyReportComment',(req, res, next)=>{
    let token = req.headers['x-access-token'];
    User.validateToken(token, (err, serverStatus, decoded)=>{
        if(err) return res.status(serverStatus).json({ success: false, message: err });
        if(decoded.access!=2) return res.status(401).json({ success: false, message: 'Unauthorised' });
        let data = {
            id: req.body.intnshpId,
            reptIndex: req.body.wReportIndex,
            cmtIndex: req.body.index
        };
        Internship.deleteWReportComment(data, decoded._id, (err)=>{
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
                    res.json({success: true, msg: 'Offer letter uploaded successfully'});
                });
            });
        });
    });
});

router.get('/downloadOfferLetter/:id', (req, res, next) => {
    let token = req.headers['x-access-token'];
    User.validateToken(token, (err, serverStatus, decoded) => {
        if(err) return res.status(serverStatus).json({ success: false, error: err });
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

router.post('/getAccommodationDetails',(req, res, next)=>{
    let token = req.headers['x-access-token'];
    User.validateToken(token, (err, serverStatus, decoded)=>{
        if(err) return res.status(serverStatus).json({ success: false, message: err });
        Internship.getAccommodation(req.body.intnshpId , decoded, (err, accommodation)=>{
            if(err) throw err;
            res.json({success: true, accommodation: accommodation});
        });
    });
});

router.post('/updateAccommodationDetails',(req, res, next)=>{
    let token = req.headers['x-access-token'];
    User.validateToken(token, (err, serverStatus, decoded)=>{
        if(err) return res.status(serverStatus).json({ success: false, message: err });
        if(decoded.access!=2) return res.status(401).json({ success: false, message: 'Unauthorised' });
        let accommodation = {
            cost: req.body.cost,
            address: req.body.address,
            agency: req.body.agency,
            mIn: req.body.mIn,
            mOut: req.body.mOut,
            cmnts: req.body.cmnts
        };
        Internship.upsertAccommodation(req.body.intnshpId, accommodation, (err, newAccommodation)=>{
            if(err) throw err;
            res.json({success: true, accommodation: newAccommodation});
        });
    });
});

router.post('/getSuicaDetails',(req, res, next)=>{
    let token = req.headers['x-access-token'];
    User.validateToken(token, (err, serverStatus, decoded)=>{
        if(err) return res.status(serverStatus).json({ success: false, error: err });
        if(decoded.access==1) return res.status(401).json({ success: false, error: 'Unauthorised' });
        Internship.getSuica(req.body.intnshpId , decoded, (err, suica)=>{
            if(err) throw err;
            res.json({success: true, suica: suica});
        });
    });
});

router.post('/updateSuicaDetails',(req, res, next)=>{
    let token = req.headers['x-access-token'];
    User.validateToken(token, (err, serverStatus, decoded)=>{
        if(err) return res.status(serverStatus).json({ success: false, message: err });
        if(decoded.access!=2) return res.status(401).json({ success: false, message: 'Unauthorised' });
        let suica = {
            cardNo: req.body.cardNo,
            line: req.body.line,
            from: req.body.from,
            to: req.body.to,
            name: req.body.name,
            issued: req.body.Issued,
            expiry: req.body.expiry,
            acptd: req.body.acptd
        }
        Internship.upsertSuica(req.params.id, suica, (err, newSuica)=>{
            if(err) throw err;
            res.json({success: true, suica:newSuica});
        });
    });
});

router.post('/getWiFiDetails',(req, res, next)=>{
    let token = req.headers['x-access-token'];
    User.validateToken(token, (err, serverStatus, decoded)=>{
        if(err) return res.status(serverStatus).json({ success: false, error: err });
        if(decoded.access==1) return res.status(401).json({ success: false, error: 'Unauthorised' });
        Internship.getWiFi(req.body.intnshpId , decoded, (err, wifi)=>{
            if(err) throw err;
            res.json({success: true, wifi: wifi});
        });
    });
});

router.post('/updateWifiDetails',(req, res, next)=>{
    let token = req.headers['x-access-token'];
    User.validateToken(token, (err, serverStatus, decoded)=>{
        if(err) return res.status(serverStatus).json({ success: false, error: err });
        if(decoded.access!=2) return res.status(401).json({ success: false, error: 'Unauthorised' });
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
        Internship.upsertWifi(req.params.id, wifi, (err, newWifi)=>{
            if(err) throw err;
            res.json({success: true, wifi:newWifi});
        });
    }); 
});

router.post('/getPayments',(req, res, next)=>{
    let token = req.headers['x-access-token'];
    User.validateToken(token, (err, serverStatus, decoded)=>{
        if(err) return res.status(serverStatus).json({ success: false, error: err });
        if(decoded.access==1) return res.status(401).json({ success: false, error: 'Unauthorised' });
        Internship.getPayments(req.body.intnshpId , decoded, (err, payments)=>{
            if(err) throw err;
            res.json({success: true, payments: payments});
        });
    });
});

router.post('/updatePayments',(req, res, next)=>{
    let token = req.headers['x-access-token'];
    let payment = {
        index: req.body.index,
        amount: req.body.amount,
        on: req.body.on
    }
    User.validateToken(token, (err, serverStatus, decoded)=>{
        if(err) return res.status(serverStatus).json({ success: false, message: err });
        if(decoded.access!=2) return res.status(401).json({ success: false, message: 'Unauthorised' });
        let paymentNumber = req.body.paymentNumber ? req.body.paymentNumber : null;
        Internship.upsertPayment(req.params.id, paymentNumber, req.body.amount, req.body.date, (err, payments)=>{
            if(err) throw err;
            res.json({success: true, payments: payments});
        });
    });
});

router.post('/deletePayment',(req, res, next)=>{
    let token = req.headers['x-access-token'];
    User.validateToken(token, (err, serverStatus, decoded)=>{
        if(err) return res.status(serverStatus).json({ success: false, error: err });
        if(decoded.access!=2) return res.status(401).json({ success: false, error: 'Unauthorised' });
        Internship.deletePayment(req.params.id, paymentNumber, (err, payments)=>{
            if(err) throw err;
            res.json({success: true, payments: payments});
        });
    }); 
});

router.post('/markPaymentAccepted',(req, res, next)=>{
    let token = req.headers['x-access-token'];
    User.validateToken(token, (err, serverStatus, decoded)=>{
        if(err) return res.status(serverStatus).json({ success: false, error: err });
        if(decoded.access==1) return res.status(401).json({ success: false, error: 'Unauthorised' });
        Internship.markPaymentAccepted(req.params.id, decoded, paymentNumber, (err, payments)=>{
            if(err) throw err;
            res.json({success: true, payments: payments});
        });
    }); 
});



module.exports = router;