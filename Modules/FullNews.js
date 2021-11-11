const { render } = require('ejs');
const express = require('express');
const fs = require('fs');
const router = express.Router();

router.get('/:id',(req, res)=>{
    let readNews = fs.readFileSync(`./Public/News/${req.params.id}.json`,'utf-8');
    news = new Function(`return (${readNews})`)();
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
      let readAuthor = fs.readFileSync(`./Public/Users/${news.author}.json`);
      author = new Function(`return (${readAuthor})`)();
      if(author.avatar == ''){
        author.avatar = `<div>${author.login.slice(0,1)}</div>`;

      }
      else{
        author.avatar = `<img src="/Public/Files/${author.avatar}" alt="Error" class="Avatar_News">`
      }
      res.render('FullNews',{avatar:avatar, avatar2:avatar2, title:news.title, content:news.content, NewsPhoto:news.NewsPhoto, author:news.author, date:`${new Date(news.date).toLocaleString().slice(0,10)} ${new Date(news.date).toLocaleTimeString().slice(0,-3)}`, avatarAuthor:author.avatar, dopPhoto:news.dopPhoto})
    });

module.exports = router;