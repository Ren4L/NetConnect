const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const Cipher = require('./EncryptionDecryption');
const router=express.Router();

router.use(bodyParser.urlencoded({extended: false}));
const jsonparser = express.json();

router.get('/:login&:code',(req, res)=>{
    res.render('ChangePassword', {login:req.params.login, code:req.params.code});
  })
  .post('/', jsonparser,  (req, res)=>{
    let readFile2 = fs.readFileSync(`./Public/Users/FullList.json`,'utf-8');
    let obj2 = new Function(`return (${readFile2})`)();
    let index, answer;
    for (let i = 0; i < obj2.Users.length; i++) {
        if(obj2.Users[i].login == req.body.login){
          index = i;
          break;
        }
    }
    if(req.body.code == obj2.Users[index].PassCode){
        let readFile = fs.readFileSync(`./Public/Users/${req.body.login}.json`,'utf-8');
        let obj = new Function(`return (${readFile})`)();
        let pass = Cipher.Decryption(obj.password.split(''), obj.login.split(''));
        if(pass == req.body.pass){
            answer = {confirmation:false};
        }
        else{
            obj.password = Cipher.Encryption(req.body.pass.split(''), obj.login.split(''));
            console.log(obj.password);
            fs.writeFileSync(`./Public/Users/${obj.login}.json`, JSON.stringify(obj));
            delete obj2.Users[index].PassCode;            
            fs.writeFileSync(`./Public/Users/FullList.json`, JSON.stringify(obj2));
            answer = {confirmation:true};
        }
    }
    else{
        answer = {code:false};
    }
    res.json(answer);
  });

module.exports = router;