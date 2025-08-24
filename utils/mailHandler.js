const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host:'smtpsmtp.freesmtpservers.com',
    port:25,
    secure:'false',
    // auth:{
    //     user: '',
    //     pass:''
    // }
})

module.exports = {transporter};