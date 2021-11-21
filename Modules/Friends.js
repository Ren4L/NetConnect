const express = require('express');
const router = express.Router();
const { getDatabase, ref, child, set, get } = require("firebase/database");
const firebasedb = require('./database');
const db = getDatabase();
const refdb = ref(getDatabase());

let Users = new Array();
  

router.use(express.json());
router.get('/', async(req, res)=>{
  let FullList;
  await get(child(refdb, `users`)).then((snapshot) => {FullList = snapshot.val(); }).catch((error) => {console.error(error);});
  let Acc;
  let flag = false;
  FullList.forEach(element => {
    if(element.login == req.session.userName){
      Acc = element;
      flag = true;
    }
  });
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
    let answer;
    switch (req.body.post) {
      case 'search':
        let arr = new Array();
        for(i = 0; i < FullList.length; i++){
          let regexp = new RegExp(req.body.name, 'i');
            if(FullList[i].login.match(regexp) != null && FullList[i].login != req.session.userName){
              let User = FullList[i];
              let buf, flag1 = false, flag2 = false, flag3 = false;
              if(Acc.friends != undefined){
                for(j = 0; j < Acc.friends.length; j++){
                  if(Acc.friends[j] == User.login){
                    flag1 = true;
                    break;
                  }
                }
              }
              if(Acc.applications != undefined){
                for(j = 0; j < Acc.applications.length; j++){
                  if(Acc.applications[j] == User.login){
                    flag2 = true;
                    break;
                  }
                }
              }
              if(Acc.sendApplications != undefined){
                for(u = 0; u < Acc.sendApplications.length; u++){
                  if(Acc.sendApplications[u] == User.login){
                    flag3 = true;
                    break;
                  }
                }
              }
              if(flag1){                
                buf = {
                  avatar:User.avatar,
                  email:User.email,
                  login:User.login,
                  friend:'yes'
                }
              }
              else if(flag2){
                buf = {
                  avatar:User.avatar,
                  email:User.email,
                  login:User.login,
                  friend:'application'
                }
              }else if(flag3){
                buf = {
                  avatar:User.avatar,
                  email:User.email,
                  login:User.login,
                  friend:'sendApplication'
                }
              }
              else{
                buf = {
                  avatar:User.avatar,
                  email:User.email,
                  login:User.login,
                  friend:'no'
                }
              }
              arr.push(buf);
            }
        }
        answer = {name:arr};
        break;
    
      case 'add':
        let index = -1;
        if(Acc.applications == undefined) Acc.applications = [];
        for(i = 0; i < Acc.applications.length; i++){
          if(Acc.applications[i] == req.body.name){
            index = i;
            break;
          }
        }
        if(Acc.friends == undefined) Acc.friends = [];
        if(index > -1){
          Acc.applications.splice(index,1);
          Acc.friends.push(req.body.name);
        }
        let Accec, indexec;
        FullList.forEach(el=>{
          if(el.login == req.body.name){
            Accec = el;
            indexec = FullList.indexOf(el);
          }
        })
        let index3 = -1;
        if(Accec.sendApplications == undefined) Accec.sendApplications = [];
        for(i = 0; i < Accec.sendApplications.length; i++){
          if(Accec.sendApplications[i] == req.session.userName){
            index3 = i;
            break;
          }
        }
        if(Accec.friends == undefined) Accec.friends = [];
        if(index3 > -1){
          Accec.sendApplications.splice(index3,1);
          Accec.friends.push(req.session.userName);
        }
        FullList[index] = Acc;
        FullList[indexec] = Accec;
        await set(ref(db, `users`), FullList);
        answer={flag:true};
        break;
      case 'send':
        if(Acc.sendApplications == undefined) Acc.sendApplications = [];
        Acc.sendApplications.push(req.body.name);
        let AccSA, indexSA, indexaCC = FullList.indexOf(Acc);
        FullList.forEach(element => {
          if(element.login == req.body.name){
            AccSA = element;
            indexSA = FullList.indexOf(element);
          }
        });
        if(AccSA.applications == undefined) AccSA.applications = [];
        AccSA.applications.push(req.session.userName);
        FullList[indexaCC] = Acc;
        FullList[indexSA] = AccSA;
        await set(ref(db, `users`), FullList);
        answer={flag:true};
      break;
      case  'friendsList':
        let arr2 = [];
        if(Acc.friends == undefined) Acc.friends = [];
        for(let i = 0; i < Acc.friends.length; i++){
          let bufferAcc;
          FullList.forEach(element => {
            if(element.login == Acc.friends[i])bufferAcc = element;
          });
          let buf = {login:bufferAcc.login, avatar:bufferAcc.avatar, email: bufferAcc.email};
          arr2.push(buf);
        }
        answer = {name:arr2};
      break;
      case 'delFr':
        index4 = -1;
        if(Acc.friends == undefined) Acc.friends = [];
        for(let i = 0; i < Acc.friends.length; i++){
          if(Acc.friends[i].login == req.body.name){
            index4 = i;
            break;
          }
        }
        Acc.friends.splice(index4,1);
        let indexDF, AccDF, indexACC = FullList.indexOf(Acc);
        FullList.forEach(element => {
          if(element.login == req.body.name) {
            AccDF = element;
            indexDF = FullList.indexOf(element);
          }
        });
        index5 = -1;
        if(AccDF.friends == undefined) AccDF.friends = [];
        for(let i = 0; i < AccDF.friends.length; i++){
          if(AccDF.friends[i] == req.session.userName){
            index5 = i;
            break;
          }
        }
        AccDF.friends.splice(index5,1);
        FullList[indexACC] = Acc;
        FullList[indexDF] = AccDF;
        await set(ref(db, `users`), FullList);
        answer={flag:true};
      break;
      case 'applicationList':
        let arr3 = [];
        if(Acc.applications == undefined) Acc.applications = [];
        for(let i = 0; i < Acc.applications.length; i++){
          let bufferAcc;
          FullList.forEach(element => {
            if(element.login == Acc.applications[i])bufferAcc = element;
          });
          let buf = {login:bufferAcc.login, avatar:bufferAcc.avatar, email: bufferAcc.email};
          arr3.push(buf);
        }
        answer = {name:arr3};
      break;
      case 'notAccept':
        
        index6 = -1, indexAcc = FullList.indexOf(Acc);
        if(Acc.friends == undefined) Acc.friends = [];
        for(let i = 0; i < Acc.friends.length; i++){
          if(Acc.applications[i] == req.body.name){
            index6 = i;
            break;
          }
        }
        Acc.applications.splice(index6,1);
        let index7 = -1, indexNA, AccNA;
        FullList.forEach(element => {
          if(element.login == req.body.name) {
            AccNA = element;
            indexNA = FullList.indexOf(element);
          }
        });
        if(AccNA.sendApplications == undefined) AccNA.sendApplications = [];
        for(let i = 0; i < AccNA.sendApplications.length; i++){
          if(AccNA.sendApplications[i] == req.session.userName){
            index7 = i;
            break;
          }
        }
        AccNA.sendApplications.splice(index7,1);
        FullList[indexAcc] = Acc;
        FullList[indexNA] = AccNA;
        await set(ref(db, `users`), FullList);
        answer={flag:true};
      break;
    }
    res.json(answer);
});

module.exports = router;