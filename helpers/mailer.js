const nodemailer = require('nodemailer');
const config = require('./config/cfg');

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


