
const nodemailer = require('nodemailer');

async function Send(code, login, email, key){
    let transporter = nodemailer.createTransport({
        host:'smtp.gmail.com',
        port:587,
        secure:false,
        auth:{
          type:'OAuth2',
          user:'netconnectv2.0@gmail.com',
          accessToken:'ya29.a0ARrdaM_TKX47IT2wD7mE4aAZVW-puFRYnvx48PS72WeaSEKnD1Wz9JICOiIXYiK_ynbIhN2FXESNrn4SUT11got4dRet7OSB80HUYAI8bgKTxknjnJrtpMUCAWcHZlV_jSSwKMJ2BEcxTxR8aCJJoH1JcUND',
          expires: 1637490403422 + 6428160000000
        },
        tls: {
          rejectUnauthorized: false,
        }
      });
      let message = {};
      if(key == 'ForgotPass'){
            message = {
            from:'NetConnect <netconnectv2.0@mail.ru>',
            to:email, 
            subject:'Change password',
            text:'This message with attachments.',
            html:`Hello, to change your password, follow this link 
            <a href="http://localhost:3000/modules/ChangePassword/${login}&${code}">http://localhost:3000/modules/ChangePassword/${login}&${code}</a>`,
          };
      }else if(key == 'MailConfir'){
            message = {
            from:'NetConnect <netconnectv2.0@mail.ru>',
            to:email, 
            subject:'Email confirmation',
            text:'This message with attachments.',
            html:`Hello, this mail has been registered on the NetConnect website, 
            to confirm, follow this link <a href="http://localhost:3000/modules/ConfirmationMail/${login}">http://localhost:3000/modules/ConfirmationMail/${login}</a> and enter this code <strong>${code}</strong>, if it was not you, 
            then ignore this message.`,
          };
      }
      
    let result = await transporter.sendMail(message, (err, res)=>{
      if(err){
          console.log(err);
      }else{
        console.log("Message sent: " + res);
      }
      transporter.close();
    });
}

module.exports.Send = Send;