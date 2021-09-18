
const nodemailer = require('nodemailer');

function Send(code, login, email){
    let transporter = nodemailer.createTransport({
        host:'smtp.gmail.com',
        port:587,
        secure:false,
        auth:{
          user:'netconnectv2.0@gmail.com',
          pass:'admin221212',
        },
        tls: {
          // do not fail on invalid certs
          rejectUnauthorized: false,
        }
      });
    
      let message = {
        from:'NetConnect <netconnectv2.0@mail.ru>',
        to:email, 
        subject:'Email confirmation',
        text:'This message with attachments.',
        html:`Hello, this mail has been registered on the NetConnect website, 
        to confirm, follow this link <a href="http://localhost:3000/Modules/ConfirmationMail/${login}">http://localhost:3000/Modules/ConfirmationMail/${login}</a> and enter this code <strong>${code}</strong>, if it was not you, 
        then ignore this message.`,
      };
      transporter.sendMail(message, (err, res)=>{
        if(err){
            console.log(err);
        }else{
          console.log("Message sent: " + res);
      }
    
        transporter.close()});
}

module.exports.Send = Send;