const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const router=express.Router();
const urlencodedParser = bodyParser.urlencoded({extended: false});

var User=new Object();

router.post('/Registration', urlencodedParser, (req, res) => {
    User={
      login:req.body.login,
      password:req.body.password,
      email:req.body.email,
    }
    let writeFile= fs.writeFileSync(`./Public/Users/${User.login}.json`, JSON.stringify(User));
    
  });

  router.get('/',(req, res)=>{
    res.render('Registration');
  });
  module.exports = router;