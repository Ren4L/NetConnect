const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const multer = require('multer');
const router = express.Router();
const urlencodedParser = bodyParser.urlencoded({extended: false});

router.use(multer({dest:"./Public/Files"}).any());
router.get('/',(req, res)=>{
    let readFile = fs.readFileSync('./Public/Users/FullList.json','utf-8');
    let obj = new Function(`return (${readFile})`)();
    let login;
    let flag = false;
    for (let i = 0; i < obj.Users.length; i++) {
      if(obj.Users[i].login == req.session.userName && obj.Users[i].moder == true){
        login = obj.Users[i].login;
        flag = true;
      }
    }
    
    if(flag){res.render('CreateNews')}
    else{res.render('Authorization')}
})
    .post('/', urlencodedParser, (req, res)=>{
        let arr = new Array();
        for(let i = 1; i<=3; i++){
            if(req.files[i] != undefined){
                arr.push(req.files[i].filename);
            }
        }
        let News = {
            title:req.body.title,
            content:req.body.content,
            NewsPhoto:req.files[0].filename,
            dopPhoto:arr,
        }
        fs.writeFileSync(`./Public/News/${Date.now()}.json`, JSON.stringify(News));
        res.render('CreateNews')
    });

module.exports = router;