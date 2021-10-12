const express = require('express');
const formData = require("express-form-data");
const fs = require('fs');
const Cipher = require('./EncryptionDecryption.js');
const router = express.Router();

// router.use(formData.parse());
router.use(formData.format());
router.use(express.json());

router.get('/',(req, res)=>{
    let readFile = fs.readFileSync('./Public/Users/FullList.json','utf-8');
    let obj = new Function(`return (${readFile})`)();
    let login;
    let flag = false;
    for (let i = 0; i < obj.Users.length; i++) {
      if(obj.Users[i].login == req.session.userName){
        login = obj.Users[i].login;
        flag = true;
      }
    }
    if(req.session.userName == undefined){
        avatar = '<img src="/Public/ICON/Enter.svg" class="Avatar">';
        avatar2 = '<img src="/Public/ICON/Enter.svg" class="Avatar2">';
      }
      else{
        let readFile = fs.readFileSync(`./Public/Users/${req.session.userName}.json`, 'utf-8');
        let obj = new Function(`return (${readFile})`)();
        if(obj.avatar == ''){
          avatar =`<div class="Avatar">${req.session.userName.slice(0,1)}</div>`;
          avatar2 = `<div class="Avatar2">${req.session.userName.slice(0,1)}</div>`
        }
        else{
          avatar = `<img src="/Public/Files/${obj.avatar}" class="Avatar">`;
          avatar2 = `<img src="/Public/Files/${obj.avatar}" class="Avatar2">`;
        }
      }
      if(flag){
        if(req.session.moder){
          res.render('Setting',{avatar:avatar, avatar2:avatar2})
        }
        else{
          res.render('SettingNotModer',{avatar:avatar, avatar2:avatar2})
        }
      }
      else{
        res.render('Authorization',{avatar:avatar, avatar2:avatar2})
      }
})
.post('/', (req, res)=>{
  let readFile = fs.readFileSync(`./Public/Users/${req.session.userName}.json`, 'utf-8');
  let obj = new Function(`return (${readFile})`)();
  if(req.body.formName == 'Inf'){
    for(let element in req.body){
      if(element != 'formName' && req.body[element] != ''){
        obj[element] = req.body[element];
      }
    }
    fs.writeFileSync(`./Public/Users/${req.session.userName}.json`, JSON.stringify(obj));
    let answer={result:'Done'};
    res.json(answer);
  }
  else if(req.body.formName == 'Pass'){
    let pass = Cipher.Decryption(obj.password.split(''), obj.login.split(''));
    if(req.body.OldPass != pass){
      let Result = {result:'Compare'};
      res.json(Result);
    }
    else if(req.body.OldPass == req.body.NewPass ){
      let Result = {result:'NewCompare'};
      res.json(Result);
    }
    else{
      pass = Cipher.Encryption(req.body.NewPass.split(''), obj.login.split(''));
      obj.password = pass;
      fs.writeFileSync(`./Public/Users/${req.session.userName}.json`, JSON.stringify(obj));
      let Result = {result:'Done'};
      res.json(Result);
      }
  }
  else{
    if(obj.avatar != ''){
      fs.unlinkSync(`./Public/Files/${obj.avatar}`);
    }
    obj.avatar = req.files[0].filename;
    fs.writeFileSync(`./Public/Users/${req.session.userName}.json`, JSON.stringify(obj));
    let Result = {result:'AvatarDone'};
    res.json(Result);
  }
});

module.exports = router;