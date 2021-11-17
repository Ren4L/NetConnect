const express = require('express');
const fs = require('fs');
const router = express.Router();


router.use(express.json());
router.get('/',(req, res)=>{
  if(req.session.userName != undefined){
    let readAcc = fs.readFileSync(`./Public/Users/${req.session.userName}.json`,'utf-8');
  let Acc = new Function(`return(${readAcc})`)();
  let Person ={
    login:Acc.login,
    avatar:Acc.avatar == '' ? `<div class="avatar">${Acc.login.slice(0,1)}</div>` : `<img src="/Public/Files/${Acc.avatar}" class="avatar">`,
    friends:[],
    Photos:[],
    Videos:[],
    FriendsNum:Acc.friends != undefined ? Acc.friends.length : 0,
    PhotosNum:Acc.Photos != undefined ? Acc.Photos.length : 0,
    VideosNum:Acc.Videos != undefined ? Acc.Videos.length : 0,
    PostsNum:Acc.Posts != undefined ? Acc.Posts.length : 0,
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
    if(Acc.Posts == undefined){Acc.Posts = []}
    let Posts = new Array();
    for (let i = 0; i < Acc.Posts.length; i++) {
      let readPost = fs.readFileSync(`./Public/Posts/${req.session.userName}/${Acc.Posts[i].date}.json`);
      let post = new Function(`return ${readPost}`)();
      post.classLike = post.likes.indexOf(req.session.userName) == -1 ? 'Like' : 'LikeOn'; 
      post.likes = post.likes.length;
      post.avatar = Acc.avatar == '' ? `<div class="News_avatar_container">${post.login.slice(0,1)}</div>` : `<img src="/Public/Files/${Acc.avatar}" class="News_avatar_container">`;
      Posts.push(post);
    }
    Posts.reverse();
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
  .post('/', (req, res)=>{
    switch (req.body.post) {
      case "FrNum":
        let readFile = fs.readFileSync(`./Public/Users/${req.session.userName}.json`, 'utf-8');
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
      case "PhNum":
        let readFileP = fs.readFileSync(`./Public/Users/${req.session.userName}.json`, 'utf-8');
        let objP = new Function(`return ${readFileP}`)();
        res.json(objP.Photos);
        break;
      case "ViNum":
        let readFileV = fs.readFileSync(`./Public/Users/${req.session.userName}.json`, 'utf-8');
        let objV = new Function(`return ${readFileV}`)();
        res.json(objV.Videos);
        break;
      case "NewPost":
        let readFileNP = fs.readFileSync(`./Public/Users/${req.session.userName}.json`, 'utf-8');
        let objNP = new Function(`return ${readFileNP}`)();
        if(objNP.Posts == undefined){objNP.Posts = [];}
        let buf = {date: req.body.date, content: req.body.content}
        objNP.Posts.push(buf);
        fs.stat(`./Public/Posts/${req.session.userName}`, function(err) {
          console.log(err);
        });
        fs.writeFileSync(`./Public/Users/${req.session.userName}.json`, JSON.stringify( objNP, null, ' '));
        buf.likes = [];
        buf.login = req.session.userName;
        buf.avatar = objNP.avatar;
        fs.writeFileSync(`./Public/Posts/${req.session.userName}/${req.body.date}.json`, JSON.stringify( buf, null, ' '));
        res.json(buf)
        break;
        case 'DelPost':
          fs.unlink(`./Public/Posts/${req.session.userName}/${req.body.name}.json`, function(err){
            if (err) {
                console.log(err);
            }
        });
          let readFileDP = fs.readFileSync(`./Public/Users/${req.session.userName}.json`, 'utf-8');
          let objDP = new Function(`return ${readFileDP}`)();
          for (let i = 0; i < objDP.Posts.length; i++) {
            if(objDP.Posts[i].date == req.body.name){
              objDP.Posts.splice(i,i+1);
            }
          }
          fs.writeFileSync(`./Public/Users/${req.session.userName}.json`, JSON.stringify( objDP, null, ' '));
          let buff = {bool:true}
          res.json(buff);
        break;  
        case "Like":
          let readPost = fs.readFileSync(`./Public/Posts/${req.session.userName}/${req.body.name}.json`);
          let post = new Function(`return ${readPost}`)();
          post.likes.push(req.session.userName);
          fs.writeFileSync(`./Public/Posts/${req.session.userName}/${req.body.name}.json`, JSON.stringify( post, null, ' '));
          let bufLK = {bool:true};
          res.json(bufLK);
        break;
        case "DisLike":
          let readPostDis = fs.readFileSync(`./Public/Posts/${req.session.userName}/${req.body.name}.json`);
          let postDis = new Function(`return ${readPostDis}`)();
          postDis.likes.splice(postDis.likes.indexOf(req.session.userName), postDis.likes.indexOf(req.session.userName) + 1);
          fs.writeFileSync(`./Public/Posts/${req.session.userName}/${req.body.name}.json`, JSON.stringify( postDis, null, ' '));
          let bufDis = {bool:true};
          res.json(bufDis);
        break;
    }
  });

module.exports = router;