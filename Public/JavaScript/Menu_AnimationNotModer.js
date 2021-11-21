

document.querySelector(".Menu").addEventListener("click",function(e){
        target=e.target;
        if(document.querySelector("#active_right")!=null){
            if(target.className!="Menu" && target.className!="activeblock" && target.className!="slide_menu" ){
                document.querySelector('.activeblock').style.transition = 'none';
                switch (target.className) {
                    case 'Home_img':
                        document.querySelector('.activeblock').style.top = '41px';
                        break;
                    case 'News_img':
                        document.querySelector('.activeblock').style.top = '126px';
                        break;
                    case 'Posts_img':
                        document.querySelector('.activeblock').style.top = '210px';
                        break;
                    case 'Friends_img':
                        document.querySelector('.activeblock').style.top = '295px';
                        break;
                    case 'Photos_img':
                        document.querySelector('.activeblock').style.top = '380px';
                        break;
                    case 'Videos_img':
                        document.querySelector('.activeblock').style.top = '465px';
                        break;
                }

                setTimeout(() => {
                    document.querySelector('.activeblock').style.transition = '0.5s ease-in-out';
                    document.querySelector('.activeblock').style.width = '35px';
                    document.querySelector('.activeblock_right').style.width = '0px';
                    document.querySelector('.activeblock_right').style.left = '0px';
                    document.querySelector("#active_right").style.width = '40px';
                    document.querySelector("#active_right").style.marginRight = '0px';
                    document.querySelector("#active_right").style.filter = 'brightness(25%)';
                    target.style.width = '55px';
                    target.style.marginLeft = '45px';
                    target.style.filter = 'brightness(100%)';
                    setTimeout(() => {
                        document.querySelector("#active_right").removeAttribute('id');
                        target.getAttribute('id', 'active');
                    }, 500);
                }, 1);
            }
        }
        else{
            if(target.className!="Menu" && target.className!="activeblock" && target.className!="slide_menu" ){
                switch (target.className) {
                    case 'Home_img':
                        document.querySelector('.activeblock').style.top = '41px';
                        break;
                    case 'News_img':
                        document.querySelector('.activeblock').style.top = '126px';
                        break;
                    case 'Posts_img':
                        document.querySelector('.activeblock').style.top = '210px';
                        break;
                    case 'Friends_img':
                        document.querySelector('.activeblock').style.top = '295px';
                        break;
                    case 'Photos_img':
                        document.querySelector('.activeblock').style.top = '380px';
                        break;
                    case 'Videos_img':
                        document.querySelector('.activeblock').style.top = '465px';
                        break;
                }
                document.querySelector("#active").style.width = '40px';
                document.querySelector("#active").style.marginLeft = '25px';
                document.querySelector("#active").style.filter = 'brightness(25%)';
                target.style.width = '55px';
                target.style.marginLeft = '45px';
                target.style.filter = 'brightness(100%)';
                setTimeout(() => {
                    document.querySelector("#active").removeAttribute('id');
                    target.getAttribute('id', 'active');
                }, 500);
            }
        }

        if(target.className=="Home_img" && target!=document.querySelector("#active")){setTimeout(() => document.location.href="/modules/Home",500)}else
        if(target.className=="News_img" && target!=document.querySelector("#active")){setTimeout(() => document.location.href="/modules/News",500)}else
        if(target.className=="Posts_img" && target!=document.querySelector("#active")){setTimeout(() => document.location.href="/modules/Posts",500)}else
        if(target.className=="Friends_img" && target!=document.querySelector("#active")){setTimeout(() => document.location.href="/modules/Friends",500)}else
        if(target.className=="Photos_img" && target!=document.querySelector("#active")){setTimeout(() => document.location.href="/modules/Photos",500)}else
        if(target.className=="Videos_img" && target!=document.querySelector("#active")){setTimeout(() => document.location.href="/modules/Videos",500)};
            

});

