const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const { json } = require('body-parser');
const router=express.Router();
const urlencodedParser = bodyParser.urlencoded({extended: false});

router.get('/',(req, res)=>{
    res.render('ConfirmationMail');
  })
  .post('/', urlencodedParser, (req, res) => {

    });

module.exports = router;