const express = require('express');
const Mailer = require('./Mailer');
const bodyParser = require('body-parser');
const router = express.Router();
const { getDatabase, ref, child, set, get } = require("firebase/database");
const firebasedb = require('./database');
const db = getDatabase();
const refdb = ref(getDatabase());

router.use(express.json());
router.use(bodyParser.urlencoded({extended:false}));

router.get('/', (req, res)=>{
    
    res.render('ForgotPassword');
})

.post('/', async(req, res)=>{
  let FullList;
  await get(child(refdb, `users`)).then((snapshot) => {FullList = snapshot.val(); }).catch((error) => {console.error(error);});
    if(req.body.post == 'mail'){
      let buf = {mail:false}
      FullList.forEach(element => {
        if(element.email == req.body.email && element.ConfirmationMail == true){
          buf = {mail:true}
        }
      });
      res.json(buf);
    }
    else{
      let User, index;
      for (let i = 0; i < FullList.length; i++) {
        if(FullList[i].email == req.body.email){
          User = FullList[i];
          index = i;
        }
      }
      let code = Math.floor(Math.random() * (100000 - 10000)) + 10000;
      User.PassCode = code;
      Mailer.Send(code, User.login, req.body.email, 'ForgotPass');
      setTimeout(async() => {
        FullList[index] = User;
        await set(ref(db, `users`), FullList)
        res.redirect('Authorization');
      }, 3000);
    }
});

module.exports = router;