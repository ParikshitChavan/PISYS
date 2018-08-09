//API routes for the Company (Company Admins info will be embedded in company document)
const express = require('express');
const router = express.Router();
const aws = require('aws-sdk');

//models
const User = require('../models/user');
const cvBuilder = require('../models/cvbuilder');

const util = require('../helpers/common');
//config
const config = require('../config/cfg');

//setting up AWS authentication and S3
aws.config.update(config.awsAuthObj);
const s3 = new aws.S3();


// superadmin is willings member whose access code is = 2.
const isSuperAdminOrOwner = function (decoded, cvOwnerId) {
    return decoded.access == 2 || decoded._id == cvOwnerId;
}

const hasPermission = (req, res, next) => {
    const cvUserId = req.body.userId;
    isSuperAdminOrOwner(req.decoded, cvUserId) ? next() : util.sendError(res, 'Not authorised for this operation');
}

const getCv = (req, res, next) => {
    var cvUserId = req.body.userId;
    if (!cvUserId) {    cvUserId = req.params.userId;   }
    User.getCv(cvUserId, (err, cv) => {
        if (err) {  return util.sendError(res, err); }
        if (!cv) {  return util.sendError(res, 'Cv details are not available'); }
        req.tempStore.cv = cv;
        next()
    });
}

const getCvById = (req, res, next) => {
    cvBuilder.getCvById(req.tempStore.cv, (err, cvdetails) => {
        if (err) return util.sendError(res, err);
        if (!cvdetails) return util.sendError(res, 'Cv details are not available');
        req.tempStore.cvdetails = cvdetails;
        next()
    })
}

const sendCvDetails = (req, res) => {
    if (isSuperAdminOrOwner(req.decoded, req.params.userId)) {
        res.json({ success: true, canEdit: true, cvdetails: req.tempStore.cvdetails });
    } else {
        delete req.tempStore.cvdetails.address;
        delete req.tempStore.cvdetails.skypeId;
        res.json({ success: true, canEdit: false, cvdetails: req.tempStore.cvdetails });
    }
}

const addEducation = (req, res) => {
    const education = req.body.education;
    if (!education) {
        return util.sendError(res, 'Please provide all paramters', 400)
    }
    cvBuilder.addEducation(req.tempStore.cv, education, (err, cvdetails) => {
        if (err) {  return util.sendError(res, err); }
        if (!cvdetails) return util.sendError(res, 'Cant add the education this time!.');
        res.json({ success: true, message: 'New Education has been added successfully', educations: cvdetails.educations });
    })
}

const deleteEducation = (req, res) => {
    const educationID = req.body.educationID;
    if (!educationID) {
               return util.sendError(res, 'Please provide all paramters', 400)
    }
    cvBuilder.deleteEducation(req.tempStore.cv, educationID, (err, cvdetails) => {
        if (err) {  return util.sendError(res, err); }
        if (!cvdetails) return util.sendError(res, 'Cant delete the education this time!.');
        res.json({ success: true, message: 'Education has been removed successfully', educations: cvdetails.educations });
    })
}

const updateEducation = (req, res) => {
    const education = req.body.education;
    if (!education) {   return util.sendError(res, 'Please provide all paramters' )   }
    cvBuilder.updateEducation(req.tempStore.cv, education, (err, cvDetails) => {
        if (err) {  return util.sendError(res, err); }
        if (!cvDetails) return util.sendError(res, 'Cant update the education this time!.' );
        res.json({ success: true, message: 'Education has been updated successfully', educations: cvDetails.educations })
    })
}


const addExperience = (req, res) => {
    const experience = req.body.experience;
    if(!experience) {
        return util.sendError(res, 'Please provide all paramters, experience is missing')
    }
    cvBuilder.addExperience(req.tempStore.cv, experience, (err, cvdetails) => {
        if(err){    return util.sendError(res, 'Failed to add experience');  }
        if(!cvdetails) return util.sendError(res, 'Cant update the experience this time!.');
        res.json({ success: true, message : 'New experience has been added successfully', experiences: cvdetails.experience });
    })
}

const updateExperience =(req, res) => {
    const experience = req.body.experience;
    if(!experience){
        return util.sendError(res, 'Please provide all paramters', 422)
    }
    cvBuilder.updateExperience(req.tempStore.cv, experience, (err,cvdetails) => {
        if(err) return util.sendError(res, err);
        if(!cvdetails) return util.sendError(res, 'Cant update the experience!.');
        res.json({ success: true, message : 'Experience has been updated successfully', experiences: cvdetails.experience });
    })
}

const deleteExperience = (req, res) => {
    const experienceId = req.body.experienceId;
    if(!experienceId){
               return util.sendError(res, 'Please provide all paramters', 422)
    }
    cvBuilder.deleteExperience(req.tempStore.cv, experienceId, (err,cvdetails) => {
        if(err) return util.sendError(res, err );
        if(!cvdetails) return util.sendError(res, 'Can not delete the experience');
        return res.json({ success: true, message : 'Experience has been removed successfully', experience: cvdetails.experience });
    })
}

const addProjects = (req, res) => {
    const project = req.body.project;
    if(!project){
               return util.sendError(res, 'Please provide all paramters', 422)
    }
    cvBuilder.addProjects(req.tempStore.cv, project, (err, cvdetails) => {
        if (err) return util.sendError(res, err);
        if (!cvdetails) return util.sendError(res, 'Can not add the project');
        res.json({ success: true, message: 'New project has been added successfully', projects: cvdetails.projects });
    })
}

const deleteProject = (req, res) => {
    const projectId = req.body.projectId;
    if(!projectId){
               return util.sendError(res, 'Please provide all paramters', 422)
    }
    cvBuilder.deleteProject(req.tempStore.cv, projectId, (err, cvdetails) => {
        if (err) return util.sendError(res, err);
        if (!cvdetails) return util.sendError(res, 'Can not delete the project');
        res.json({ success: true, message: 'Project has been removed successfully', projects: cvdetails.projects });
    })
}

const updateProject = (req, res) => {
    const project = req.body.project;
    if(!project){
               return util.sendError(res, 'Please provide all paramters', 422)
    }
    cvBuilder.updateProject(req.tempStore.cv, project, (err, cvdetails) => {
        if (err) return util.sendError(res, err);
        if (!cvdetails) return util.sendError(res, 'Can not update the project');
        res.json({ success: true, message: 'Project has been updated successfully', projects: cvdetails.projects });
    })
}


router.use(util.authenticate);
router.get('/cvdetails/:userId', getCv, getCvById, sendCvDetails)

router.post('/addEducation', hasPermission, getCv, addEducation)
router.delete('/deleteEducation', hasPermission, getCv, deleteEducation)
router.put('/updateEducation', hasPermission, getCv, updateEducation)

router.post('/addExperience', hasPermission, getCv, addExperience)
router.put('/updateExperience', hasPermission, getCv, updateExperience)
router.delete('/deleteExperience', hasPermission, getCv, deleteExperience)

router.post('/addProjects', hasPermission, getCv, addProjects)
router.put('/updateProject', hasPermission, getCv, updateProject)
router.delete('/deleteProject', hasPermission, getCv, deleteProject)


module.exports = router;