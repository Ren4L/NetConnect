const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const { json } = require('body-parser');
const router=express.Router();
const urlencodedParser = bodyParser.urlencoded({extended: false});

router.get('/:id',(req, res)=>{
  
    res.render('ConfirmationMail', {url:req.params.id});
  })
  .post('/', urlencodedParser, (req, res) => {
    let readFullList = fs.readFileSync('./Public/Users/FullList.json','utf-8');
    let obj1 = new Function(`return (${readFullList})`)();
    let readUser = fs.readFileSync(`./Public/Users/NotMail${req.body.login}.json`,'utf-8');
    let obj2 = new Function(`return (${readUser})`)();
    if(req.body.code == obj2.Code){
      for (let i = 0; i < obj1.Users.length; i++) {
        console.log(obj1.Users[i]);
        if(obj1.Users[i].login == req.body.login){
          obj1.Users[i].ConfirmationMail = true;
          break;
        }
      }
      obj2.ConfirmationMail = true;
      delete obj2.Code;
      fs.unlinkSync(`./Public/Users/NotMail${req.body.login}.json`);
      fs.writeFileSync('./Public/Users/FullList.json', JSON.stringify(obj1, null, ' '));
      fs.writeFileSync(`./Public/Users/${req.body.login}.json`, JSON.stringify(obj2, null, ' '));
      res.redirect('Authorization');
    }
    });

module.exports = router;