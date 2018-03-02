const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    host: 'jp1.fcomet.com',
    port: 465,
    secure: true,
    auth: {
        user: 'piits@willings.co.jp',
        pass: 'VYPA3cPak;vN'
    }
});

let awsAuthObj = {
    secretAccessKey: 'mVK+dnHyISFdX8mpTQGLoFatB/VIJW9/o3vVcBr1',
    accessKeyId: 'AKIAI4MZWQAUIDI432QQ',
    signatureVersion: 'v4'
}

module.exports = {
    database: 'mongodb://localhost:27017/PIITs',
    secret: 'PIITsKeLiyeCRM++',
    nodemailerTransporter: transporter,
    awsAuthObj : awsAuthObj
};
