const express = require('express');
const fs = require('fs');
const router = express.Router();

let Users = new Array();
fs.readdirSync('./Public/Users').forEach(file => {
    if(file != 'FullList.json'){
        Users.push(file.replace('.json',''));
    }
});

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
          res.render('Friends',{avatar:avatar, avatar2:avatar2})
        }
        else{
          res.render('FriendsNotModer',{avatar:avatar, avatar2:avatar2})
        }
      }
      else{
        res.render('Authorization',{avatar:avatar, avatar2:avatar2})
      }
})
.post('/', (req, res)=>{
    let answer;
    switch (req.body.post) {
      case 'search':
        let arr = new Array();
        for(i = 0; i < Users.length; i++){
          let regexp = new RegExp(req.body.name, 'i');
            if(Users[i].match(regexp) != null && Users[i] != req.session.userName){
              let readFile = fs.readFileSync(`./Public/Users/${Users[i]}.json`, 'utf-8');
              let obj = new Function(`return (${readFile})`)();
              let readFileREQ = fs.readFileSync(`./Public/Users/${req.session.userName}.json`, 'utf-8');
              let objREQ = new Function(`return (${readFileREQ})`)();
              let buf, flag = false;
              for(j = 0; j < objREQ.friends.length; j++){
                if(objREQ.friends[j].login == Users[i]){
                  flag = true;
                  break;
                }
              }
              if(flag){                
                buf = {
                  avatar:obj.avatar,
                  email:obj.email,
                  login:Users[i],
                  friend:true
                }
              }
              else{
                buf = {
                  avatar:obj.avatar,
                  email:obj.email,
                  login:Users[i],
                  friend:false
                }
              }
              arr.push(buf);
            }
        }
        answer = {name:arr};
        break;
    
      case 'add':
        break;
    }
    res.json(answer);
});

module.exports = router;