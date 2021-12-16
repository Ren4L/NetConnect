const express = require('express');
const router = express.Router();
const Cipher = require('./EncryptionDecryption.js');
const { getDatabase, ref, child, get } = require("firebase/database");
const firebasedb = require('./database');
const jsonparser = express.json();
const refdb = ref(getDatabase());


router.get('/',(req, res)=>{
  req.session.destroy(()=>{
    res.render('Authorization');
  });
  })
  .post('/',jsonparser, async(req,res)=>{
      get(child(refdb, `users`)).then((snapshot) => {
      FullList = snapshot.val();
          let login, password, moder, ConfM;
          FullList.forEach(element => {
            if(element.email == req.body.email){
              login = element.login;
              password = element.password;
              moder = element.moder;
              ConfM = element.ConfirmationMail;
            }
          });
          if(login == undefined || ConfM == false){
            user = {mail:false}
            res.json(user)
          }
          else{user = {mail:true}}
          password=Cipher.Decryption(password.split(''), login.split(''));
          console.log(req.body.email + '   ' + password);
          if(password != req.body.password){
            user.pass = false;
          }
          else{
            user.pass = true;
            req.session.userName = login;
            req.session.moder = moder;
          }
          res.json(user);
    }).catch((error) => {
      console.error(error);
    });
  });


module.exports = router;