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
document.querySelector('.avatarContainer').addEventListener('click', ()=>{
    console.log(flag);
})

document.querySelector('.FrNum').addEventListener('click', ()=>{
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
        FrList.className = 'FrList';
        FrList.innerHTML = '<div style="font-size:26pt;"><strong>Friends</strong></div>';
        req.addEventListener('load', ()=>{
            let answer = JSON.parse(req.response);
            FrList.innerHTML += '<div class="FrCon"></div>';
            for (let i = 0; i < answer.list.length; i++) {
                if(answer.list[i].avatar != ''){
                    document.querySelector('.FrCon').innerHTML += `<a href="/Modules/PersonalPage/${answer.list[i].login}" style="display:flex; flex-direction:column; align-items:center; padding: 15px;"><img src = "/Public/Files/${answer.list[i].avatar}" class="avatarFr"><div style="font-size:20pt">${answer.list[i].login}</div></a>`
                } 
                else{
                    document.querySelector('.FrCon').innerHTML += `<a href="/Modules/PersonalPage/${answer.list[i].login}" style="display:flex; flex-direction:column; align-items:center; padding: 15px;"><div class="avatarFr">${answer.list[i].login.slice(0,1)}</div><div style="font-size:20pt">${answer.list[i].login}</div></a>`
                }   
            }
        });
        let post = {post:'FrNum', login:window.location.href.split('/')[5]};
        req.send(JSON.stringify(post));
        container.prepend(FrList);
        container.prepend(back); 
        document.body.prepend(container);
    }
});

function fr(){
    if(document.querySelector('.friendsListContainer').children.length == 0){
        document.querySelector('.friendsList').remove();
    }
}

function del(e){
    if(e.className == 'back'){
        document.querySelector('.containerModal').remove();
    }
}