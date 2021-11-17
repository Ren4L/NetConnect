let flag = true;
let PostFlag = true;
let LikeFlag = true;
document.querySelector('.Show').addEventListener('click', ()=>{
    if(flag){
        flag = false;
        document.querySelector('.ShowIcon').style.transform = `scale(1,-1)`;
        document.querySelector('.PI').style.height = `${40 + (document.querySelector('.PI').children.length - 1) * 30}px`;
    }
    else{
        flag = true;
        document.querySelector('.ShowIcon').style.transform = `scale(1,1)`;
        document.querySelector('.PI').style.height = '40px';
    }
});

document.querySelector('.ListFPV').addEventListener('click',(e)=>{
    let target = e.target;
    if(target.tagName != 'FIGURE' && target.tagName != 'FIGCAPTION' && target.tagName != 'A' && target.tagName != 'IMG'){
        OpenFriend();
    }
});

function OpenFriend(){
    if(document.querySelector('.FrNum').innerHTML.match(/(.+?)<br>/)[1] != 0){
        let req = new XMLHttpRequest();
        req.overrideMimeType('application/json');
        req.open('POST','/Modules/Home', true)
        req.setRequestHeader('Content-type', 'application/json');
        let container = document.createElement('div');
        let back = document.createElement('div');
        let FrList = document.createElement('div');
        container.className = 'containerModal'
        back.className = 'back';
        back.setAttribute('onclick','del(this)');
        FrList.className = 'List';
        FrList.innerHTML = '<div style="font-size:26pt;"><strong>Friends</strong></div>';
        req.addEventListener('load', ()=>{
            let answer = JSON.parse(req.response);
            FrList.innerHTML += '<div class="Con"></div>';
            for (let i = 0; i < answer.list.length; i++) {
                if(answer.list[i].avatar != ''){
                    document.querySelector('.Con').innerHTML += `<a href="/Modules/PersonalPage/${answer.list[i].login}" style="display:flex; flex-direction:column; align-items:center; padding: 15px;"><img src = "/Public/Files/${answer.list[i].avatar}" class="avatarFr"><div style="font-size:20pt">${answer.list[i].login}</div></a>`
                } 
                else{
                    document.querySelector('.Con').innerHTML += `<a href="/Modules/PersonalPage/${answer.list[i].login}" style="display:flex; flex-direction:column; align-items:center; padding: 15px;"><div class="avatarFr">${answer.list[i].login.slice(0,1)}</div><div style="font-size:20pt">${answer.list[i].login}</div></a>`
                }   
            }
        });
        let post = {post:'FrNum'};
        req.send(JSON.stringify(post));
        document.body.style.overflowY = 'hidden';
        document.body.style.overflowX = 'hidden';
        container.prepend(FrList);
        container.prepend(back); 
        document.body.prepend(container);
    }
}
function OpenPhoto(){
    if(document.querySelector('.PhNum').innerHTML.match(/(.+?)<br>/)[1] != 0){
        let req = new XMLHttpRequest();
        req.overrideMimeType('application/json');
        req.open('POST','/Modules/Home', true)
        req.setRequestHeader('Content-type', 'application/json');
        let container = document.createElement('div');
        let back = document.createElement('div');
        let FrList = document.createElement('div');
        container.className = 'containerModal'
        back.className = 'back';
        back.setAttribute('onclick','del(this)');
        FrList.className = 'List';
        FrList.innerHTML = '<div style="font-size:26pt;"><strong>Photos</strong></div>';
        req.addEventListener('load', ()=>{
            let answer = JSON.parse(req.response);
            FrList.innerHTML += '<div class="Con"></div>';
            for (let i = 0; i < answer.length; i++) {
                document.querySelector('.Con').innerHTML += `<img src="/Public/Files/${answer[i]}" class="imgNum">`;
                document.querySelector(`[src="/Public/Files/${answer[i]}"]`).setAttribute('onclick', 'Full(this)');
            }
        });
        let post = {post:'PhNum'};
        req.send(JSON.stringify(post));
        document.body.style.overflowY = 'hidden';
        document.body.style.overflowX = 'hidden';
        container.prepend(FrList);
        container.prepend(back); 
        document.body.prepend(container);
    }
}

