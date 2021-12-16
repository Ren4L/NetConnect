const express = require('express');
const router = express.Router();
const { getDatabase, ref, child, set, get } = require("firebase/database");
const firebasedb = require('./database');
const db = getDatabase();
const refdb = ref(getDatabase());


router.use(express.json());

router.get('/', async(req, res)=>{
    let FullList, flag = false;
    let avatar = '', avatar2 = '';
    await get(child(refdb, `users`)).then((snapshot) => {FullList = snapshot.val(); }).catch((error) => {console.error(error);});
    if(req.session.userName != undefined){
        let Acc, index;
        FullList.forEach(element => {
          if(element.login == req.session.userName){
            Acc = element;
            index = FullList.indexOf(element);
            flag = true;
          }
        });
        let Posts = new Array();
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
            if(Acc.friends == undefined) Acc.friends = [];
            for (let i = 0; i < Acc.friends.length; i++) { 
                let Fr;
                FullList.forEach(el=>{
                    if(el.login == Acc.friends[i]) Fr = el;
                })
                if(Fr.Posts == undefined) Fr.Posts = [];
                for (let j = 0; j < Fr.Posts.length; j++) {
                    let post = Fr.Posts[j];
                    if(post.likes != undefined) {
                        post.classLike = post.likes.indexOf(req.session.userName) == -1  ? 'Like' : 'LikeOn';
                    } 
                    else post.classLike = 'Like';
                    post.likes = post.likes == undefined ? 0 : post.likes.length;
                    post.login = Fr.login;
                    post.avatar = Fr.avatar == undefined ? `<div class="News_avatar_container">${Fr.login.slice(0,1)}</div>` : `<img src="${Fr.avatar}" class="News_avatar_container">`;
                    Posts.push(post);
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
        case "Like":
            let posts, post, index, indexP;
          FullList.forEach(element => {
              if(element.login == req.body.login) {posts = element.Posts; index = FullList.indexOf(element)}
          });
          posts.forEach(element => {
              if(element.date == req.body.name) {post = element; indexP = posts.indexOf(post)};
          });
          if(post.likes == undefined)post.likes = [];
          post.likes.push(req.session.userName);
          FullList[index].Posts[indexP] = post;
          await set(ref(db, `users`), FullList)
          let bufLK = {bool:true};
          res.json(bufLK);
        break;
        case "DisLike":
            let postsDis, postDis, indexDis, indexPDis;
            FullList.forEach(element => {
                if(element.login == req.body.login) {postsDis = element.Posts; indexDis = FullList.indexOf(element)}
            });
            postsDis.forEach(element => {
                if(element.date == req.body.name) {postDis = element; indexPDis = postsDis.indexOf(postDis)};
            });
            if(postDis.likes == undefined)postDis.likes = [];
            postDis.likes.splice(postDis.likes.indexOf(req.session.userName), postDis.likes.indexOf(req.session.userName) + 1);
            FullList[indexDis].Posts[indexPDis] = postDis;
            await set(ref(db, `users`), FullList)
            let bufDis = {bool:true};
            res.json(bufDis);
        break;
      }
});

module.exports = router;