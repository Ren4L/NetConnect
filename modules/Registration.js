const express = require('express');
const bodyParser = require('body-parser');
const Cipher = require('./EncryptionDecryption.js');
const Mailer = require('./Mailer');
const router=express.Router();
const { getDatabase, ref, child, set, get } = require("firebase/database");
const firebasedb = require('./database');
const db = getDatabase();
const refdb = ref(getDatabase());

router.use(express.json());
router.use(bodyParser.urlencoded({extended: false}));

router.get('/',(req, res)=>{
  res.render('Registration');
})
.post('/', async (req, res) => {
  let FullList;
  await get(child(refdb, `users`)).then((snapshot) => {FullList = snapshot.val(); }).catch((error) => {console.error(error);});
  if(req.body.post == 'check'){
    flags ={
      logflag: true,
      mailflag: true
    }
    FullList.forEach(element => {
      if(element.login == req.body.login){flags.logflag = false}
      if(element.email == req.body.email){flags.mailflag = false}
    });
    res.json(flags);
  }
  else{
    let pass = Cipher.Encryption(req.body.password.split(''), req.body.login.split(''));
    let code = Math.floor(Math.random() * (100000 - 10000)) + 10000;
    User = {
      login:req.body.login,
      password:pass,
      email:req.body.email,
      ConfirmationMail:false,
      Code:code,
      moder:false
    }
    FullList.push(User);
    Mailer.Send(code, req.body.login, req.body.email, 'MailConfir');
    setTimeout(async() => {
      await set(ref(db, `users`), FullList)
      res.redirect('Authorization');
    }, 3000);
  }
  });

  module.exports = router;