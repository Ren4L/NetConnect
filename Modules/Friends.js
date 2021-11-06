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
              let buf, flag1 = false, flag2 = false, flag3 = false;
              for(j = 0; j < objREQ.friends.length; j++){
                if(objREQ.friends[j].login == Users[i]){
                  flag1 = true;
                  break;
                }
              }
              for(j = 0; j < objREQ.applications.length; j++){
                if(objREQ.applications[j].login == Users[i]){
                  flag2 = true;
                  break;
                }
              }
              for(u = 0; u < objREQ.sendApplications.length; u++){
                if(objREQ.sendApplications[u].login == Users[i]){
                  flag3 = true;
                  break;
                }
              }
              if(flag1){                
                buf = {
                  avatar:obj.avatar,
                  email:obj.email,
                  login:Users[i],
                  friend:'yes'
                }
              }
              else if(flag2){
                buf = {
                  avatar:obj.avatar,
                  email:obj.email,
                  login:Users[i],
                  friend:'application'
                }
              }else if(flag3){
                buf = {
                  avatar:obj.avatar,
                  email:obj.email,
                  login:Users[i],
                  friend:'sendApplication'
                }
              }
              else{
                buf = {
                  avatar:obj.avatar,
                  email:obj.email,
                  login:Users[i],
                  friend:'no'
                }
              }
              arr.push(buf);
            }
        }
        answer = {name:arr};
        break;
    
      case 'add':
        let readFile = fs.readFileSync(`./Public/Users/${req.session.userName}.json`, 'utf-8');
        let obj = new Function(`return ${readFile}`)();
        let index = -1;
        for(i = 0; i < obj.applications.length; i++){
          if(obj.applications[i].login == req.body.name){
            index = i;
            break;
          }
        }
        if(index > -1){
          obj.applications.splice(index,1);
          buff = {login: req.body.name};
          obj.friends.push(buff);
        }
        fs.writeFileSync(`./Public/Users/${req.session.userName}.json`, JSON.stringify(obj, null, ' '));
        let read = fs.readFileSync(`./Public/Users/${req.body.name}.json`, 'utf-8');
        let objec = new Function(`return ${read}`)();
        let index3 = -1;
        for(i = 0; i < objec.sendApplications.length; i++){
          if(objec.sendApplications[i].login == req.session.userName){
            index3 = i;
            break;
          }
        }
        if(index3 > -1){
          objec.sendApplications.splice(index3,1);
          buf1 = {login: req.session.userName};
          objec.friends.push(buf1);
        }
        fs.writeFileSync(`./Public/Users/${req.body.name}.json`, JSON.stringify(objec, null, ' '));
        answer={flag:true};
        break;
      case 'send':
        let readFile2 = fs.readFileSync(`./Public/Users/${req.session.userName}.json`, 'utf-8');
        let obj2 = new Function(`return ${readFile2}`)();
        let buf = {login: req.body.name};
        obj2.sendApplications.push(buf);
        console.log(obj2);
        fs.writeFileSync(`./Public/Users/${req.session.userName}.json`, JSON.stringify(obj2, null, ' '));
        let readFile3 = fs.readFileSync(`./Public/Users/${req.body.name}.json`, 'utf-8');
        let obj3 = new Function(`return ${readFile3}`)();
        buf = {login: req.session.userName};
        obj3.applications.push(buf);
        fs.writeFileSync(`./Public/Users/${req.body.name}.json`, JSON.stringify(obj3, null, ' '));
        answer={flag:true};
      break;
      case  'friendsList':
        let readFile4 = fs.readFileSync(`./Public/Users/${req.session.userName}.json`, 'utf-8');
        let obj4 = new Function(`return ${readFile4}`)();
        let arr2 = new Array();
        for(let i = 0; i < obj4.friends.length; i++){
          let bufferRead = fs.readFileSync(`./Public/Users/${obj4.friends[i].login}.json`, 'utf-8');
          let bufferObj = new Function(`return ${bufferRead}`)();
          let buf = {login:bufferObj.login, avatar:bufferObj.avatar, email: bufferObj.email};
          arr2.push(buf);
        }
        answer = {name:arr2};
      break;
      case 'delFr':
        let readFile5 = fs.readFileSync(`./Public/Users/${req.session.userName}.json`, 'utf-8');
        let obj5 = new Function(`return ${readFile5}`)();
        index4 = -1;
        for(let i = 0; i < obj5.friends.length; i++){
          if(obj5.friends[i].login == req.body.name){
            index4 = i;
            break;
          }
        }
        obj5.friends.splice(index4,1);
        fs.writeFileSync(`./Public/Users/${req.session.userName}.json`, JSON.stringify(obj5, null, ' '));

        let readFile6 = fs.readFileSync(`./Public/Users/${req.body.name}.json`, 'utf-8');
        let obj6 = new Function(`return ${readFile6}`)();
        index5 = -1;
        for(let i = 0; i < obj6.friends.length; i++){
          if(obj6.friends[i].login == req.session.userName){
            index5 = i;
            break;
          }
        }
        obj6.friends.splice(index5,1);
        fs.writeFileSync(`./Public/Users/${req.body.name}.json`, JSON.stringify(obj6, null, ' '));
        answer={flag:true};
      break;
      case 'applicationList':
        let readFile7 = fs.readFileSync(`./Public/Users/${req.session.userName}.json`, 'utf-8');
        let obj7 = new Function(`return ${readFile7}`)();
        let arr3 = new Array();
        for(let i = 0; i < obj7.applications.length; i++){
          let bufferRead = fs.readFileSync(`./Public/Users/${obj7.applications[i].login}.json`, 'utf-8');
          let bufferObj = new Function(`return ${bufferRead}`)();
          let buf = {login:bufferObj.login, avatar:bufferObj.avatar, email: bufferObj.email};
          arr3.push(buf);
        }
        answer = {name:arr3};
      break;
      case 'notAccept':
        let readFile8 = fs.readFileSync(`./Public/Users/${req.session.userName}.json`, 'utf-8');
        let obj8 = new Function(`return ${readFile8}`)();
        index6 = -1;
        for(let i = 0; i < obj8.friends.length; i++){
          if(obj8.applications[i].login == req.body.name){
            index6 = i;
            break;
          }
        }
        obj8.applications.splice(index6,1);
        fs.writeFileSync(`./Public/Users/${req.session.userName}.json`, JSON.stringify(obj8, null, ' '));

        let readFile9 = fs.readFileSync(`./Public/Users/${req.body.name}.json`, 'utf-8');
        let obj9 = new Function(`return ${readFile9}`)();
        index7 = -1;
        for(let i = 0; i < obj9.sendApplications.length; i++){
          if(obj9.sendApplications[i].login == req.session.userName){
            index7 = i;
            break;
          }
        }
        obj9.sendApplications.splice(index7,1);
        fs.writeFileSync(`./Public/Users/${req.body.name}.json`, JSON.stringify(obj9, null, ' '));
        answer={flag:true};
      break;
    }
    res.json(answer);
});

module.exports = router;