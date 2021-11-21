const express = require('express');
const bodyParser = require('body-parser');
const { json } = require('body-parser');
const router=express.Router();
const { getDatabase, ref, child, set, get } = require("firebase/database");
const firebasedb = require('./database');
const db = getDatabase();
const refdb = ref(getDatabase());

router.use(bodyParser.urlencoded({extended: false}));
router.use(express.json());

router.get('/:id',(req, res)=>{
  
    res.render('ConfirmationMail', {url:req.params.id});
  })
  .post('/', async(req, res) => {
    let FullList;
    await get(child(refdb, `users`)).then((snapshot) => {FullList = snapshot.val(); }).catch((error) => {console.error(error);});
    let User, index=0;
    for (let i = 0; i < FullList.length; i++) {
      if(FullList[i].login == req.body.login){
        User = FullList[i];
        index = i;
      }
    }
    if(req.body.post == 'check'){
      let buf;
      if(req.body.code == User.Code){
        buf = {flag:true}
      }
      else{
        buf = {flag:false}
      }
      res.json(buf)
    }
    else  if(req.body.code == User.Code){
      User.ConfirmationMail = true;
      delete User.Code;
      FullList[index] = User;
      await set(ref(db, `users`), FullList)
      res.redirect('Authorization');
    }
    });

module.exports = router;