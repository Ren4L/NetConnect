const express = require('express');
const fs = require('fs');
const router = express.Router();

router.use(express.json());

router.get('/', (req, res)=>{
    if(req.session.userName != undefined){
        let Posts = new Array();
        let flag = false;
        if(req.session.userName == undefined){
            avatar = '<img src="/Public/ICON/Enter.svg" class="Avatar">';
            avatar2 = '<img src="/Public/ICON/Enter.svg" class="Avatar2">';
        }
        else{
            let readFile = fs.readFileSync('./Public/Users/FullList.json','utf-8');
            let obj = new Function(`return (${readFile})`)();
            let readFile2 = fs.readFileSync(`./Public/Users/${req.session.userName}.json`, 'utf-8');
            let obj2 = new Function(`return (${readFile2})`)();
            for (let i = 0; i < obj.Users.length; i++) {
            if(obj.Users[i].login == req.session.userName){
                login = obj.Users[i].login;
                flag = true;
            }
            }
            if(obj2.avatar == ''){
            avatar =`<div class="Avatar">${req.session.userName.slice(0,1)}</div>`;
            avatar2 = `<div class="Avatar2">${req.session.userName.slice(0,1)}</div>`
            }
            else{
            avatar = `<img src="/Public/Files/${obj2.avatar}" class="Avatar">`;
            avatar2 = `<img src="/Public/Files/${obj2.avatar}" class="Avatar2">`;
            }
            for (let i = 0; i < obj2.friends.length; i++) { 
                let readFile3 = fs.readFileSync(`./Public/Users/${obj2.friends[i].login}.json`, 'utf-8');
                let obj3 = new Function(`return (${readFile3})`)();
                for (let j = 0; j < obj3.Posts.length; j++) {
                    let readFile5 = fs.readFileSync(`./Public/Users/${obj2.friends[i].login}.json`, 'utf-8');
                    let obj5 = new Function(`return (${readFile5})`)();
                    let readFile4 = fs.readFileSync(`./Public/Posts/${obj2.friends[i].login}/${obj3.Posts[j].date}.json`, 'utf-8');
                    let obj4 = new Function(`return (${readFile4})`)();
                    obj4.classLike = obj4.likes.indexOf(req.session.userName) == -1 ? 'Like' : 'LikeOn';
                    obj4.avatar = obj5.avatar == '' ? `<div class="News_avatar_container">${obj4.login.slice(0,1)}</div>` : `<img src="/Public/Files/${obj5.avatar}" class="News_avatar_container">`;
                    Posts.push(obj4);
                }
            }
            Posts.sort((el1, el2)=> el2.date - el1.date);
        }
        if(flag){
            if(req.session.moder){
            res.render('Posts',{avatar:avatar, avatar2:avatar2, Posts:Posts})
            }
            else{
            res.render('PostsNotModer',{avatar:avatar, avatar2:avatar2, Posts:Posts})
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
        case "Like":
          let readPost = fs.readFileSync(`./Public/Posts/${req.body.login}/${req.body.name}.json`);
          let post = new Function(`return ${readPost}`)();
          post.likes.push(req.session.userName);
          fs.writeFileSync(`./Public/Posts/${req.body.login}/${req.body.name}.json`, JSON.stringify( post, null, ' '));
          let bufLK = {bool:true};
          res.json(bufLK);
        break;
        case "DisLike":
          let readPostDis = fs.readFileSync(`./Public/Posts/${req.body.login}/${req.body.name}.json`);
          let postDis = new Function(`return ${readPostDis}`)();
          postDis.likes.splice(postDis.likes.indexOf(req.session.userName), postDis.likes.indexOf(req.session.userName) + 1);
          fs.writeFileSync(`./Public/Posts/${req.body.login}/${req.body.name}.json`, JSON.stringify( postDis, null, ' '));
          let bufDis = {bool:true};
          res.json(bufDis);
        break;
      }
});

module.exports = router;