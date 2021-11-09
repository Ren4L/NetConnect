

document.querySelector('.PlusText').addEventListener('click', ()=>{
    let container = document.createElement('div');
    let back = document.createElement('div');
    let upload = document.createElement('div');
    container.className = 'containerModal'
    back.className = 'back';
    back.setAttribute('onclick','del(this)');
    upload.className = 'upload';
    upload.innerHTML = `<form name="Av">
                            <label>
                                <div class="DownloadAvatar"></div>
                                <input type="file" style="display: none;" name="avatar" class="file" accept="image/*" onchange="Avatar(this)">
                            </label>
                            <div class="InputAvatar"></div>
                            <label>
                                <div class="send" onclick="SendFile()"></div>
                            </label>
                        </form>`;
    container.prepend(upload);
    container.prepend(back); 
    document.body.prepend(container);
    document.querySelector('.send').setAttribute('onclick', 'SendFile()');
    document.querySelector('.file').setAttribute('onchange', 'Avatar(this)');
    document.querySelector('.file').setAttribute('accept', 'image/*');
});

function del(e){
    if(e.className == 'back'){
        document.querySelector('.containerModal').remove();
    }
}

function Avatar(e){
    let photo = e.files[0];
    document.querySelector('.InputAvatar').setAttribute('id','InputAvatar');
    document.querySelector('.InputAvatar').innerHTML = `<img src="${URL.createObjectURL(photo)}" width="50%" class="AvatarView"></img>`
}

function SendFile(){
    let form = document.querySelector('form');
    let FD = new FormData();
    FD.append('image', form.avatar.files[0]);
    var request = new XMLHttpRequest();
        request.open('POST','/Modules/Photos', true);
        request.send(FD);
    request.addEventListener('load',()=>{
        let answer = JSON.parse(request.response);
        if(answer.result == 'AvatarDone'){
            document.querySelector('.AvatarView').style.border="3px solid #66c15e";
            document.querySelector('.AllPhotos').innerHTML += `<img src="/Public/Files/${answer.photo}" class="Photos">`;
        }
    });
}

document.querySelector('.AllPhotos').addEventListener('click', (e)=>{
    target = e.target;
    if(target.className != 'AllPhotos'){
        let arr = new Array();
        arr = document.querySelectorAll('.Photos');
        let index;
        for (let i = 0; i < arr.length; i++) {
            if(arr[i] == target){
                index = i;
            }
        }
        let container = document.createElement('div');
        let back = document.createElement('div');
        let conPhoto= document.createElement('div');
        container.className = 'containerModal'
        conPhoto.className = 'conPhoto';
        back.className = 'back';
        back.setAttribute('onclick','del(this)');
        container.innerHTML = `<img src="/Public/ICON/swipe.svg" class="swLeft">`
        conPhoto.innerHTML += `<img src="/Public/Files/${arr[index].getAttribute('src').match(/\/Public\/Files\/(.{32})/)[1]}" class="OpenPhoto">`
        container.append(conPhoto);
        container.innerHTML += `<img src="/Public/ICON/swipe.svg" class="swRight">`
        container.prepend(back); 
        document.body.prepend(container);
        document.querySelector('.swRight').setAttribute('onclick', 'Right()');
        document.querySelector('.swLeft').setAttribute('onclick', 'Left()');
    }
});

function Right(){
    target = document.querySelector('.OpenPhoto');
    let arr = new Array();
    arr = document.querySelectorAll('.Photos');
    let index;
    for (let i = 0; i < arr.length; i++) {
        if(arr[i].getAttribute("src") == target.getAttribute("src")){
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
    arr = document.querySelectorAll('.Photos');
    let index;
    for (let i = 0; i < arr.length; i++) {
        if(arr[i].getAttribute("src") == target.getAttribute("src")){
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
                document.querySelector('.containerModal').remove();
                break;
        }       
    }
});