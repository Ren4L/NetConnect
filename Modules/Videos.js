const express = require('express');
const router = express.Router();
const fs = require('fs');
const multer = require('multer');

router.use(multer({dest:"./Public/Files"}).any());

router.get('/', (req, res)=>{
    let Video = '';
    let readFile = fs.readFileSync('./Public/Users/FullList.json','utf-8');
    let obj = new Function(`return (${readFile})`)();
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
        if(obj.Videos != undefined && obj.Videos.length != 0){
            Video = obj.Videos;
        }
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
          res.render('Videos',{avatar:avatar, avatar2:avatar2, Video:Video})
        }
        else{
          res.render('VideosNotModer',{avatar:avatar, avatar2:avatar2, Video:Video})
        }
      }
      else{
        res.render('Authorization',{avatar:avatar, avatar2:avatar2})
      }
})
    .post('/', (req, res)=>{
        let readFile = fs.readFileSync(`./Public/Users/${req.session.userName}.json`, "utf-8");
        let obj = new Function(`return ${readFile}`)();
        if(obj.Videos == undefined){
            obj.Videos = [];
        }
        obj.Videos.push(req.files[0].filename);
        fs.writeFileSync(`./Public/Users/${req.session.userName}.json`, JSON.stringify(obj, null, ' '));
        let Result = {result:'AvatarDone', video:req.files[0].filename};
        res.json(Result);
    });


module.exports = router;