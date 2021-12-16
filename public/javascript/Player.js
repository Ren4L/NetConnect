function Play(e){
    let video = e.parentNode.parentNode.querySelector('.video');
    let allVideo = document.querySelectorAll('.video');
    if(video.paused){
        for (let i = 0; i < allVideo.length; i++) {
            if(video != allVideo[i] && allVideo[i].played){
                console.log(allVideo[i]);
                allVideo[i].pause();
                allVideo[i].currentTime = 0;
                allVideo[i].parentNode.querySelector('.PlayPause').src = '/public/icon/Play.svg';
                allVideo[i].parentNode.querySelector('.ProgressBar').value = 0;
                allVideo[i].currentTime = 0;   
            }
        }
        video.play();
        e.src = '/public/icon/Pause.svg';
    }
    else{
        video.pause();
        e.src = '/public/icon/Play.svg';
    }
}

function DontHidden(e){
    e.style.opacity = '1';
}

function Hidden(e){
    e.style.opacity = '0';
}

function FullScreen(e){
    if(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement){
        e.src = '/public/icon/FullSrceenIn.svg';
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
    else{
        e.src = '/public/icon/FullSrceenOut.svg';
        if (e.parentNode.parentNode.requestFullscreen) {
            e.parentNode.parentNode.requestFullscreen();
        } else if (e.parentNode.parentNode.mozRequestFullScreen) {
            e.parentNode.parentNode.mozRequestFullScreen();
        } else if (e.parentNode.parentNode.webkitRequestFullscreen) {
            e.parentNode.parentNode.webkitRequestFullscreen();
        } else if (e.parentNode.parentNode.msRequestFullscreen) {
            e.parentNode.parentNode.msRequestFullscreen();
        }
    }
}

function Speed(e){
    let video = e.parentNode.parentNode.querySelector('.video');
    if(video.playbackRate == 2){
        e.style.opacity = '0.5';
        e.style.color = 'white'
        video.playbackRate = 1.0;
    }
    else{
        e.style.opacity = '1';
        e.style.color = "#5EAAC1"
        video.playbackRate = 2.0;
    }
}

function Volume(e){
    let video = e.parentNode.parentNode.querySelector('.video');
    video.volume = e.value;
}

function Progress(e){
    let video = e.parentNode.querySelector('.video');
    e.parentNode.querySelector('.ProgressBar').value = (video.currentTime / video.duration * 100);
    console.log(e.parentNode.parentNode.querySelector('.ProgressBar'));
}

function Rewind(e){
    let video = e.parentNode.parentNode.querySelector('.video');
    video.currentTime = (e.value * video.duration) / 100;
}