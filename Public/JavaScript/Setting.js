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



function Avatar(e){
    let photo = e.files[0];
    document.querySelector('.InputAvatar').setAttribute('id','InputAvatar');
    document.querySelector('.InputAvatar').innerHTML = `<img src="${URL.createObjectURL(photo)}" width="150px" class="AvatarView"></img>`
}

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
            case 'Av': document.querySelector('.form').innerHTML = `<form name="Av">
                                                                        <label>
                                                                            <div class="DownloadAvatar"></div>
                                                                            <input type="file" style="display: none;" name="avatar" class="file" accept="image/*" onchange="Avatar(this)">
                                                                        </label>
                                                                        <div class="InputAvatar"></div>
                                                                        <label>
                                                                            <div class="send" onclick="SendFile()"></div>
                                                                        </label>
                                                                    </form>`;
            document.querySelector('.send').setAttribute('onclick', 'SendFile()');
            document.querySelector('[type=file]').setAttribute('onchange', 'Avatar(this)');
            document.querySelector('[type=file]').setAttribute('accept', 'image/*');
            break;
            case 'Inf': document.querySelector('.form').innerHTML = `<form name="Inf">
                                                                        <div style="display:flex; flex-direction:column;">
                                                                            <input type="text" name="firstName" placeholder="Firstname" >
                                                                            <input type="text" name="lastName" placeholder="Lastname">
                                                                            <input type="text" name="patronymic" placeholder="Patronymic">
                                                                            <select name="gender">
                                                                                <option selected disabled style="display: none;">Gender</option>
                                                                                <option value="Male">Male</option>
                                                                                <option value="Female">Female</option>
                                                                            </select>
                                                                            <input type="date" name="date" placeholder="Вirthday" >
                                                                            <input type="text" name="country" placeholder="Country">
                                                                            <input type="text" name="city" placeholder="City">
                                                                            <select name="visibility">
                                                                                <option selected disabled style="display: none;">Visibility</option>
                                                                                <option value="Everything">Everything</option>
                                                                                <option value="Only friends">Only friends</option>
                                                                                <option value="No one">No one</option>
                                                                            </select>
                                                                        </div>
                                                                        <div class="send"></div>
                                                                    </form>`;
            document.querySelector('.send').setAttribute('onclick','Send()');
            break;
            case 'Pass': document.querySelector('.form').innerHTML = `<form name="Pass">
                                                                        <div style="display: flex; flex-direction: column;">
                                                                            <input type="password" name="OldPass" placeholder="Old password" >
                                                                            <input type="password" name="NewPass" placeholder="New password" >
                                                                            <input type="password" name="RepeatNewPass" placeholder="Repeat new password" >
                                                                        </div>
                                                                        <div class="send"></div>
                                                                    </form>`;
            document.querySelector('.send').setAttribute('onclick','Send()');
            break;
        }
        document.querySelector('#ActiveCenter').removeAttribute('id');
        target.setAttribute('id','ActiveCenter');
    }, 500);
}

function SendFile(){
    let form = document.querySelector('form');
    let FD = new FormData();
    FD.append('image', form.avatar.files[0]);
    console.log(form.avatar.files[0]);
    var request = new XMLHttpRequest();
        request.open('POST','/modules/Setting', true);
        request.send(FD);
    request.addEventListener('load',()=>{
        let answer = JSON.parse(request.response);
        if(answer.result == 'AvatarDone'){
            document.querySelector('.AvatarView').style.border="3px solid #66c15e";
        }
    });
}

function Send(){
    if(document.querySelector('form').getAttribute('name') == 'Pass'){
        if(document.querySelector('[name=OldPass]').value.length < 8 ){
            document.querySelector('[name=OldPass]').style.borderBottom="3px solid red";
            return;
        }
        if(document.querySelector('[name=NewPass]').value.length < 8 ){
            document.querySelector('[name=NewPass]').style.borderBottom="3px solid red";
            return;
        }
        if(document.querySelector('[name=RepeatNewPass]').value.length < 8 ){
            document.querySelector('[name=RepeatNewPass]').style.borderBottom="3px solid red";
            return;
        }
        if(document.querySelector('[name=RepeatNewPass]').value != document.querySelector('[name=NewPass]').value ){
            document.querySelector('[name=RepeatNewPass]').style.borderBottom="3px solid red";
            return;
        }
    }
    let flag = false;
    let FD = new FormData(document.forms[0]);
    FD.append('formName', document.querySelector('form').getAttribute('name'));
    for(var el of FD.values()){
        if(el != 'Inf' && el != 'Pass' && el != ''){
            flag = true;
        }
    }
    if(flag){
        var request = new XMLHttpRequest();
        request.overrideMimeType("application/json");
        request.open('POST','/modules/Setting', true);
        request.send(FD);
    }
    request.addEventListener('load',()=>{
        let answer = JSON.parse(request.response);
        if(answer.result != undefined){
            switch (answer.result) {
                case 'Compare':
                    document.querySelector('[name=OldPass]').style.borderBottom="3px solid red";
                    break;
            
                case 'NewCompare':
                    document.querySelector('[name=NewPass]').style.borderBottom="3px solid red";
                    break;
                case 'Done':
                    for(let i = 0; i < document.querySelectorAll('input').length; i++){
                        if(document.querySelectorAll('input')[i].value != ''){
                            document.querySelectorAll('input')[i].style.borderBottom="3px solid #66c15e";
                        }
                    }
                    for(i = 0; i < document.querySelectorAll('select').length; i++){
                        if(document.querySelectorAll('select')[i].value != '' && document.querySelectorAll('select')[i].value != 'Gender' && document.querySelectorAll('select')[i].value != 'Visibility'){
                            document.querySelectorAll('select')[i].style.borderBottom="3px solid #66c15e";
                        }
                    }
                    break;
            }
        }
    });
}
