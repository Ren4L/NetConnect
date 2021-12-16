const express = require('express');
const router = express.Router();
const { getDatabase, ref, child, set, get } = require("firebase/database");
const firebasedb = require('./database');
const db = getDatabase();
const refdb = ref(getDatabase());


router.use(express.json());
router.get('/',async(req, res)=>{
  let avatar = '', avatar2 = '';
  if(req.session.userName != undefined){
    let FullList;
  await get(child(refdb, `users`)).then((snapshot) => {FullList = snapshot.val(); }).catch((error) => {console.error(error);});
  let Acc;
  FullList.forEach(element => {
    if(element.login == req.session.userName){
      Acc = element;
    }
  });
  let Person ={
    login:Acc.login,
    avatar:Acc.avatar == undefined ? `<div class="avatar">${Acc.login.slice(0,1)}</div>` : `<img src="${Acc.avatar}" class="avatar">`,
    FriendsNum:Acc.friends != undefined ? Acc.friends.length : 0,
    PhotosNum:Acc.Photos != undefined ? Acc.Photos.length : 0,
    VideosNum:Acc.Videos != undefined ? Acc.Videos.length : 0,
    PostsNum:Acc.Posts != undefined ? Acc.Posts.length : 0,
    friends:[],
    Photos:[],
    Videos:[],
    Posts:[]
  }

  for(let i = 0; i < (Person.FriendsNum < 3 ? Person.FriendsNum : 3 ); i++){
    let Fr;
    FullList.forEach(element => {if(element.login == Acc.friends[i]) Fr = element})
    let buf = {
      login:Fr.login,
      avatar:undefined
    }
    if(Fr.avatar != undefined){
      buf.avatar = `<img src="${Fr.avatar}" class="avatarFriend">`;
    }
    else{
      buf.avatar = `<div class="avatarFriend">${buf.login.slice(0,1)}</div>`;
    }
    Person.friends.push(buf);
  }

  for(let i = 0; i < (Person.PhotosNum < 3 ? Person.PhotosNum : 3 ); i++){
    let buf = {
      photo:Acc.Photos[i]
    }
    Person.Photos.push(buf);
  }
  
  for(let i = 0; i < (Person.VideosNum < 3 ? Person.VideosNum : 3 ); i++){
    let buf = {
      video:Acc.Videos[i]
    }
    Person.Videos.push(buf);
  }

  let PI = {
    Firstname:(Acc.firstName!=undefined?Acc.firstName:''),
    Lastname:(Acc.lastName!=undefined?Acc.lastName:''),
    Patronymic:(Acc.patronymic!=undefined?Acc.patronymic:''),
    Gender: (Acc.gender!=undefined?Acc.gender:''),
    Date: (Acc.date!=undefined?Acc.date:''),
    Country: (Acc.country!=undefined?Acc.country:''),
    City: (Acc.city!=undefined?Acc.city:''),
    Visibility: (Acc.visibility!=undefined?Acc.visibility:'')
  }
  let PIEnd = '';
    for (let key in PI) {
      if(PI[key] != '' && key != 'Visibility'){
        PIEnd+=`<div class="PIText"><strong>${key}</strong>: ${PI[key]}</div>`;
      }
    }
    if(PIEnd == ''){
      PIEnd = '<div align="center" class="PIText"><strong>No information</strong></div>';
    }
    let Posts = new Array();
    if(Acc.Posts != undefined){
      for (let i = 0; i < Acc.Posts.length; i++) {
        let post = Acc.Posts[i];
        if(post.likes != undefined) post.classLike = post.likes.indexOf(req.session.userName) == -1 || undefined ? 'Like' : 'LikeOn'; 
        else post.classLike = 'Like';
        post.likes = post.likes == undefined ? 0 : post.likes.length;
        post.login = Acc.login;
        post.avatar = Acc.avatar == undefined ? `<div class="News_avatar_container">${Acc.login.slice(0,1)}</div>` : `<img src="${Acc.avatar}" class="News_avatar_container">`;
        Posts.push(post);
      }
      Posts.reverse();
    }
    let flag = false;
    for (let i = 0; i < FullList.length; i++) {
      if(FullList[i].login == req.session.userName){
        login = FullList[i].login;
        flag = true;
      }
    }
    if(req.session.userName == undefined){
        avatar = '<img src="/public/icon/Enter.svg" class="Avatar">';
        avatar2 = '<img src="/public/icon/Enter.svg" class="Avatar2">';
      }
      else{
        if(Acc.avatar == undefined){
          avatar =`<div class="Avatar">${req.session.userName.slice(0,1)}</div>`;
          avatar2 = `<div class="Avatar2">${req.session.userName.slice(0,1)}</div>`
        }
        else{
          avatar = `<img src="${Acc.avatar}" class="Avatar">`;
          avatar2 = `<img src="${Acc.avatar}" class="Avatar2">`;
        }
      }
      if(flag){
        if(req.session.moder){
          res.render('Home',{avatar:avatar, avatar2:avatar2, Person:Person, PI:PIEnd, Posts:Posts})
        }
        else{
          res.render('HomeNotModer',{avatar:avatar, avatar2:avatar2, Person:Person, PI:PIEnd, Posts:Posts})
        }
      }
      else{
        res.render('Authorization',{avatar:avatar, avatar2:avatar2})
      }
  }
  else{
    res.render('Authorization');
  }
})
  .post('/', async(req, res)=>{
    let FullList;
    await get(child(refdb, `users`)).then((snapshot) => {FullList = snapshot.val(); }).catch((error) => {console.error(error);});
    let Acc, index;
    FullList.forEach(element => {
      if(element.login == req.session.userName){
        Acc = element;
        index = FullList.indexOf(element);
      }
    });
    switch (req.body.post) {
      case "FrNum":
        let FrList = {list:[]};
        for (let i = 0; i < Acc.friends.length; i++) {
          let objFr;
          FullList.forEach(el=>{
            if(el.login == Acc.friends[i]){objFr = el}
          })
          let buf = {
            login: objFr.login,
            avatar: objFr.avatar
          }
          FrList.list.push(buf);
        }
        res.json(FrList);
        break;
      case "PhNum":
        res.json(Acc.Photos);
        break;
      case "ViNum":
        res.json(Acc.Videos);
        break;
      case "NewPost":
        if(Acc.Posts == undefined) Acc.Posts = [];
        let buf = {date: req.body.date, content: req.body.content}
        Acc.Posts.push(buf);
        FullList[index] = Acc;
        await set(ref(db, `users`), FullList)
        buf.likes = [];
        buf.login = req.session.userName;
        buf.avatar = Acc.avatar;
        res.json(buf)
        break;
        case 'DelPost':
          for (let i = 0; i < Acc.Posts.length; i++) {
            if(Acc.Posts[i].date == req.body.name){ Acc.Posts.splice(i, i+1)}
          }
          FullList[index] = Acc;
          await set(ref(db, `users`), FullList)
          let buff = {bool:true}
          res.json(buff);
        break;  
        case "Like":
          let post, indexP;
          Acc.Posts.forEach(el=>{if(el.date == req.body.name){post = el; indexP = Acc.Posts.indexOf(el)}})
          if(post.likes == undefined)post.likes = [];
          post.likes.push(req.session.userName);
          Acc.Posts[indexP] = post;
          FullList[index] = Acc;
          await set(ref(db, `users`), FullList)
          let bufLK = {bool:true};
          res.json(bufLK);
        break;
        case "DisLike":
          let delpost, indexdel;
          Acc.Posts.forEach(el=>{if(el.date == req.body.name){delpost = el; indexdel = Acc.Posts.indexOf(el)}})
          delpost.likes.splice(delpost.likes.indexOf(req.session.userName), delpost.likes.indexOf(req.session.userName) + 1);
          Acc.Posts[indexdel] = delpost;
          FullList[index] = Acc;
          await set(ref(db, `users`), FullList)
          let bufDis = {bool:true};
          res.json(bufDis);
        break;
    }
  });

module.exports = router;