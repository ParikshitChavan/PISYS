const nodemailer = require('nodemailer');
const config = require('../config/cfg');

module.exports.sendActivationMail = function(recipient, link, callback){
    if(!recipient || !link) return callback('Missing data');
    let htmlBody = `
        <p>Hi ${recipient.name},<br>
        <br>
        We would like to invite you to our newly developed PIITs Intership management platform.<br>
        please use this link to setup your initial password and login to the platform.<br>
        <br>
        <a href='${link}'>${link}</a><br>
        <br>
        After logging in Kindly fill the company details and your profile details<br>
        We would like you to use this platform to fill out weekly reports, feedbacks and other details for the internships.<br>
        Thank you.<br>    
    `;  //es6 template String with back ticks
    let mailOptions = {
        from: '"PIITs Team" <piits@willings.co.jp>',
        to: recipient.email,
        subject: 'Invitation to PIITs Intership management platform',
        text: '',
        html: htmlBody
    };
    config.nodemailerTransporter.sendMail(mailOptions, (err, info) => {
        if (err) return callback(err);
        callback(null);
    });
}

module.exports.sendPasswordResetMail = function(recipient, link, callback){
    if(!recipient || !link) return callback('Missing data');
    let htmlBody = `
        <p>Hi ${recipient.name},<br>
        <br>
        We received a Password reset request from this email id.<br>
        Kindly Inform us immediately if you think this wasn't you. otherwise please go through the link to reset your password.<br>
        kindly node that this link will only be active for 12 hours.<br>
        <br>
        <a href='${link}'>${link}</a><br>
        <br>
        Thank you.<br>    
    `;  //es6 template String with back ticks
    let mailOptions = {
        from: '"PIITs Team" <piits@willings.co.jp>',
        to: recipient.email,
        subject: 'Link to resting your Password',
        text: '',
        html: htmlBody
    };
    config.nodemailerTransporter.sendMail(mailOptions, (err, info) => {
        if (err) return callback(err);
        callback(null);
    });
}

module.exports.sendEmailVerificationMail = function(recipient, link, callback){
    if(!recipient || !link) return callback('Missing data');
    let htmlBody = `
        <p>Hi ${recipient.name},<br>
        <br>
        We received a email verification request for this email id.<br>
        Kindly Inform us immediately if you think this wasn't you. otherwise please go through the link to verify your email address.<br>
        <br>
        <a href='${link}'>${link}</a><br>
        <br>
        Thank you.<br>    
    `;  //es6 template String with back ticks
    let mailOptions = {
        from: '"PIITs Team" <piits@willings.co.jp>',
        to: recipient.email,
        subject: 'Link to verifying your email address on Pisys',
        text: '',
        html: htmlBody
    };
    config.nodemailerTransporter.sendMail(mailOptions, (err, info) => {
        if (err) return callback(err);
        callback(null);
    });
}


module.exports.initiateInternshipMails = function(admins, link, callback){       //callback(success, err)
    let errArr=[];
    for(let admin of admins) {
        let htmlBody = `
            <p>Hi ${admin.name},<br>
            <br>
            We have added a new intership associated with your company.<br>
            Kindly visit the internship page here:<br>
            <br>
            <a href='${link}'>${link}</a><br>
            <br>
            We request you to fill in all the necessary basic details for the internship.
            Thank you.<br>
        `;  //es6 template String with back ticks
        let mailOptions = {
            from: '"PIITs Team" <piits@willings.co.jp>',
            to: admin.email,
            subject: 'Invitation to edit basic details of newly added Internship',
            text: '',
            html: htmlBody
        };
        config.nodemailerTransporter.sendMail(mailOptions, (err, info) => {
            if (err)  errArr.push({error: err, mail: admin.mail});
        });
    }
    if(errArr.length == admins.length) return callback(false, 'email sending failed to all the admins');
    else if(errArr.length) return callback(true, 'Email sending failed to some of the admins')
    callback(true , null);
}

module.exports.notifyCandidateBasicInfo = function(candidate, link, callback){         //callback(err)
    if(!candidate.email) return callback('Missing candidate Email');
    let htmlBody = `
        <p>Hi ${candidate.name},<br>
        <br>
        The basic info of your intership has just been updated.<br>
        Check it out here:<br>
        <br>
        <a href='${link}'>${link}</a><br>
        <br>
        Thank you.<br>    
    `;  //es6 template String with back ticks
    let mailOptions = {
        from: '"PIITs Team" <piits@willings.co.jp>',
        to: candidate.email,
        subject: 'Basic details of you intership have been updated',
        text: '',
        html: htmlBody
    };
    config.nodemailerTransporter.sendMail(mailOptions, (err, info) => {
        if (err) return callback(err);
        callback(null);
    });
}

module.exports.sendcmtTagmails = function(cmtData, taggedBy, recipients, callback){         //callback(err)
    let link = 'https://pisys.willings.co.jp/internship' + camtdata.id + '/weeklyReports';
    let errStack = []
    let htmlBody = `
        You were tagged in comment by ${taggedBy} :<br>
        ${cmtData.htmlBody}<br><br>
        Check it out here:<br>
        <br>
        <a href='${link}'>${link}</a><br>  
    `;  //es6 template String with back ticks
    recipients.forEach(mailId => {
        let mailOptions = {
            from: '"PIITs Team" <piits@willings.co.jp>',
            to: mailId,
            subject: 'tagged in comment by ' + taggedBy,
            text: '',
            html: htmlBody
        };
        config.nodemailerTransporter.sendMail(mailOptions, (err, info) => {
            if (err) errStack.push(err);
        }); 
    });
    if(errStack.length == recipients.length) return callback('Email sending failed for all the tags');
    if(errStack.length) return callback('Email sending failed for some of the tags');
    callback(null);
}
