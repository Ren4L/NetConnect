const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const Cipher = require('./CodingDeCoding.js');
const { json } = require('body-parser');
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
  User = {
    login:req.body.login,
    password:pass,
    email:req.body.email,
    ConfirmationMail:false,
    
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
  fs.writeFileSync('./Public/Users/FullList.json', JSON.stringify(obj));
  fs.writeFileSync(`./Public/Users/NotMail${User.login}.json`, JSON.stringify(User));
  res.redirect('СonfirmationMail');
  });

  module.exports = router;