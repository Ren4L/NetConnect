const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const router=express.Router();
const urlencodedParser = bodyParser.urlencoded({extended: false});

var User=new Object();

router.get('/',(req, res)=>{
    res.render('Registration');
  })
.post('/', urlencodedParser, (req, res) => {
    User={
      login:req.body.login,
      password:req.body.password,
      email:req.body.email,
    }
    fs.writeFileSync(`./Public/Users/${User.login}.json`, JSON.stringify(User));
    res.redirect('Registration');
  });

  module.exports = router;