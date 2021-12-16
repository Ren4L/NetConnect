

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
                                <input type="file" style="display: none;" name="avatar" class="file" accept="video/*" onchange="Avatar(this)">
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
    document.querySelector('.file').setAttribute('accept', 'video/*');
});

function del(e){
    if(e.className == 'back'){
        document.querySelector('.containerModal').remove();
    }
}

function Avatar(e){
    let video = e.files[0];
    document.querySelector('.InputAvatar').setAttribute('id','InputAvatar');
    document.querySelector('.InputAvatar').innerHTML = `<div class="player" style="width:70%; min-width: 170px; margin-bottom: 20px;" >
                                                            <video src="${URL.createObjectURL(video)}" class="video" width="100%" ontimeupdate="Progress(this)"></video>
                                                            <div class="controls" onmouseover="DontHidden(this)" onmouseleave="Hidden(this)">
                                                                <img src="/public/icon/Play.svg" class="PlayPause" width="20px" onclick="Play(this)">
                                                                <input type="range" name="ProgressBar" class="ProgressBar" min="0" max="100" step="0.05" value="0" oninput="Rewind(this)">
                                                                <input type="range" name="volume" class="volume" min="0" max="1" step="0.005" value="1" oninput="Volume(this)">
                                                                <div class="TwoX" onclick="Speed(this)">2X</div>
                                                                <img src="/public/icon/FullSrceenIn.svg" class="FullScreen" width="20px" onclick="FullScreen(this)">
                                                            </div>
                                                        </div>`
}


function SendFile(){
    let form = document.querySelector('form');
    let FD = new FormData();
    FD.append('image', form.avatar.files[0]);
    var request = new XMLHttpRequest();
        request.open('POST','/modules/Videos', true);
        request.send(FD);
    request.addEventListener('load',()=>{
        let answer = JSON.parse(request.response);
        if(answer.result == 'AvatarDone'){
            document.querySelector('.AvatarView').style.border="3px solid #66c15e";
            document.querySelector('.AllVideos').innerHTML += `<div class="player" style="width:30%; min-width: 170px; margin-bottom: 20px;" >
                                                                    <video src="${answer.video}" class="video" width="100%" ontimeupdate="Progress(this)"></video>
                                                                    <div class="controls" onmouseover="DontHidden(this)" onmouseleave="Hidden(this)">
                                                                        <img src="/public/icon/Play.svg" class="PlayPause" width="20px" onclick="Play(this)">
                                                                        <input type="range" name="ProgressBar" class="ProgressBar" min="0" max="100" step="0.05" value="0" oninput="Rewind(this)">
                                                                        <input type="range" name="volume" class="volume" min="0" max="1" step="0.005" value="1" oninput="Volume(this)">
                                                                        <div class="TwoX" onclick="Speed(this)">2X</div>
                                                                        <img src="/public/icon/FullSrceenIn.svg" class="FullScreen" width="20px" onclick="FullScreen(this)">
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
}

