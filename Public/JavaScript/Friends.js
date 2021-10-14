let slider = document.querySelector('.slider');

function SlideCheck(){
    slider.style.top = `${document.querySelector('#ActiveCenter').offsetTop}px`;
    slider.style.left = `${document.querySelector('#ActiveCenter').offsetLeft}px`;
    slider.style.width = `${document.querySelector('#ActiveCenter').offsetWidth}px`;
    slider.style.height = `${document.querySelector('#ActiveCenter').offsetHeight}px`;
}

window.addEventListener('resize',()=>{
    slider.style.transition = 'none'; 
    slider.style.top = `${document.querySelector('#ActiveCenter').offsetTop}px`;
    slider.style.left = `${document.querySelector('#ActiveCenter').offsetLeft}px`;
    slider.style.width = `${document.querySelector('#ActiveCenter').offsetWidth}px`;
    slider.style.height = `${document.querySelector('#ActiveCenter').offsetHeight}px`;
    slider.style.transition = 'left 0.5s ease-in-out, width 0.5s ease-in-out'; 
})





document.querySelector('.MenuContainer').addEventListener('click',(e)=>{
    let target = e.target;
    if(target.className != 'MenuContainer'){
        move(target);
    }
})


function move(target){
    slider.style.left = `${target.offsetLeft}px`;   
    slider.style.width = `${target.offsetWidth}px`;
    setTimeout(() => {
        switch(target.className){
            case 'Fr': 
            break;
            case 'Sear':
            break;
            case 'App': 
            break;
        }
        document.querySelector('#ActiveCenter').removeAttribute('id');
        target.setAttribute('id','ActiveCenter');
    }, 500);
}


function CheckFr(){
    document.querySelector('.FriendsContainer').innerHTML = '';
        if(document.querySelector('.Search').value != '' && document.querySelector('.Search').value != ' '){
            var request = new XMLHttpRequest();
            request.overrideMimeType("application/json");
            request.open('POST','/Modules/Friends',true);
            request.setRequestHeader('Content-type', 'application/json');
            let inquiry = {name:document.querySelector('.Search').value, post:'search'};
            request.addEventListener('load', ()=>{
                    let answer = JSON.parse(request.response);
                    document.querySelector('.FriendsContainer').innerHTML = '';
                    for(i = 0; i < answer.name.length; i++){
                        let but;
                        if(answer.name[i].friend){
                            but = 'buttonAdd';
                        }
                        else{
                            but = 'button'
                        }
                        if(answer.name[i].avatar != '' && document.querySelector('.Search').value != '' ){
                            document.querySelector('.FriendsContainer').innerHTML += `<div class="FriendsList">
                                                                                        <div style="display: flex; flex-direction: row; align-items: center;">
                                                                                            <img src="/Public/Files/${answer.name[i].avatar}" class="FriendsAvatar">
                                                                                            <div style="display: flex; flex-direction: column; margin-left: 25px;">
                                                                                                <div><strong>Login:</strong> ${answer.name[i].login}</div>
                                                                                                <div style="margin-top: 20px;"><strong>Email:</strong> ${answer.name[i].email}</div>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div class="${but}" value="${answer.name[i].login}"></div>
                                                                                    </div>`;
                        }
                        else if(answer.name[i].avatar == '' && document.querySelector('.Search').value != '' ){
                            document.querySelector('.FriendsContainer').innerHTML += `<div class="FriendsList">
                                                                                        <div style="display: flex; flex-direction: row; align-items: center;">
                                                                                            <div class="FriendsAvatar">${answer.name[i].login.slice(0,1)}</div>
                                                                                            <div style="display: flex; flex-direction: column; margin-left: 25px;">
                                                                                                <div><strong>Login:</strong> ${answer.name[i].login}</div>
                                                                                                <div style="margin-top: 20px;"><strong>Email:</strong> ${answer.name[i].email}</div>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div class="${but}" value="${answer.name[i].login}"></div>
                                                                                    </div>`;
                        }
                    }
                    for(i = 0; i < answer.name.length; i++){
                        document.querySelectorAll('.button')[i].setAttribute('onclick', 'AddFriend(this)');
                    }
            });
            request.send(JSON.stringify(inquiry));
        }
        else{
            document.querySelector('.FriendsContainer').innerHTML = '';
        }
}

function AddFriend(e){
    var request = new XMLHttpRequest();
    request.overrideMimeType("application/json");
    request.open('POST','/Modules/Friends',true);
    request.setRequestHeader('Content-type', 'application/json');
    let inquiry = {name:e.getAttribute('value'), post:'add'};
    request.addEventListener('load', ()=>{
        let answer = JSON.parse(request.response);
    });
    request.send(JSON.stringify(inquiry));
}