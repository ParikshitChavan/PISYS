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

module.exports = {
    database: 'mongodb://localhost:27017/PIITs',
    secret: 'PIITsKeLiyeCRM++',
    nodemailerTransporter: transporter
};