function OpenVideo(){
    if(document.querySelector('.ViNum').innerHTML.match(/(.+?)<br>/)[1] != 0){
        let req = new XMLHttpRequest();
        req.overrideMimeType('application/json');
        req.open('POST','/Modules/Home', true)
        req.setRequestHeader('Content-type', 'application/json');
        let container = document.createElement('div');
        let back = document.createElement('div');
        let FrList = document.createElement('div');
        container.className = 'containerModal'
        back.className = 'back';
        back.setAttribute('onclick','del(this)');
        FrList.className = 'List';
        FrList.innerHTML = '<div style="font-size:26pt;"><strong>Videos</strong></div>';
        req.addEventListener('load', ()=>{
            let answer = JSON.parse(req.response);
            FrList.innerHTML += '<div class="Con"></div>';
            for (let i = 0; i < answer.length; i++) {
                document.querySelector('.Con').innerHTML += `<div class="player">
                                                                <video src="/Public/Files/${answer[i]}" class="video" width="100%" ontimeupdate="Progress(this)"></video>
                                                                <div class="controls" onmouseover="DontHidden(this)" onmouseleave="Hidden(this)">
                                                                    <img src="/Public/ICON/Play.svg" class="PlayPause" width="20px" onclick="Play(this)">
                                                                    <input type="range" name="ProgressBar" class="ProgressBar" min="0" max="100" step="0.05" value="0" oninput="Rewind(this)">
                                                                    <input type="range" name="volume" class="volume" min="0" max="1" step="0.005" value="1" oninput="Volume(this)">
                                                                    <div class="TwoX" onclick="Speed(this)">2X</div>
                                                                    <img src="/Public/ICON/FullSrceenIn.svg" class="FullScreen" width="20px" onclick="FullScreen(this)">
                                                                </div>
                                                            </div>`;
                                                    document.querySelector('.video').setAttribute('ontimeupdate','Progress(this)');
                                                    document.querySelector('.controls').setAttribute('onmouseover','DontHidden(this)');
                                                    document.querySelector('.controls').setAttribute('onmouseleave', 'Hidden(this)');
                                                    document.querySelector('.PlayPause').setAttribute('onclick', 'Play(this)');
                                                    document.querySelector('.ProgressBar').setAttribute('oninput', 'Rewind(this)');
                                                    document.querySelector('.volume').setAttribute('oninput', 'Volume(this)');
                                                    document.querySelector('.TwoX').setAttribute('onclick', 'Speed(this)');
                                                    document.querySelector('.FullScreen').setAttribute('onclick', 'FullScreen(this)');
            }
        });
        let post = {post:'ViNum'};
        req.send(JSON.stringify(post));
        document.body.style.overflowY = 'hidden';
        document.body.style.overflowX = 'hidden';
        container.prepend(FrList);
        container.prepend(back); 
        document.body.prepend(container);
    }
}


function del(e){
    if(e.className == 'back' || e.className == 'back2'){
        if(document.querySelector('.OpenPhoto') != undefined){
            document.querySelector('.List').style.display = 'flex';
            document.querySelector('.containerModal2').remove();
        }
        else{
            document.querySelector('.containerModal').remove();
            document.body.style.overflowY = 'visible';
            document.body.style.overflowX = 'visible';
        }
    }
}


function Full(e){
    let arr = new Array();
    arr = document.querySelector('.Con').children;
    let index;
    for (let i = 0; i < arr.length; i++) {
        if(arr[i].getAttribute('src') == e.getAttribute('src')){
            index = i;
        }
    }
    let container = document.createElement('div');
    let back = document.createElement('div');
    let conPhoto= document.createElement('div');
    container.className = 'containerModal2';
    back.className = 'back2';
    back.setAttribute('onclick','del(this)');
    conPhoto.className = 'conPhoto';
    document.querySelector('.List').style.display = 'none';
    container.innerHTML = `<img src="/Public/ICON/swipe.svg" class="swLeft">`
    conPhoto.innerHTML += `<img src="/Public/Files/${arr[index].getAttribute('src').match(/\/Public\/Files\/(.{32})/)[1]}" class="OpenPhoto">`
    container.prepend(back); 
    container.append(conPhoto);
    container.innerHTML += `<img src="/Public/ICON/swipe.svg" class="swRight">`
    document.body.prepend(container);
    document.querySelector('.containerModal2').setAttribute('onclick', 'del(this)');
    document.querySelector('.swRight').setAttribute('onclick', 'Right()');
    document.querySelector('.swLeft').setAttribute('onclick', 'Left()');
    document.querySelector('.back2').scrollIntoView({behavior: 'smooth', block: 'start'});
}

