const express = require('express');
const router = express.Router();
const fs = require('fs');
const Cipher = require('./CodingDeCoding.js');
const jsonparser = express.json();

router.get('/',(req, res)=>{
  res.render('Authorization');
  })
  .post('/',jsonparser,(req,res)=>{
    let readFile = fs.readFileSync('./Public/Users/FullList.json','utf-8');
    let obj = new Function(`return (${readFile})`)();
    let login, index;
    for (let i = 0; i < obj.Users.length; i++) {
      if(obj.Users[i].email == req.body.email){
        login = obj.Users[i].login;
        index = i;
      }
    }
    let User = fs.readFileSync(`./Public/Users/${login}.json`,'utf-8');
    let obj2 = new Function(`return (${User})`)();
    password=Cipher.deCoding(obj2.password.split(''), login.split(''));
    if(password != req.body.password){
      user = {confirmation:false};
      res.json(user);
    }
    else{
      user = {confirmation:true};
      req.session.userName = login;
      res.json(user);
    }
  });


module.exports = router;