const express = require('express');
const bodyParser = require('body-parser');

const Cipher = require('./EncryptionDecryption');
const router=express.Router();
const { getDatabase, ref, child, set, get } = require("firebase/database");
const firebasedb = require('./database');
const db = getDatabase();
const refdb = ref(getDatabase());

router.use(bodyParser.urlencoded({extended: false}));
router.use(express.json());

router.get('/:login&:code', (req, res)=>{
    res.render('ChangePassword', {login:req.params.login, code:req.params.code});
  })
  .post('/', async(req, res)=>{
    let FullList;
    await get(child(refdb, `users`)).then((snapshot) => {FullList = snapshot.val(); }).catch((error) => {console.error(error);});
    let index, answer, User;
    FullList.forEach(element => {
      if(req.body.login == element.login){
        User = element;
        index = FullList.indexOf(User);
      }
    });
    if(req.body.code == User.PassCode){
        let pass = Cipher.Decryption(User.password.split(''), User.login.split(''));
        if(pass == req.body.pass){
            answer = {confirmation:false};
        }
        else{
            User.password = Cipher.Encryption(req.body.pass.split(''), User.login.split(''));
            delete User.PassCode;
            FullList[index] = User;
            await set(ref(db, `users`), FullList)
            answer = {confirmation:true};
        }
    }
    else{
        answer = {code:false};
    }
    res.json(answer);
  });

module.exports = router;