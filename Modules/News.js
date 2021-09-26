const express = require('express');
const fs = require('fs');
const router = express.Router();

router.get('/',(req, res)=>{
  let readFile = fs.readFileSync('./Public/Users/FullList.json','utf-8');
    let obj = new Function(`return (${readFile})`)();
    let login;
    let flag = false;
    for (let i = 0; i < obj.Users.length; i++) {
      if(obj.Users[i].login == req.session.userName){
        login = obj.Users[i].login;
        flag = true;
        break;
      }
    }
    var news = new Array();
    fs.readdirSync('./Public/News').forEach(file => {
      let readFile = fs.readFileSync(`./Public/News/${file}`, 'utf-8');
      obj = new Function(`return (${readFile})`)();
      let readFile2 = fs.readFileSync(`./Public/Users/${obj.author}.json`, 'utf-8');
      obj2 = new Function(`return (${readFile2})`)();
      if(obj2.avatar == ''){
        obj.avatar = `<div>${obj.author.slice(0,1)}</div>`;
      }
      else{
        obj.avatar = `<img src="/Public/Files/${obj2.avatar}" alt="Error" class="News_avatar">`;
      }
      obj.content = `${obj.content.slice(0,500)}...`;
      obj.dateParse = `${new Date(obj.date).toLocaleString().slice(0,10)} ${new Date(obj.date).toLocaleTimeString().slice(0,-3)}`;
      news.push(obj);
    });

    
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
    news.reverse();
    if(flag){
      if(req.session.moder){
        res.render('News',{news:news, avatar:avatar, avatar2:avatar2})
      }
      else{
        res.render('NewsNotModer',{news:news})
      }
    }
    else{res.render('NewsNotModer',{news:news})}
  });
  
module.exports = router;