var News;
var num = 0;
var flag = true;
let id = window.location.href.split('/')[5];
let req = new XMLHttpRequest();
    req.overrideMimeType('application/json');
    req.open('POST', '/modules/FullNews');
    req.setRequestHeader('Content-type', 'application/json');
    req.addEventListener('load',()=>{
        News = JSON.parse(req.response);
    });
    list = {id:id}
    req.send(JSON.stringify(list));

function load(){
    if(News != undefined){
        if(News.dopPhoto.length == 1){
            document.querySelector('.slider').innerHTML = `<img src="${News.dopPhoto}" class="sliderPhoto">`
        }
        else if(News.dopPhoto.length > 1){
            document.querySelector('.slider').innerHTML = `<img src="${News.dopPhoto[num]}" class="sliderPhoto">
                                                            <img src="/public/icon/swipe.svg" class="swipeRight" onclick="slideRight()">
                                                            <img src="/public/icon/swipe.svg" class="swipeLeft" onclick="slideLeft()">`
            document.querySelector('.slider').style.height = '25vw';
            
            let img = new Image();
            img.onload=()=>{
                if(document.querySelector('.sliderPhoto').naturalWidth < document.querySelector('.sliderPhoto').naturalHeight){
                    document.querySelector('.sliderPhoto').style.width = '25%';
                    console.log("ok");
                }
                else if(document.querySelector('.sliderPhoto').naturalWidth == document.querySelector('.sliderPhoto').naturalHeight){
                    document.querySelector('.sliderPhoto').style.width = '25%';
                }
                else{
                    document.querySelector('.sliderPhoto').style.width = '50%';
                }
            }
            img.src=News.dopPhoto[num];
        }
    }
}


function slideRight(){
    if(flag){
        flag = false;
        num++;
        if(num>News.dopPhoto.length-1){num=0};
        document.querySelector('.sliderPhoto').src = News.dopPhoto[num];
        let img = new Image();
        img.onload=()=>{
            if(document.querySelector('.sliderPhoto').naturalWidth < document.querySelector('.sliderPhoto').naturalHeight){
                document.querySelector('.sliderPhoto').style.width = '25%';
            }
            else if(document.querySelector('.sliderPhoto').naturalWidth == document.querySelector('.sliderPhoto').naturalHeight){
                document.querySelector('.sliderPhoto').style.width = '25%';
            }
            else{
                document.querySelector('.sliderPhoto').style.width = '50%';
            }
        }
        img.src=News.dopPhoto[num];
        flag = true;
    }   
};

function slideLeft(){
    if(flag){
        flag = false;
        num--;
        if(num < 0){num = News.dopPhoto.length - 1};
        document.querySelector('.sliderPhoto').src = News.dopPhoto[num];
        let img = new Image();
        img.onload=()=>{
            if(document.querySelector('.sliderPhoto').naturalWidth < document.querySelector('.sliderPhoto').naturalHeight){
                document.querySelector('.sliderPhoto').style.width = '25%';
            }
            else if(document.querySelector('.sliderPhoto').naturalWidth == document.querySelector('.sliderPhoto').naturalHeight){
                document.querySelector('.sliderPhoto').style.width = '25%';
            }
            else{
                document.querySelector('.sliderPhoto').style.width = '50%';
            }
        }
        img.src=News.dopPhoto[num];
        flag = true;
    }  
};