document.querySelector(".Personal_Menu").addEventListener("click",function(e){
        target=e.target;
        if(target.className!="Personal_Menu" && target.className!="Avatar" && target.className!="activeblock_right" && target.className!="slide_menu_right"){
            if(document.querySelector("#active")!=null){
                document.querySelector('.activeblock_right').style.transition = 'none';
                switch (target.className) {
                    case "LogOut_img":
                        document.querySelector(".activeblock_right").style.top="130px";
                        break;
                    case "Setting_img":
                        document.querySelector(".activeblock_right").style.top="65px";
                        break;
                }
                
                setTimeout(() => {
                    document.querySelector('.activeblock_right').style.transition = '0.5s ease-in-out';
                    document.querySelector('.activeblock').style.width = '0px';
                    document.querySelector('.activeblock_right').style.width = '35px';
                    document.querySelector('.activeblock_right').style.left = '-35px';
                    document.querySelector("#active").style.width = '40px';
                    document.querySelector("#active").style.marginLeft = '25px';
                    document.querySelector("#active").style.filter = 'brightness(25%)';
                    target.style.width = '55px';
                    target.style.marginRight = '45px';
                    target.style.filter = 'brightness(100%)';
                    setTimeout(() => {
                        document.querySelector("#active_right").removeAttribute('id');
                        target.getAttribute('id', 'active');
                    }, 500);
                }, 1);
            }
            else{
                switch (target.className) {
                    case "LogOut_img":
                        document.querySelector(".activeblock_right").style.top="130px";
                        break;
                    case "Setting_img":
                        document.querySelector(".activeblock_right").style.top="65px";
                        break;
                }
                document.querySelector("#active_right").style.width = '40px';
                document.querySelector("#active_right").style.marginRight = '0px';
                document.querySelector("#active_right").style.filter = 'brightness(25%)';
                target.style.width = '55px';
                target.style.marginRight = '45px';
                target.style.filter = 'brightness(100%)';
                setTimeout(() => {
                    document.querySelector("#active_right").removeAttribute('id');
                    target.getAttribute('id', 'active_right');
                }, 500);
            }
        }
        if(target.className=="Add_News" && target!=document.querySelector("#active")){setTimeout(() => document.location.href="/modules/CreateNews",500)}else
        if(target.className=="Setting_img" && target!=document.querySelector("#active")){setTimeout(() => document.location.href="/modules/Setting",500)}else
        if(target.className=="LogOut_img" && target!=document.querySelector("#active")){setTimeout(() => document.location.href="/modules/Authorization",500)};
        

});

function FlexSlide(con, but){
    switch (con) {
        case 'Menu_container':
            var screenWidth=document.querySelector("html").clientWidth;
            var Menu_left=Math.round(((parseFloat(window.getComputedStyle(document.querySelector(`.${con}`)).marginLeft)*100)/screenWidth));
            var Button_left=parseFloat(window.getComputedStyle(document.querySelector(`.${but}`)).marginLeft);
            var stepEnd=Math.round((Button_left*100)/screenWidth);
            document.querySelector(`.${con}`).style.marginLeft=`${stepEnd}%`;
            document.querySelector(`.${but}`).style.marginLeft=`${Menu_left}%`;
            break;
        case 'Personal_Menu_container':
            var screenWidth=document.querySelector("html").clientWidth;
            var Menu_right=Math.round(((parseFloat(window.getComputedStyle(document.querySelector(`.${con}`)).marginRight)*100)/screenWidth));
            var Button_right=parseFloat(window.getComputedStyle(document.querySelector(`.${but}`)).marginRight);
            var stepEnd=Math.round((Button_right*100)/screenWidth);
            document.querySelector(`.${con}`).style.marginRight=`${stepEnd}%`;
            document.querySelector(`.${but}`).style.marginRight=`${Menu_right}%`;
            break;
    }
}

document.querySelector(".Menu_button").addEventListener("click", function(e){
    FlexSlide('Menu_container', 'Menu_button');
});
document.querySelector(".slide_menu").addEventListener("click", function(e){
    FlexSlide('Menu_container', 'Menu_button');
});

document.querySelector(".Personal_Menu_button").addEventListener("click", function(e){
    FlexSlide('Personal_Menu_container', 'Personal_Menu_button');
});


document.querySelector(".slide_menu_right").addEventListener("click", function(e){
    FlexSlide('Personal_Menu_container', 'Personal_Menu_button');
});

function Check() {
    Check_Photo=document.getElementsByClassName('News_Photo');

        for(let i=0; i<Check_Photo.length; i++){
            if(parseFloat(window.getComputedStyle(Check_Photo[i]).width) > parseFloat(window.getComputedStyle(Check_Photo[i]).height)){
                Check_Photo[i].style.width="45%";
            }
            else{
                Check_Photo[i].style.width="15%";
            }
        }
};