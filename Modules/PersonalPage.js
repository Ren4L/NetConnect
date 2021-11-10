const express = require('express');
const fs = require('fs');
const router = express.Router();


router.use(express.json());
router.get('/:id',(req, res)=>{
  fs.access(`./Public/Users/${req.params.id}.json`,(error)=>{
    if(error){
      res.render('404NotFound');
    }
    else{
      let readAcc = fs.readFileSync(`./Public/Users/${req.params.id}.json`,'utf-8');
      let Acc = new Function(`return(${readAcc})`)();
      let Person ={
        login:Acc.login,
        avatar:'',
        friends:[],
        FriendsNum:Acc.friends != undefined ? Acc.friends.length : 0,
        PhotosNum:Acc.Photos != undefined ? Acc.Photos.length : 0,
        VideosNum:Acc.Videos != undefined ? Acc.Videos.length : 0,
        PostsNum:1,
      }
      if(Acc.avatar==''){
        Person.avatar = `<div class="avatar">${Acc.login.slice(0,1)}</div>`;
      }
      else{
        Person.avatar = `<img src="/Public/Files/${Acc.avatar}" class="avatar">`;
      }

      for(let i = 0; i < (Person.FriendsNum < 3 ? Person.FriendsNum : 3 ); i++){
        let readFr = fs.readFileSync(`./Public/Users/${Acc.friends[i].login}.json`,'utf-8');
        let Fr = new Function(`return(${readFr})`)();
        let buf = {
          login:Fr.login,
          avatar:''
        }
        if(Fr.avatar != ''){
          buf.avatar = `<img src="/Public/Files/${Fr.avatar}" class="avatarFriend">`;
        }
        else{
          buf.avatar = `<div class="avatarFriend">${buf.login.slice(0,1)}</div>`;
        }
        Person.friends.push(buf);
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
        if(Acc.friends != undefined){
          let flag = false;
          for(let i = 0; i < Acc.friends.length; i++){
            if(Acc.friends[i].login == req.session.userName){
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
              res.render('PersonalPageTemplate',{avatar:avatar, avatar2:avatar2, Person:Person, PI:PIEnd})
            }
            else{
              res.render('PersonalPageTemplateNotModer',{avatar:avatar, avatar2:avatar2, Person:Person, PI:PIEnd})
            }
          }
          else{
            res.render('Authorization',{avatar:avatar, avatar2:avatar2})
          }
    }
  });
})
  .post('/', (req, res)=>{
    switch (req.body.post) {
      case "FrNum":
        let readFile = fs.readFileSync(`./Public/Users/${req.body.login}.json`, 'utf-8');
        let obj = new Function(`return ${readFile}`)();
        let FrList = {list:[]};
        for (let i = 0; i < obj.friends.length; i++) {
          let read = fs.readFileSync(`./Public/Users/${obj.friends[i].login}.json`);
          let objFr = new Function(`return ${read}`)();
          let buf = {
            login: objFr.login,
            avatar: objFr.avatar
          }
          FrList.list.push(buf);
        }
        res.json(FrList);
        break;
    }
  });

module.exports = router;