const express = require('express');
const fs = require('fs');
const router = express.Router();

router.get('/',(req, res)=>{
  let readFile = fs.readFileSync('./Public/Users/FullList.json','utf-8');
    let obj = new Function(`return (${readFile})`)();
    let login;
    let flag = false;
    for (let i = 0; i < obj.Users.length; i++) {
      if(obj.Users[i].login == req.session.userName){
        login = obj.Users[i].login;
        flag = true;
        break;
      }
    }
    
    if(flag){
      if(req.session.moder){
        res.render('News')
      }
      else{
        res.render('NewsNotModer')
      }
    }
    else{res.render('NewsNotModer')}
  });
  
module.exports = router;