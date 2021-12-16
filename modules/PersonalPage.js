const express = require('express');
const router = express.Router();
const { getDatabase, ref, child, set, get } = require("firebase/database");
const firebasedb = require('./database');
const db = getDatabase();
const refdb = ref(getDatabase());



router.use(express.json());
router.get('/:id',async(req, res)=>{
  let avatar = '<img src="/public/icon/Enter.svg" class="Avatar">', avatar2 = '<img src="/public/icon/Enter.svg" class="Avatar2">';
  if(req.session.userName != undefined){
    let FullList, flag = false;
    await get(child(refdb, `users`)).then((snapshot) => {FullList = snapshot.val(); }).catch((error) => {console.error(error);});
    let Acc, PAcc, index, Pindex;
    FullList.forEach(element => {
      if(element.login == req.session.userName){
        Acc = element;
        index = FullList.indexOf(element);
      }
    });
    FullList.forEach(element => {
      if(element.login == req.params.id){
        flag = true;
        PAcc = element;
        Pindex = FullList.indexOf(element);
      }
    });
    if(!flag){
      res.render('404NotFound');
    }
    else{
      let Person ={
        login:PAcc.login,
        avatar:undefined,
        friends:[],
        Photos:[],
        Videos:[],
        Posts:[],
        FriendsNum:PAcc.friends != undefined ? PAcc.friends.length : 0,
        PhotosNum:PAcc.Photos != undefined ? PAcc.Photos.length : 0,
        VideosNum:PAcc.Videos != undefined ? PAcc.Videos.length : 0,
        PostsNum:PAcc.Posts != undefined ? PAcc.Posts.length : 0,
      }
      if(PAcc.avatar == undefined){
        Person.avatar = `<div class="avatar">${PAcc.login.slice(0,1)}</div>`;
      }
      else{
        Person.avatar = `<img src="${PAcc.avatar}" class="avatar">`;
      }

      for(let i = 0; i < (Person.FriendsNum < 3 ? Person.FriendsNum : 3 ); i++){
        let Fr;
        FullList.forEach(el=>{
          if(el.login == PAcc.friends[i])Fr = el;
        })
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
          photo:PAcc.Photos[i]
        }
        Person.Photos.push(buf);
      }
      
      for(let i = 0; i < (Person.VideosNum < 3 ? Person.VideosNum : 3 ); i++){
        let buf = {
          video:PAcc.Videos[i]
        }
        Person.Videos.push(buf);
      }

      let PI = {
        Firstname:(PAcc.firstName!=undefined?PAcc.firstName:''),
        Lastname:(PAcc.lastName!=undefined?PAcc.lastName:''),
        Patronymic:(PAcc.patronymic!=undefined?PAcc.patronymic:''),
        Gender: (PAcc.gender!=undefined?PAcc.gender:''),
        Date: (PAcc.date!=undefined?PAcc.date:''),
        Country: (PAcc.country!=undefined?PAcc.country:''),
        City: (PAcc.city!=undefined?PAcc.city:''),
        Visibility: (PAcc.visibility!=undefined?PAcc.visibility:'')
      }
      let PIEnd = '';
      if(PI.Visibility == '' || PI.Visibility == 'Everything'){
        for (let key in PI) {
          if(PI[key] != '' && key != 'Visibility'){
            PIEnd+=`<div class="PIText"><strong>${key}</strong>: ${PI[key]}</div>`;
          }
        }
        if(PIEnd == ''){
          PIEnd = '<div align="center" class="PIText"><strong>No information</strong></div>';
        }
      }
      else if(PI.Visibility == 'Only friends'){
        if(PAcc.friends != undefined){
          let flag = false;
          for(let i = 0; i < PAcc.friends.length; i++){
            if(PAcc.friends[i] == req.session.userName){
              flag = true;
            }
          }
          if(flag){
            for (let key in PI) {
              if(PI[key] != '' && key != 'Visibility'){
                PIEnd+=`<div class="PIText"><strong>${key}</strong>: ${PI[key]}</div>`;
              }
            }
            if(PIEnd == ''){
              PIEnd = '<div align="center" class="PIText"><strong>No information</strong></div>';
            }
          }
          else{
            PIEnd = `<div class="PIText" align="center"><strong>Information is not available</strong></div>`
          }
        }
        }
      else if(PI.Visibility == 'No one'){
        PIEnd = `<div class="PIText" align="center"><strong>Information is not available</strong></div>`
      }
      let Posts = new Array();
      if(PAcc.Posts == undefined){PAcc.Posts = [];}
      for (let i = 0; i < PAcc.Posts.length; i++) {
        let post;
        PAcc.Posts.forEach(el=>{
          if(el.date == PAcc.Posts[i].date)post = el;
        })
        if(post.likes == undefined) post.likes = [];
        post.login = PAcc.login;
        post.classLike = post.likes.indexOf(req.session.userName) == -1 ? 'Like' : 'LikeOn'; 
        post.likes = post.likes.length;
        post.avatar = PAcc.avatar == undefined ? `<div class="News_avatar_container">${PAcc.login.slice(0,1)}</div>` : `<img src="${PAcc.avatar}" class="News_avatar_container">`;
        Posts.push(post);
      }
      Posts.reverse();
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
              if(req.session.userName == req.params.id){
                res.redirect('/modules/Home');
              }
              else{
                res.render('PersonalPageTemplate',{avatar:avatar, avatar2:avatar2, Person:Person, PI:PIEnd, Posts:Posts})
              }
            }
            else{
              if(req.session.userName == req.params.id){
                res.redirect('/modules/HomeNotModer');
              }
              else{
                res.render('PersonalPageTemplateNotModer',{avatar:avatar, avatar2:avatar2, Person:Person, PI:PIEnd, Posts:Posts})
              }
            }
          }
          else{
            res.render('Authorization',{avatar:avatar, avatar2:avatar2})
          }
    }
  }
  else{res.render('Authorization',{avatar:avatar, avatar2:avatar2})}
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
    let AccFr, indexFr;
    FullList.forEach(el=>{
      if(el.login == req.body.login){
        AccFr = el;
        indexFr = FullList.indexOf(el);
      }
    })
    switch (req.body.post) {
      case "FrNum":
        let List = {list:[]};
        for (let i = 0; i < AccFr.friends.length; i++) {
          let F;
          FullList.forEach(el=>{
            if(AccFr.friends[i] == el.login)F = el;
          })
          let buf = {
            login: F.login,
            avatar: F.avatar
          }
          List.list.push(buf);
        }
        res.json(List);
        break;
      case "PhNum":
        res.json(AccFr.Photos);
        break;
      case "ViNum":
        res.json(AccFr.Videos);
        break;
      case "Like":
        let post;
        AccFr.Posts.forEach(el=>{
          if(el.date == req.body.name)post = el;
        })
        if(post.likes == undefined)post.likes = [];
        post.likes.push(req.session.userName);
        FullList[indexFr]=AccFr;
        await set(ref(db, `users`), FullList);
        let bufLK = {bool:true};
        res.json(bufLK);
      break;
      case "DisLike":
        let postDis;
        AccFr.Posts.forEach(el=>{
          if(el.date == req.body.name)postDis = el;
        })
        if(postDis.likes == undefined)postDis.likes = [];
        postDis.likes.splice(postDis.likes.indexOf(req.session.userName), postDis.likes.indexOf(req.session.userName) + 1);
        FullList[indexFr]=AccFr;
        await set(ref(db, `users`), FullList);
        let bufDis = {bool:true};
        res.json(bufDis);
      break;
    }
  });

module.exports = router;