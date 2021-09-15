const nodemailer = require('nodemailer');

function SendMail(email, code){
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'netconnectv2.0@gmail.com',
          pass: 'admin221212',
        },
      });
    
      await transporter.sendMail({
        from: 'NetConnect',
        to: email,
        subject: 'Attachments',
        text: 'This message with attachments.',
        html: 'This <i>message</i> with <strong>attachments</strong>.',
      })
}

module.exports.SendMail = SendMail;