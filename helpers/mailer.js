const config = require('../config/cfg');

module.exports.sendActivationMail = function(recipient, link, callback){
    if(!recipient || !link) return callback('Missing data');
    
    let htmlBody = `
        ${recipient.companyName}<br>
        ${recipient.name}様<br>
        <br>
        お世話になっております。<br>
        WillingsのOnetroチームでございます。<br>
        <br>
        表題の件でご連絡させていただきました。<br>
        <br>
        こちらのポーターからは、<br>
        ・1分間自己紹介動画<br>
        ・過去の業務経験<br>
        ・使用可能プログラミング言語<br>
        上記3点を含めた求職者情報をご確認いただけます。<br>
        <br>
        こちらのメールにて貴社のアドミンを設定してください。<br>
        <br>
        使用方法に関しましては下記まとめさせていただきましたので、ご確認くださいませ。<br>
        <br>
        ---アカウント設定→求職者プロフィール確認方法---<br>
        ① 下記リンクをクリック<br>
        <a href='${link}'>${link}</a><br><br>
        ② 自身のパスワードを設定<br>
        ③ 求職者情報の確認、インタビューリクエストが可能<br>
        ※ログイン後、貴社内でご自由にアドミン設定していただくことも可能です<br>
        <br>
        ご使用いただく際にご不明点等ございましたら、<br>
        お気軽にお申し付けくださいませ。<br>
        <br>
        引き続きどうぞよろしくお願いいたします。<br>
        </p>
    `;  //es6 template String with back ticks
    let mailOptions = {
        from: '"Onetro Team" <onetro@willings.co.jp>',
        to: recipient.email,
        cc: '"members" <members@willings.co.jp>',
        subject: '【Willings】Onetro法人アカウントへのご案内',
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
        from: '"Onetro Team" <onetro@willings.co.jp>',
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
        from: '"Onetro Team" <onetro@willings.co.jp>',
        to: recipient.email,
        subject: 'Link to verifying your email address on Onetro',
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

module.exports.contactCandidate = function(company, candidate, callback){         //callback(err)
    const cmpLink = 'https://onetro.willings.co.jp/companyProfile/'+ company._id;
    let htmlBody = `
        Hi ${candidate.name},<br>
        ${company.name} is interested in hiring you.<br><br>
        Check it out here:<a href='${link}'>${link}</a><br>
        <br>
        <br>
        If you want to proceed with this company reply to this email with the following details filled.<br>
        <br>
        <br>
        <br>
    `;
    
    let mailOptions = {
        from: '"Onetro Team" <onetro@willings.co.jp>',
        to: candidate.email,
        subject: company.name + 'is interested in hiring you',
        text: '',
        html: htmlBody
    };
    config.nodemailerTransporter.sendMail(mailOptions, (err, info) => {
        if (err) return callback('Email sending failed for some of the tags');
        callback(null);
    });
}
