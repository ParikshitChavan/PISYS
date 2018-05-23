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
        We received a email verification request from this email id.<br>
        Kindly Inform us immediately if you think this wasn't you. otherwise please go through the link to verify your email address.<br>
        kindly node that this link will only be active for 12 hours.<br>
        <br>
        <a href='${link}'>${link}</a><br>
        <br>
        Thank you.<br>    
    `;  //es6 template String with back ticks
    let mailOptions = {
        from: '"PIITs Team" <piits@willings.co.jp>',
        to: recipient.email,
        subject: 'Link to verifying your email address',
        text: '',
        html: htmlBody
    };
    config.nodemailerTransporter.sendMail(mailOptions, (err, info) => {
        if (err) return callback(err);
        callback(null);
    });
}


module.exports.initiateInternshipMails = function(companyId, link, callback){       //callback(success, error)
    if(!companyId || !link) return callback(false, 'Missing data');
    Company.getAdmins(companyId, (err, admins) => {
        if(err) return callback(false, err);
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
    });
}