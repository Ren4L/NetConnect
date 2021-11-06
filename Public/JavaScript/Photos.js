function PhotosSize(){
    Check_Photo=document.getElementsByClassName('Photos');
        for(let i=0; i<Check_Photo.length; i++){
            if(parseFloat(window.getComputedStyle(Check_Photo[i]).width) > parseFloat(window.getComputedStyle(Check_Photo[i]).height)){
                Check_Photo[i].style.width="33%";
            }
            else{
                Check_Photo[i].style.width="20%";
            }
        }
}

document.querySelector('.PlusText').addEventListener('click', ()=>{
    let container = document.createElement('div');
    let back = document.createElement('div');
    let upload = document.createElement('div');
    container.className = 'containerModal'
    back.className = 'back';
    back.setAttribute('onclick','del(this)');
    upload.className = 'upload';
    upload.innerHTML = `<form name="Av" method="POST" action="/Modules/Photos">
                            <label>
                                <div class="DownloadAvatar"></div>
                                <input type="file" style="display: none;" class="file" >
                            </label>
                            <div class="InputAvatar"></div>
                            <label>
                                <div class="send"></div>
                                <input type="submit" style="display: none;" accept="image/*" onchange="Avatar(this)">
                            </label>
                        </form>`;
    container.prepend(upload);
    container.prepend(back); 
    document.body.prepend(container);
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