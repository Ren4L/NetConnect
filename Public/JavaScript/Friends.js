
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
                document.querySelector('.ContainerFr').innerHTML = '';
                FriendsLoad();
            break;
            case 'Sear':
                document.querySelector('.ContainerFr').innerHTML = `
                                                                <input type="text" oninput="CheckFr()" placeholder="Search" class="Search">
                                                                <div class="FriendsContainer">
                                                                    
                                                                </div>
                                                                <div class="log"></div>`
            break;
            case 'App': 
                document.querySelector('.ContainerFr').innerHTML = '';
                applicationsLoad();
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
            request.open('POST','/modules/Friends',true);
            request.setRequestHeader('Content-type', 'application/json');
            let inquiry = {name:document.querySelector('.Search').value, post:'search'};
            request.addEventListener('load', ()=>{
                    let answer = JSON.parse(request.response);
                    document.querySelector('.FriendsContainer').innerHTML = '';
                    for(i = 0; i < answer.name.length; i++){
                        let but;
                        switch (answer.name[i].friend) {
                            case 'yes':
                            but = 'buttonFr' 
                            break;
                            case 'application':
                            but = 'buttonAdd'
                            break;
                            case 'sendApplication':
                            but = 'buttonSend'
                            break;
                            case 'no':
                            but = 'button'
                            break;
                        }
                        if(answer.name[i].avatar != undefined && document.querySelector('.Search').value != '' ){
                            document.querySelector('.FriendsContainer').innerHTML += `<div class="FriendsList">
                                                                                        <div class="AvText">
                                                                                            <img src="${answer.name[i].avatar}" class="FriendsAvatar">
                                                                                            <div style="display: flex; flex-direction: column; margin-left: 25px;">
                                                                                                <div><strong>Login:</strong> ${answer.name[i].login}</div>
                                                                                                <div style="margin-top: 20px;"><strong>Email:</strong> ${answer.name[i].email}</div>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div class="${but}" value="${answer.name[i].login}"></div>
                                                                                    </div>`;
                        }
                        else if(answer.name[i].avatar == undefined && document.querySelector('.Search').value != '' ){
                            document.querySelector('.FriendsContainer').innerHTML += `<div class="FriendsList">
                                                                                        <div class="AvText">
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
                        document.querySelectorAll('[value]')[i].setAttribute('onclick', 'AddFriend(this)');
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
        request.open('POST','/modules/Friends',true);
        request.setRequestHeader('Content-type', 'application/json');
        let inquiry;
        switch (e.className) {
            case 'buttonAdd':
                inquiry = {name:e.getAttribute('value'), post:'add'};
                request.addEventListener('load', ()=>{
                    let answer = JSON.parse(request.response);
                    if(answer.flag){
                        e.classList.remove('buttonAdd');
                        e.classList.add('buttonFr');
                    }
                });
            break;
            case 'button':
                inquiry = {name:e.getAttribute('value'), post:'send'};
                request.addEventListener('load', ()=>{
                    let answer = JSON.parse(request.response);
                    if(answer){
                        e.classList.remove('button');
                        e.classList.add('buttonSend');
                    }
                });
            break;
        }
        request.send(JSON.stringify(inquiry));
}

function FriendsLoad(){
    let req = new XMLHttpRequest();
    req.overrideMimeType('application/json');
    req.open('POST', '/modules/Friends', true);
    req.setRequestHeader('Content-type', 'application/json');
    req.addEventListener('load', ()=>{
       let answer = JSON.parse(req.response);
       console.log(answer);
       for(let i = 0; i < answer.name.length; i++){
        if(answer.name[i].avatar == undefined){
            document.querySelector('.ContainerFr').innerHTML += `<div class="FriendsList" style="width:84%">
                                                                <div class="AvText">
                                                                    <div class="FriendsAvatar">${answer.name[i].login.slice(0,1)}</div>
                                                                    <div style="display: flex; flex-direction: column; margin-left: 25px;">
                                                                        <div><strong>Login:</strong> ${answer.name[i].login}</div>
                                                                        <div style="margin-top: 20px;"><strong>Email:</strong> ${answer.name[i].email}</div>
                                                                    </div>
                                                                </div>
                                                                <div style="display:flex; justify-content: center;align-items: center;">
                                                                        <div class="delFr" value="${answer.name[i].login}"></div>
                                                                        <a href="/modules/PersonalPage/${answer.name[i].login}"><img src="/public/icon/Arrow_Right.svg" alt="Error" class="ArroW"></a>
                                                                </div>
                                                            </div>`;
       }
       else{
            document.querySelector('.ContainerFr').innerHTML += `<div class="FriendsList" style="width:84%">
                                                                    <div class="AvText">
                                                                        <img src="${answer.name[i].avatar}" class="FriendsAvatar">
                                                                        <div style="display: flex; flex-direction: column; margin-left: 25px;">
                                                                            <div><strong>Login:</strong> ${answer.name[i].login}</div>
                                                                            <div style="margin-top: 20px;"><strong>Email:</strong> ${answer.name[i].email}</div>
                                                                        </div>
                                                                    </div>
                                                                    <div style="display:flex; justify-content: center;align-items: center;">
                                                                        <div class="delFr" value="${answer.name[i].login}"></div>
                                                                        <a href="/modules/PersonalPage/${answer.name[i].login}"><img src="/public/icon/Arrow_Right.svg" alt="Error" class="ArroW"></a>
                                                                    </div>
                                                                </div>`;
        }
        document.querySelectorAll('.delFr')[i].setAttribute('onclick', 'delFr(this)');
       }
    });
    let answer = {post:'friendsList'};
    req.send(JSON.stringify(answer));
}


function delFr(e){
    let req = new XMLHttpRequest();
    req.overrideMimeType('application/json');
    req.open('POST', '/modules/Friends', true);
    req.setRequestHeader('Content-type', 'application/json');
    req.addEventListener('load', ()=>{
       let answer = JSON.parse(req.response);
       if(answer.flag){e.parentNode.parentNode.remove();}
    });
    let answer = {post:'delFr', name:e.getAttribute('value')};
    req.send(JSON.stringify(answer));
}

function applicationsLoad(){
    let req = new XMLHttpRequest();
    req.overrideMimeType('application/json');
    req.open('POST', '/modules/Friends', true);
    req.setRequestHeader('Content-type', 'application/json');
    req.addEventListener('load', ()=>{
       let answer = JSON.parse(req.response);
       console.log(answer);
       for(let i = 0; i < answer.name.length; i++){
           if(answer.name[i].avatar == undefined){
            document.querySelector('.ContainerFr').innerHTML += `<div class="FriendsList" style="width:84%">
                                                                    <div class="AvText">
                                                                        <div class="FriendsAvatar">${answer.name[i].login.slice(0,1)}</div>
                                                                        <div style="display: flex; flex-direction: column; margin-left: 25px;">
                                                                            <div><strong>Login:</strong> ${answer.name[i].login}</div>
                                                                            <div style="margin-top: 20px;"><strong>Email:</strong> ${answer.name[i].email}</div>
                                                                        </div>
                                                                    </div>
                                                                    <div style="display:flex;">
                                                                        <div class="buttonAdd" value="${answer.name[i].login}"></div>
                                                                        <div class="buttonDel" value="${answer.name[i].login}"></div>
                                                                    </div>
                                                                </div>`;
           }
           else{
            document.querySelector('.ContainerFr').innerHTML += `<div class="FriendsList" style="width:84%">
                                                                    <div class="AvText">
                                                                        <img src="${answer.name[i].avatar}" class="FriendsAvatar">
                                                                        <div style="display: flex; flex-direction: column; margin-left: 25px;">
                                                                            <div><strong>Login:</strong> ${answer.name[i].login}</div>
                                                                            <div style="margin-top: 20px;"><strong>Email:</strong> ${answer.name[i].email}</div>
                                                                        </div>
                                                                    </div>
                                                                    <div style="display:flex;">
                                                                        <div class="buttonAdd" value="${answer.name[i].login}"></div>
                                                                        <div class="buttonDel" value="${answer.name[i].login}"></div>
                                                                    </div>
                                                                </div>`;
           }
           document.querySelectorAll('.buttonAdd')[i].setAttribute('onclick', 'AcceptFr(this)');
           document.querySelectorAll('.buttonDel')[i].setAttribute('onclick', 'NotAcceptFr(this)');

       }
    });
    let answer = {post:'applicationList'};
    req.send(JSON.stringify(answer));
}


function AcceptFr(e){
    let req = new XMLHttpRequest();
    req.overrideMimeType('application/json');
    req.open('POST', '/modules/Friends', true);
    req.setRequestHeader('Content-type', 'application/json');
    req.addEventListener('load', ()=>{
       let answer = JSON.parse(req.response);
       if(answer.flag){e.parentNode.parentNode.remove();}
    });
    let answer = {post:'add', name:e.getAttribute('value')};
    req.send(JSON.stringify(answer));
}

function NotAcceptFr(e){
    let req = new XMLHttpRequest();
    req.overrideMimeType('application/json');
    req.open('POST', '/modules/Friends', true);
    req.setRequestHeader('Content-type', 'application/json');
    req.addEventListener('load', ()=>{
       let answer = JSON.parse(req.response);
       if(answer.flag){e.parentNode.parentNode.remove();}
    });
    let answer = {post:'notAccept', name:e.getAttribute('value')};
    req.send(JSON.stringify(answer));
}