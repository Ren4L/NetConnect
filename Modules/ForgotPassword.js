const express = require('express');
const Mailer = require('./Mailer');
const bodyParser = require('body-parser');
const fs = require('fs');
const router = express.Router();

router.use(bodyParser.urlencoded({extended:false}));

router.get('/', (req, res)=>{
    
    res.render('ForgotPassword');
})

.post('/',(req, res)=>{
    let readFile = fs.readFileSync('./Public/Users/FullList.json','utf-8');
    let obj = new Function(`return (${readFile})`)();
    let login;
    for (let i = 0; i < obj.Users.length; i++) {
      if(obj.Users[i].email == req.body.email){
        login = obj.Users[i].login;
        index = i;
      }
    }
    let code = Math.floor(Math.random() * (100000 - 10000)) + 10000;
    obj.Users[index].PassCode = code;
    Mailer.Send(code, login, req.body.email, 'ForgotPass');
    setTimeout(() => {
      fs.writeFileSync('./Public/Users/FullList.json', JSON.stringify(obj, null, ' '));
      res.redirect('Authorization');
    }, 3000);
});

module.exports = router;