const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const Cipher = require('./CodingDeCoding.js');
const { json } = require('body-parser');
const router=express.Router();
const app = express();
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
    moder:false,
  }
  List = {
    User:
      {
        login:req.body.login,
        email:req.body.email
      }
  }
  obj.Users.push(List.User)
  fs.writeFileSync('./Public/Users/FullList.json', JSON.stringify(obj));
  fs.writeFileSync(`./Public/Users/${User.login}.json`, JSON.stringify(User));
  res.redirect('Registration');
  });

  module.exports = router;