const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const Cipher = require('./CodingDeCoding.js');
const router=express.Router();
const urlencodedParser = bodyParser.urlencoded({extended: false});

var User=new Object();

router.get('/',(req, res)=>{
  res.render('Registration');
})
.post('/', urlencodedParser, (req, res) => {
  let FullList = fs.readFileSync('./Public/Users/Ren4L.json','utf8');
  console.log(typeof FullList);
  let pass = Cipher.Coding(req.body.password.split(''), req.body.login.split(''));
  let email =  Cipher.Coding(req.body.email.split(''),req.body.login.split(''));
  User = {
    login:req.body.login,
    password:pass,
    email:email,
    moder:false,
  }
  fs.writeFileSync(`./Public/Users/${User.login}.json`, JSON.stringify(User));
  res.redirect('Registration');
  });

  module.exports = router;