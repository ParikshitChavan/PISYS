const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        type: 'OAuth2',
        user: 'dummymail@willings.co.jp',
        clientId: 'dummy',
        clientSecret: 'dummy',
        refreshToken: 'dummy'
    }
});

let awsAuthObj = {
    secretAccessKey: 'dummy',
    accessKeyId: 'dummy',
    signatureVersion: 'v4'
}

let database = {
    uri: 'mongodb://localhost:27017',
    options: {dbName: 'PIITs'}
}

module.exports = {
    database: database,
    secret: 'dummy',
    nodemailerTransporter: transporter,
    awsAuthObj : awsAuthObj
};
