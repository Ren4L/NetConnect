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
      if(obj.Users[i].login == req.session.userName && req.session.moder == true){
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
        obj = new Function(`return (${readFile})`)();
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
          res.render('CreateNews',{avatar:avatar, avatar2:avatar2})
        }
        else{
          res.render('Authorization',{avatar:avatar, avatar2:avatar2})
        }
      }
      else{res.render('Authorization',{avatar:avatar, avatar2:avatar2})}
    })
    .post('/', urlencodedParser, (req, res)=>{
        let arr = new Array();
        for(let i = 1; i<=3; i++){
            if(req.files[i] != undefined){
                arr.push(req.files[i].filename);
            }
        }
        let News = {
            date:Date.now(),
            author:req.session.userName,
            title:req.body.title,
            content:req.body.content,
            NewsPhoto:req.files[0].filename,
            dopPhoto:arr,
        }
        fs.writeFileSync(`./Public/News/${Date.now()}.json`, JSON.stringify(News));
        if(req.session.userName == undefined){
          avatar = '<img src="/Public/ICON/Enter.svg" class="Avatar">';
          avatar2 = '<img src="/Public/ICON/Enter.svg" class="Avatar2">';
        }
        else{
          let readFile = fs.readFileSync(`./Public/Users/${req.session.userName}.json`, 'utf-8');
          obj = new Function(`return (${readFile})`)();
          if(obj.avatar == ''){
            avatar =`<div class="Avatar">${req.session.userName.slice(0,1)}</div>`;
            avatar2 = `<div class="Avatar2">${req.session.userName.slice(0,1)}</div>`
          }
          else{
            avatar = `<img src="/Public/Files/${obj.avatar}" class="Avatar">`;
            avatar2 = `<img src="/Public/Files/${obj.avatar}" class="Avatar2">`;
          }
        }
        
        if(req.session.moder){
          res.render('CreateNews',{avatar:avatar, avatar2:avatar2})
        }
        else{
          res.render('Authorization',{avatar:avatar, avatar2:avatar2})
        }
    });

module.exports = router;