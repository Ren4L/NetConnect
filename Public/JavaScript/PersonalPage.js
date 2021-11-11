let flag = true;
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
        req.open('POST','/Modules/PersonalPage', true)
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
        let post = {post:'FrNum', login:window.location.href.split('/')[5]};
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
        req.open('POST','/Modules/PersonalPage', true)
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
        let post = {post:'PhNum', login:window.location.href.split('/')[5]};
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
        req.open('POST','/Modules/PersonalPage', true)
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
        let post = {post:'ViNum', login:window.location.href.split('/')[5]};
        req.send(JSON.stringify(post));
        document.body.style.overflowY = 'hidden';
        document.body.style.overflowX = 'hidden';
        container.prepend(FrList);
        container.prepend(back); 
        document.body.prepend(container);
    }
}

function FPV(){
    for (let i = 0; i < document.querySelectorAll('.ListFPV').length; i++) {
        if(document.querySelectorAll('.ListContainer')[i].children.length == 0){
            document.querySelectorAll('.ListFPV')[i].remove();
        }
        
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