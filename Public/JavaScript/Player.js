let SpeedFlag = false;
function Play(e){
    let video = e.parentNode.parentNode.querySelector('.video');
    if(video.paused){
        video.play();
        e.src = '/Public/ICON/Pause.svg';
    }
    else{
        video.pause();
        e.src = '/Public/ICON/Play.svg';
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
        e.src = '/Public/ICON/FullSrceenIn.svg';
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
        e.src = '/Public/ICON/FullSrceenOut.svg';
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
    if(SpeedFlag){
        e.style.opacity = '0.5';
        e.style.color = 'white'
        SpeedFlag = false;
        video.playbackRate = 1.0;
    }
    else{
        e.style.opacity = '1';
        e.style.color = "#5EAAC1"
        SpeedFlag = true;
        video.playbackRate = 2.0;
    }
}

function Volume(e){
    let video = e.parentNode.parentNode.querySelector('.video');
    video.volume = e.value;
}

function Progress(e){
    let video = e.parentNode.parentNode.querySelector('.video');
    e.parentNode.querySelector('.controls').querySelector('.ProgressBar').value = (video.currentTime / video.duration * 100);
}

function Rewind(e){
    let video = e.parentNode.parentNode.querySelector('.video');
    video.currentTime = (e.value * video.duration) / 100;
}