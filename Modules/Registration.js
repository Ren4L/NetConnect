const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const Cipher = require('./CodingDeCoding.js');
const { json } = require('body-parser');
const Mailer = require('./Mailer');
const router=express.Router();
const urlencodedParser = bodyParser.urlencoded({extended: false});

var User=new Object();

router.get('/',(req, res)=>{
  res.render('Registration');
})
.post('/', urlencodedParser, (req, res) => {
  let readFile = fs.readFileSync('./Public/Users/FullList.json','utf-8');
  let obj = new Function(`return (${readFile})`)();
  let pass = Cipher.Coding(req.body.password.split(''), req.body.login.split(''));
  let code = Math.floor(Math.random() * (100000 - 10000)) + 10000;
  User = {
    login:req.body.login,
    password:pass,
    email:req.body.email,
    ConfirmationMail:false,
    Code:code,
    moder:false,
  }
  List = {
    User:
      {
        login:req.body.login,
        email:req.body.email,
        ConfirmationMail:false,
      }
  }
  obj.Users.push(List.User)
  Mailer.Send(code, req.body.login, req.body.email)
  fs.writeFileSync('./Public/Users/FullList.json', JSON.stringify(obj));
  fs.writeFileSync(`./Public/Users/NotMail${User.login}.json`, JSON.stringify(User));
  res.redirect('Authorization');
  });

  module.exports = router;