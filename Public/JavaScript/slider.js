var News;
var num = 0;
var flag = true;
function load(){
    let id = window.location.href.split('/')[5];
    readTextFile(`/Public/News/${id}.json`, function(text){
        News = JSON.parse(text);
    });
    if(News.dopPhoto.length == 1){
        document.querySelector('.slider').innerHTML = `<img src="/Public/Files/${News.dopPhoto}" class="sliderPhoto">`
    }
    else if(News.dopPhoto.length > 1){
        document.querySelector('.slider').innerHTML = `<img src="/Public/Files/${News.dopPhoto[num]}" class="sliderPhoto">
                                                        <img src="/Public/ICON/swipe.svg" class="swipeRight" onclick="slideRight()">
                                                        <img src="/Public/ICON/swipe.svg" class="swipeLeft" onclick="slideLeft()">`
        document.querySelector('.slider').style.height = '25vw';
    }
}

function slideRight(){
    if(flag){
        flag = false;
        let opacity = 1;
        p = setInterval(() => {
        if(opacity < 0){
            num++;
            if(num>News.dopPhoto.length-1){num=0};
            document.querySelector('.sliderPhoto').src = `/Public/Files/${News.dopPhoto[num]}`;
            opacity = 0;
            d = setInterval(() => {
                if(opacity > 1){
                    clearInterval(d);
                }
                else{
                    document.querySelector('.sliderPhoto').style.opacity = opacity;
                    opacity+=0.05;
                }
            }, 10);
            flag = true;
            clearInterval(p);
        }
        else{
            document.querySelector('.sliderPhoto').style.opacity = opacity;
            opacity-=0.05;
        }
    }, 10);
    }   
};

function slideLeft(){
    if(flag){
        flag = false;
        let opacity = 1;
        p = setInterval(() => {
        if(opacity < 0){
            num--;
            if(num<0){num=2};
            document.querySelector('.sliderPhoto').src = `/Public/Files/${News.dopPhoto[num]}`;
            opacity = 0;
            d = setInterval(() => {
                if(opacity > 1){
                    clearInterval(d);
                }
                else{
                    document.querySelector('.sliderPhoto').style.opacity = opacity;
                    opacity+=0.05;
                }
            }, 10);
            flag = true;
            clearInterval(p);
        }
        else{
            document.querySelector('.sliderPhoto').style.opacity = opacity;
            opacity-=0.05;
        }
    }, 10);
    }
};

function readTextFile(file, callback) {
    var ReadFullFile = new XMLHttpRequest();
    ReadFullFile.overrideMimeType("application/json");
    ReadFullFile.open("GET", file, false);
    ReadFullFile.onreadystatechange = function() {
        if (ReadFullFile.readyState === 4 && ReadFullFile.status == "200") {
            callback(ReadFullFile.responseText);
        }
    }
    ReadFullFile.send(null);
}