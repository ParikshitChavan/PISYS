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

module.exports.sendCandiActivationMail = function(recipient, InviterName, link, callback){
    if(!recipient || !link) return callback('Missing data');
    let htmlBody = `
        Hi,<br>
        ${InviterName} just invited you to our recruitment platform that specializes in IT jobs in Japan.<br>
        Use this link to setup your account<a href='${link}'>${link}</a><br>
        <br>
        Onetro is a service provided by Willings, Inc. We connect and give the opportunity to the world to hire and get hired in Japan.<br>
        <br>
        We believe in keeping things transparent hence we allow job seekers to upload their 1 minute introductory video for companies to watch. <br>
        For candidates, it increases the chances of getting interviewed and hired.<br>
        </p>
    `;  //es6 template String with back ticks
    let mailOptions = {
        from: '"Onetro Team" <onetro@willings.co.jp>',
        to: recipient,
        subject: '【Willings】Invitation to open an account on Onetro',
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
