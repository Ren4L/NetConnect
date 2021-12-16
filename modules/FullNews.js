const { render } = require('ejs');
const express = require('express');
const { getDatabase, ref, child, get } = require("firebase/database");
const firebasedb = require('./database');
const db = getDatabase();
const refdb = ref(getDatabase());
const router = express.Router();

router.use(express.json());

router.get('/:id', async (req, res)=>{
    let News;
    let indexU;
    let users;
    let avatar = '', avatar2 = '';
    await get(child(refdb, 'users')).then((snap)=>{users = snap.val();}).catch((err)=>{console.log(err);})
    await get(child(refdb, 'news')).then((snap)=>{News = snap.val();}).catch((err)=>{console.log(err);})
    let indexN;
    for (let i = 0; i < News.length; i++) {
      if(News[i].date == req.params.id){
        indexN = i;
      }
    }
    if(req.session.userName == undefined){
        avatar = '<img src="/public/icon/Enter.svg" class="Avatar">';
        avatar2 = '<img src="/public/icon/Enter.svg" class="Avatar2">';
      }
      else{
        for (let i = 0; i < users.length; i++) {
          if(users[i].login == req.session.userName){
            indexU = i;
          }
        }
        if(users[indexU].avatar == undefined){
          avatar =`<div class="Avatar">${req.session.userName.slice(0,1)}</div>`;
          avatar2 = `<div class="Avatar2">${req.session.userName.slice(0,1)}</div>`

        }
        else{
          avatar = `<img src="${users[indexU].avatar}" class="Avatar">`;
          avatar2 = `<img src="${users[indexU].avatar}" class="Avatar2">`;
        }
      }
      let author;
      for (let i = 0; i < users.length; i++) {
        if(users[i].login == News[indexN].author){author = users[i]}
      }
      if(author.avatar == undefined){
        author.avatar = `<div>${author.login.slice(0,1)}</div>`;

      }
      else{
        author.avatar = `<img src="${author.avatar}" alt="Error" class="Avatar_News">`
      }
      if(req.session.moder){
        res.render('FullNews',{avatar:avatar, avatar2:avatar2, title:News[indexN].title, content:News[indexN].content, NewsPhoto:News[indexN].NewsPhoto, author:News[indexN].author, date:`${new Date(News[indexN].date).toLocaleDateString().slice(0,10)} ${new Date(News[indexN].date).toTimeString().slice(0, 5)}`, avatarAuthor:author.avatar, dopPhoto:News[indexN].dopPhoto})
      }
      else{
        res.render('FullNewsNotModer',{avatar:avatar, avatar2:avatar2, title:News[indexN].title, content:News[indexN].content, NewsPhoto:News[indexN].NewsPhoto, author:News[indexN].author, date:`${new Date(News[indexN].date).toLocaleDateString().slice(0,10)} ${new Date(News[indexN].date).toTimeString().slice(0, 5)}`, avatarAuthor:author.avatar, dopPhoto:News[indexN].dopPhoto})
      }
      
    })
    .post('/', async(req, res)=>{
      let NewsList, New;
      await get(child(refdb, `news`)).then((snapshot) => {NewsList = snapshot.val(); }).catch((error) => {console.error(error);});
      NewsList.forEach(el=>{if(el.date == req.body.id) New = el});
      res.json(New);
    })

module.exports = router;