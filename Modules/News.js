const express = require('express');
const { getDatabase, ref, child, get } = require("firebase/database");
const firebasedb = require('./database');
const db = getDatabase();
const refdb = ref(getDatabase());
const router = express.Router();

router.get('/',async (req, res)=>{
  let FullList;
  await get(child(refdb, `users`)).then((snapshot) => {FullList = snapshot.val(); }).catch((error) => {console.error(error);});
  let login, index;
    let flag = false;
    for (let i = 0; i < FullList.length; i++) {
      if(FullList[i].login == req.session.userName){
        login = FullList[i].login;
        index = i;
        flag = true;
        break;
      }
    }
    let News;
    await get(child(refdb, 'news')).then((snap)=>{News = snap.val();}).catch((err)=>{console.log(err);}) 
    var news = new Array();
      let author;
      if(News == undefined) News = [];
      News.forEach(element => {
        FullList.forEach(el=>{
          if(el.login == element.author){author = el}
        })
        if(author.avatar == undefined){
          element.avatar = `<div>${element.author.slice(0,1)}</div>`;
        }
        else{
         element.avatar = `<img src="${author.avatar}" alt="Error" class="News_avatar">`;
        }
        element.content = `${element.content.slice(0,500)}...`;
        element.dateParse = `${new Date(element.date).toLocaleDateString().slice(0,10)} ${new Date(element.date).toTimeString().slice(0, 5)}`;
        news.push(element);
        
      });
      if(req.session.userName == undefined){
        avatar = '<img src="/public/icon/Enter.svg" class="Avatar">';
        avatar2 = '<img src="/public/icon/Enter.svg" class="Avatar2">';
      }
      else{
        if(FullList[index].avatar == undefined){
          avatar =`<div class="Avatar">${req.session.userName.slice(0,1)}</div>`;
          avatar2 = `<div class="Avatar2">${req.session.userName.slice(0,1)}</div>`
        }
        else{
          avatar = `<img src="${FullList[index].avatar}" class="Avatar">`;
          avatar2 = `<img src="${FullList[index].avatar}" class="Avatar2">`;
        }
      }
      news.sort((el1, el2)=> el2.date - el1.date);
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