function Right(){
    target = document.querySelector('.OpenPhoto');
    let arr = new Array();
    arr = document.querySelector('.Con').children;
    let index;
    for (let i = 0; i < arr.length; i++) {
        if(arr[i].getAttribute('src') == target.getAttribute("src")){
            index = i;
        }
    }
    if(index+1 > arr.length-1){
        document.querySelector('.OpenPhoto').src = arr[0].getAttribute('src');
    }
    else{
        document.querySelector('.OpenPhoto').src = arr[index+1].getAttribute('src');
    }
}

function Left(){
    target = document.querySelector('.OpenPhoto');
    let arr = new Array();
    arr = document.querySelector('.Con').children;
    let index;
    for (let i = 0; i < arr.length; i++) {
        if(arr[i].getAttribute('src') == target.getAttribute("src")){
            index = i;
        }
    }
    if(index-1 < 0){
        document.querySelector('.OpenPhoto').src = arr[arr.length-1].getAttribute('src');
    }
    else{
        document.querySelector('.OpenPhoto').src = arr[index-1].getAttribute('src');
    }
}

document.querySelector('.PoNum').addEventListener('click', ()=>{
    document.querySelector('.Posts').scrollIntoView({behavior: 'smooth', block: 'start'});
});

document.addEventListener('keyup', (e)=>{
    if(document.querySelector('.containerModal') != undefined){
        switch (e.code) {
            case 'ArrowRight':
                Right();
                break;
            case 'ArrowLeft':
                Left();
                break;
            case 'Escape':
                if(document.querySelector('.OpenPhoto') != undefined){
                    document.querySelector('.List').style.display = 'flex';
                    document.querySelector('.containerModal2').remove();
                }
                else{
                    document.querySelector('.containerModal').remove();
                    document.body.style.overflowY = 'visible';
                    document.body.style.overflowX = 'visible';
                }
                break;
        }       
    }
});

function TextareaFocus(e){
    if(PostFlag){
        let i = 1;
        document.querySelector('.createPost').style.borderRadius = '40px';
        p=setInterval(() => {
            if(i>=10){
                document.querySelector('textarea').style.border = '3px solid #5EAAC1';
                clearInterval(p);
            }
            else{
                e.setAttribute('rows',`${i}`);
                i++;
            }
        }, 15);
        document.querySelector('textarea').style.borderRadius = '7px';
        PostFlag = false;
    }
}

document.body.addEventListener('click', (e)=>{
    if(e.target.className != 'createPost' && e.target.tagName != 'TEXTAREA' && e.target.className != 'plus'){
        if(!PostFlag){
            let i = 10;
            document.querySelector('.createPost').style.borderRadius = '70px';
            p=setInterval(() => {
                if(i<1){
                    document.querySelector('textarea').style.border = '';
                    document.querySelector('textarea').style.borderRadius = '0px'
                    clearInterval(p);
                }
                else{
                    document.querySelector('textarea').setAttribute('rows',`${i}`);
                    i--;
                }
            }, 15);
            PostFlag = true;
        }
    }
});

function Create(e){
    let textar = e.parentNode.querySelector('textarea').value;
    if(textar.length < 10){e.parentNode.querySelector('textarea').style.borderBottom = '3px solid red'}
    else{
        let req = new XMLHttpRequest();
        req.overrideMimeType('application/json');
        req.open('POST', '/Modules/Home');
        req.setRequestHeader('Content-type', 'application/json');
        req.addEventListener('load',()=>{
            let answer = JSON.parse(req.response);
            let CP = document.createElement('div');
            CP.className = 'Post';
            CP.setAttribute('value', answer.date);
            CP.innerHTML = `<div class="Union_text_arrow">
                                <div>
                                    <div class="News_Text">${answer.content}</div>
                                </div>
                            </div>
                            <div style="padding-top: 5px; padding-bottom: 10px;">
                                <hr color="black" size="1px" class="News_Line" width="2000px" >
                            </div>
                            <div class="News_Footer">
                                <div style="display: flex; align-items: center; ">
                                    ${answer.avatar == '' ? `<div class="News_avatar_container">${answer.login.slice(0,1)}</div>` : `<img src="/Public/Files/${answer.avatar}" class="News_avatar_container">`}
                                    <div class="Name_Avatar">${answer.login}</div>
                                </div>
                                <div style="display: flex; justify-content: center; align-items: center;">${new Date(answer.date).toLocaleString().slice(0,10)} ${new Date(answer.date).toLocaleTimeString().slice(0,-3)}<div class="Trush"></div><div class="Like"></div><div class="LikesNum">0</div></div>
                            </div>`;
            document.querySelector('.Posts').prepend(CP);
            document.querySelector('.Trush').setAttribute('onclick', 'DelPost(this)');
            document.querySelector('.Like').setAttribute('onclick', 'Like(this)');
            e.parentNode.querySelector('textarea').value = '';
            document.querySelector('.PoNum').innerHTML = `${Number.parseInt(document.querySelector('.PoNum').innerHTML.match(/(.+?)<br>/)[1])+1}<br>Posts`
            let i = 10;
            document.querySelector('.createPost').style.borderRadius = '70px';
            p=setInterval(() => {
                if(i<1){
                    document.querySelector('textarea').style.border = '';
                    document.querySelector('textarea').style.borderRadius = '0px'
                    clearInterval(p);
                }
                else{
                    document.querySelector('textarea').setAttribute('rows',`${i}`);
                    i--;
                }
            }, 15);
            PostFlag = true;
        })
        list = {
            post: 'NewPost',
            date: Date.now(),
            content:textar
        }
        req.send(JSON.stringify(list));
    }
}

function DelPost(e){
    let req = new XMLHttpRequest();
        req.overrideMimeType('application/json');
        req.open('POST', '/Modules/Home');
        req.setRequestHeader('Content-type', 'application/json');
        req.addEventListener('load',()=>{
            let answer = JSON.parse(req.response);
            if(answer.bool){
                e.parentNode.parentNode.parentNode.remove();
                document.querySelector('.PoNum').innerHTML = `${Number.parseInt(document.querySelector('.PoNum').innerHTML.match(/(.+?)<br>/)[1])-1}<br>Posts`;
            }
        });
        list = {
            post: 'DelPost',
            name: e.parentNode.parentNode.parentNode.getAttribute('value')
        }
        req.send(JSON.stringify(list));
}

function Like(e){
    if(LikeFlag){
        LikeFlag = false;
        let req = new XMLHttpRequest();
        req.overrideMimeType('application/json');
        req.open('POST', '/Modules/Home');
        req.setRequestHeader('Content-type', 'application/json');
        switch (e.className) {
            case "Like":
                req.addEventListener('load',()=>{
                    let answer = JSON.parse(req.response);
                    if(answer.bool){
                        e.className = 'LikeOn';
                        e.parentNode.querySelector('.LikesNum').innerHTML = Number.parseInt(e.parentNode.querySelector('.LikesNum').innerHTML)+1;
                        LikeFlag = true;
                    }
                });
                list = {
                    post: 'Like',
                    name: e.parentNode.parentNode.parentNode.getAttribute('value')
                }
                req.send(JSON.stringify(list));
                break;
            case "LikeOn":
                req.addEventListener('load',()=>{
                    let answer = JSON.parse(req.response);
                    if(answer.bool){
                        e.className = 'Like';
                        e.parentNode.querySelector('.LikesNum').innerHTML = Number.parseInt(e.parentNode.querySelector('.LikesNum').innerHTML)-1;
                        LikeFlag = true;
                    }
                });
                list = {
                    post: 'DisLike',
                    name: e.parentNode.parentNode.parentNode.getAttribute('value')
                }
                req.send(JSON.stringify(list));
                break;
        }
    }
}