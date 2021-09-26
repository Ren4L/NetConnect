var flag_left=true;
var flag_right=true;

document.querySelector(".Menu").addEventListener("click",function(e){
    if(flag_left){
        flag_left=false;
        target=e.target;
        if(document.querySelector("#active_right")!=null){
            if(target.className!="Menu" && target.className!="activeblock" && target.className!="slide_menu" ){
                if(target.className=="Home_img"){
                    document.querySelector(".activeblock").style.top="41px";
                }
                else if(target.className=="News_img"){
                    document.querySelector(".activeblock").style.top="126px";
                }else if(target.className=="Posts_img"){
                    document.querySelector(".activeblock").style.top="210px";
                }else if(target.className=="Friends_img"){
                    document.querySelector(".activeblock").style.top="295px";
                }else if(target.className=="Photos_img"){
                    document.querySelector(".activeblock").style.top="380px";
                }else if(target.className=="Videos_img"){
                    document.querySelector(".activeblock").style.top="465px";
                }
                size=0;
                size_right=35;
                color_active=100;
                color_inactive=25;
                max_width=55;
                min_width=40;
                max_left=25;
                min_left=55;
                q=setInterval(mov,1);

                function mov(){
                    if(size>=35){
                        document.querySelector("#active_right").removeAttribute('id');
                        target.id="active";
                        clearInterval(q);
                    }
                    else{
                        document.querySelector(".activeblock").style.width=`${size}px`;
                        size+=0.5;
                        if(size_right<=35){
                            document.querySelector(".activeblock_right").style.width=`${size_right}px`;
                            document.querySelector(".activeblock_right").style.left=`-${size_right}px`;
                            size_right-=0.5;
                        }
                        if(color_active>25){
                            document.querySelector('#active_right').style.filter=`brightness(${color_active}%)`;
                            color_active-=2;
                        }
                        if(color_inactive<=100){
                            target.style.filter=`brightness(${color_inactive}%)`;
                            color_inactive+=1.5;
                        }
                        if(parseInt(window.getComputedStyle(document.querySelector("#active_right")).width)>40){
                            document.querySelector("#active_right").style.width=max_width+"px";
                            max_width-=0.3;
                        }
                        if(parseInt(window.getComputedStyle(target).width)<55){
                            target.style.width=min_width+"px";
                            min_width+=0.3;
                        }
                        if(parseInt(window.getComputedStyle(target).marginLeft)<44.1){
                            target.style.marginLeft=max_left+"px";
                            max_left+=0.3;
                        }
                        if(document.querySelector("#active_right").className=="LogOut_img"){
                            if(parseInt(window.getComputedStyle(document.querySelector("#active_right")).marginRight)>15){
                                document.querySelector("#active_right").style.marginRight=min_left+"px";
                                min_left-=0.7;
                            }
                        }
                        else{
                            if(parseInt(window.getComputedStyle(document.querySelector("#active_right")).marginRight)>0){
                                document.querySelector("#active_right").style.marginRight=min_left+"px";
                                min_left-=0.8;
                            }
                        }
                        
                    }
                }
            }
        }
        else{
            if(target.className!="Menu" && target.className!="activeblock" && target.className!="slide_menu" ){
                var active=document.querySelector("#active").getBoundingClientRect().y;
                if(active<=target.getBoundingClientRect().y){
                    var difference=Math.abs(active-target.getBoundingClientRect().y);
                    if(difference>70 && difference<120){g=1;d=0.21;}else
                    if(difference>180 && difference<220){g=2;d=0.185;}else
                    if(difference>260 && difference<320){g=3;d=0.19;}else
                    if(difference>350 && difference<420){g=4;d=0.19;}else
                    if(difference>421 && difference<620){g=5;d=0.19;};
                    
                    pos=0;
                    color_active=100;
                    color_inactive=25;
                    max_width=55;
                    min_width=40;
                    max_left=40;
                    min_left=25;
                    top_cor=parseInt(window.getComputedStyle(document.querySelector(".activeblock")).top);
                    p=setInterval(move,1);
                    
                    function move(){
                        if(pos>difference-15){
                            document.querySelector("#active").removeAttribute("id");
                            target.id='active';
                            clearInterval(p);
                        }
                        else{
                            document.querySelector(".activeblock").style.top=top_cor+pos+"px";
                            if(color_inactive<=100){
                                target.style.filter=`brightness(${color_inactive}%)`;
                                color_inactive++;
                        }
                        if(color_active>25){
                            document.querySelector('#active').style.filter=`brightness(${color_active}%)`;
                            color_active--;
                        }
                        if(parseInt(window.getComputedStyle(document.querySelector("#active")).width)>39.9){
                            document.querySelector("#active").style.width=max_width+"px";
                            max_width-=d;
                        }
                        if(parseInt(window.getComputedStyle(target).width)<55){
                            target.style.width=min_width+"px";
                            min_width+=d;
                        }
                        if(parseInt(window.getComputedStyle(document.querySelector("#active")).marginLeft)>25){
                            document.querySelector("#active").style.marginLeft=max_left+"px";
                            max_left-=d;
                        }
                        if(parseInt(window.getComputedStyle(target).marginLeft)<40){
                            target.style.marginLeft=min_left+"px";
                            min_left+=d;
                        }
                            pos+=g;
                        }
                    }
                }
                else{
                        var difference=Math.abs(active-target.getBoundingClientRect().y);
                        console.log(difference);
                        if(difference>70 && difference<120){g=1;d=0.21;}else
                        if(difference>150 && difference<220){g=2;d=0.185;}else
                        if(difference>250 && difference<320){g=3;d=0.19;}else
                        if(difference>330 && difference<420){g=4;d=0.19;}else
                        if(difference>421 && difference<620){g=5;d=0.19;};
                        pos=0;
                        color_active=100;
                        color_inactive=25;
                        max_width=55;
                        min_width=40;
                        max_left=40;
                        min_left=25;
                        top_cor=parseInt(window.getComputedStyle(document.querySelector(".activeblock")).top);
                        p=setInterval(move,1);
                        
                        function move(){
                            if(pos>=difference){
                                document.querySelector("#active").removeAttribute('id');
                                target.id='active';
                                clearInterval(p);
                            }
                            else{
                                document.querySelector(".activeblock").style.top=(top_cor-pos)+"px";
                                    if(color_inactive<=100){
                                        target.style.filter=`brightness(${color_inactive}%)`;
                                        color_inactive++;
                                    }
                                    if(color_active>25){
                                        document.querySelector('#active').style.filter=`brightness(${color_active}%)`;
                                        color_active--;
                                    }
                                    if(parseInt(window.getComputedStyle(document.querySelector("#active")).width)>39.9){
                                        document.querySelector("#active").style.width=max_width+"px";
                                        max_width-=d;
                                    }
                                    if(parseInt(window.getComputedStyle(target).width)<55){
                                        target.style.width=min_width+"px";
                                        min_width+=d;
                                    }
                                    if(parseInt(window.getComputedStyle(document.querySelector("#active")).marginLeft)>25){
                                        document.querySelector("#active").style.marginLeft=max_left+"px";
                                        max_left-=d;
                                    }
                                    if(parseInt(window.getComputedStyle(target).marginLeft)<40){
                                        target.style.marginLeft=min_left+"px";
                                        min_left+=d;
                                    }
                                pos+=g;
                            }
                        }
                    }
            }
        }

        if(target.className=="Home_img" && target!=document.querySelector("#active")){setTimeout(() => document.location.href="/Modules/Home",500)}else
        if(target.className=="News_img" && target!=document.querySelector("#active")){setTimeout(() => document.location.href="/Modules/News",500)}else
        if(target.className=="Posts_img" && target!=document.querySelector("#active")){setTimeout(() => document.location.href="/Modules/Posts",500)}else
        if(target.className=="Friends_img" && target!=document.querySelector("#active")){setTimeout(() => document.location.href="/Modules/Friends",500)}else
        if(target.className=="Photos_img" && target!=document.querySelector("#active")){setTimeout(() => document.location.href="/Modules/Photos",500)}else
        if(target.className=="Videos_img" && target!=document.querySelector("#active")){setTimeout(() => document.location.href="/Modules/Videos",500)};
            
    }
    flag_left=true;
});

document.querySelector(".Personal_Menu").addEventListener("click",function(e){
    if(flag_right){
        flag_right=false;
        target=e.target;
        if(target.className!="Personal_Menu" && target.className!="Avatar" && target.className!="activeblock_right" && target.className!="slide_menu_right"){
            if(document.querySelector("#active")!=null){
                size=35;
                size_right=0;
                color_active=100;
                color_inactive=25;
                max_width=55;
                min_width=40;
                max_left=45;
                min_left=0;
                min_left_LogOut=15;
                q=setInterval(move,1);

                function move(){
                    if(window.getComputedStyle(document.querySelector('.Add_News')).display!='none'){
                        if(target.className=="LogOut_img"){
                            document.querySelector(".activeblock_right").style.top="193px";
                        }else if(target.className=="Setting_img"){
                            document.querySelector(".activeblock_right").style.top="130px";
                        }else if(target.className=="Add_News"){
                            document.querySelector(".activeblock_right").style.top="65px";
                        }
                    }
                    else{
                        if(target.className=="LogOut_img"){
                            document.querySelector(".activeblock_right").style.top="130px";
                        }else if(target.className=="Setting_img"){
                            document.querySelector(".activeblock_right").style.top="65px";
                        }
                    }
                    if(size<=0){
                        document.querySelector("#active").removeAttribute('id');
                        target.id="active_right";
                        clearInterval(q);
                    }
                    else{
                        document.querySelector(".activeblock").style.width=`${size}px`;
                        size-=0.5;
                        if(size_right<=35){
                            document.querySelector(".activeblock_right").style.width=`${size_right}px`;
                            document.querySelector(".activeblock_right").style.left=`-${size_right}px`;
                            size_right+=0.5;
                        }
                        if(color_active>25){
                            document.querySelector('#active').style.filter=`brightness(${color_active}%)`;
                            color_active-=2;
                        }
                        if(color_inactive<=100){
                            target.style.filter=`brightness(${color_inactive}%)`;
                            color_inactive+=1.5;
                        }
                        if(parseInt(window.getComputedStyle(document.querySelector("#active")).width)>39.9){
                            document.querySelector("#active").style.width=max_width+"px";
                            max_width-=0.3;
                        }
                        if(parseInt(window.getComputedStyle(target).width)<55){
                            target.style.width=min_width+"px";
                            min_width+=0.3;
                        }
                        if(target.className=="LogOut_img"){
                            if(parseInt(window.getComputedStyle(target).marginRight)<54.1){
                                target.style.marginRight=min_left_LogOut+"px";
                                min_left_LogOut+=0.65;
                            }
                        }
                        else{
                            if(parseInt(window.getComputedStyle(target).marginRight)<54.1){
                                target.style.marginRight=min_left+"px";
                                min_left+=0.65;
                            }
                        }
                        if(parseInt(window.getComputedStyle(document.querySelector("#active")).marginLeft)>25){
                            document.querySelector("#active").style.marginLeft=max_left+"px";
                            max_left-=0.45;
                        }
                    }
                }
            }
            else{
                var active=document.querySelector("#active_right").getBoundingClientRect().y;
                if(active<target.getBoundingClientRect().y){
                    var difference=Math.abs(active-target.getBoundingClientRect().y);
                    if(difference>70 && difference<120){g=1;}else
                    if(difference>130 && difference<180){g=2;};
                    pos=0;
                    color_active=100;
                    color_inactive=25;
                    max_width=55;
                    min_width=40;
                    max_left=0;
                    max_left_LogOut=15;
                    min_left=55;
                    top_cor=parseInt(window.getComputedStyle(document.querySelector(".activeblock_right")).top);
                    p=setInterval(move,1);
                    
                    function move(){
                        if(pos>difference-15){
                            document.querySelector("#active_right").removeAttribute("id");
                            target.id='active_right';
                            clearInterval(p);
                        }
                        else{
                            document.querySelector(".activeblock_right").style.top=top_cor+pos+"px";
                            if(color_active>25){
                                document.querySelector('#active_right').style.filter=`brightness(${color_active}%)`;
                                color_active-=1.5;
                            }
                            if(color_inactive<=100){
                                target.style.filter=`brightness(${color_inactive}%)`;
                                color_inactive+=1.5;
                            }
                            if(parseInt(window.getComputedStyle(document.querySelector("#active_right")).width)>40){
                                document.querySelector("#active_right").style.width=max_width+"px";
                                max_width-=0.3;
                            }
                            if(parseInt(window.getComputedStyle(target).width)<55){
                                target.style.width=min_width+"px";
                                min_width+=0.3;
                            }
                            if(target.className=="LogOut_img"){
                                if(parseInt(window.getComputedStyle(target).marginRight)<54.1){
                                    target.style.marginRight=max_left_LogOut+"px";
                                    max_left_LogOut+=0.65;
                                }
                            }
                            else{
                                if(parseInt(window.getComputedStyle(target).marginRight)<54.1){
                                    target.style.marginRight=max_left+"px";
                                    max_left+=0.65;
                                }
                            }
                            
                            if(document.querySelector("#active_right").className=="LogOut_img"){
                                if(parseInt(window.getComputedStyle(document.querySelector("#active_right")).marginRight)>15){
                                    document.querySelector("#active_right").style.marginRight=min_left+"px";
                                    min_left-=0.7;
                                }
                            }
                            else{
                                if(parseInt(window.getComputedStyle(document.querySelector("#active_right")).marginRight)>0){
                                    document.querySelector("#active_right").style.marginRight=min_left+"px";
                                    min_left-=0.8;
                                }
                            }               
                            pos+=g;
                        }
                    }
                }
                else{
                    var active=document.querySelector("#active_right").getBoundingClientRect().y;
                    if(active>target.getBoundingClientRect().y){
                        var difference=Math.abs(active-target.getBoundingClientRect().y);
                        if(difference>50 && difference<120){g=1;}else
                        if(difference>110 && difference<180){g=2;};
                        pos=0;
                        color_active=100;
                        color_inactive=25;
                        max_width=55;
                        min_width=40;
                        max_left=0;
                        max_left_LogOut=15;
                        min_left=55;
                        top_cor=parseInt(window.getComputedStyle(document.querySelector(".activeblock_right")).top);
                        p=setInterval(mov, 1);

                        function mov(){
                            if(pos>difference){
                                document.querySelector("#active_right").removeAttribute("id");
                                target.id='active_right';
                                clearInterval(p);
                            }
                            else{
                                document.querySelector(".activeblock_right").style.top=(top_cor-pos)+"px";
                                if(color_active>25){
                                    document.querySelector('#active_right').style.filter=`brightness(${color_active}%)`;
                                    color_active-=1.5;
                                }
                                if(color_inactive<=100){
                                    target.style.filter=`brightness(${color_inactive}%)`;
                                    color_inactive+=1.5;
                                }
                                if(parseInt(window.getComputedStyle(document.querySelector("#active_right")).width)>40){
                                    document.querySelector("#active_right").style.width=max_width+"px";
                                    max_width-=0.3;
                                }
                                if(parseInt(window.getComputedStyle(target).width)<55){
                                    target.style.width=min_width+"px";
                                    min_width+=0.3;
                                }
                                if(target.className=="LogOut_img"){
                                    if(parseInt(window.getComputedStyle(target).marginRight)<54.1){
                                        target.style.marginRight=max_left_LogOut+"px";
                                        max_left_LogOut+=0.65;
                                    }
                                }
                                else{
                                    if(parseInt(window.getComputedStyle(target).marginRight)<54.1){
                                        target.style.marginRight=max_left+"px";
                                        max_left+=0.65;
                                    }
                                }
                                
                                if(document.querySelector("#active_right").className=="LogOut_img"){
                                    if(parseInt(window.getComputedStyle(document.querySelector("#active_right")).marginRight)>15){
                                        document.querySelector("#active_right").style.marginRight=min_left+"px";
                                        min_left-=0.7;
                                    }
                                }
                                else{
                                    if(parseInt(window.getComputedStyle(document.querySelector("#active_right")).marginRight)>0){
                                        document.querySelector("#active_right").style.marginRight=min_left+"px";
                                        min_left-=0.8;
                                    }
                                }
                                pos+=g;
                            }
                        }
                    }
                }
            }
        }
        if(target.className=="Add_News" && target!=document.querySelector("#active")){setTimeout(() => document.location.href="/Modules/CreateNews",500)}else
        if(target.className=="Setting_img" && target!=document.querySelector("#active")){setTimeout(() => document.location.href="",500)}else
        if(target.className=="LogOut_img" && target!=document.querySelector("#active")){setTimeout(() => document.location.href="/Modules/Authorization",500)};
        
    }
    flag_right=true;
});

document.querySelector(".Menu_button").addEventListener("click", function(e){
    var screenWidth=document.querySelector("html").clientWidth;
    var Menu_left=Math.round(((parseFloat(window.getComputedStyle(document.querySelector(".Menu_container")).marginLeft)*100)/screenWidth));
    var Button_left=parseFloat(window.getComputedStyle(document.querySelector(".Menu_button")).marginLeft);
    var stepEnd=Math.round((Button_left*100)/screenWidth);
    var step_button=stepEnd;
    p=setInterval(move,1);

    function move(){
       if(Menu_left>stepEnd){
           clearInterval(p);
       } 
       else{
           document.querySelector(".Menu_container").style.marginLeft=`${Menu_left}%`;
           document.querySelector(".Menu_button").style.marginLeft=`${step_button}%`;
           step_button-=0.5;
           Menu_left+=0.5;
       }
    }
});
document.querySelector(".slide_menu").addEventListener("click", function(e){
    var screenWidth=document.querySelector("html").clientWidth;
    var Menu_left=Math.round(((parseFloat(window.getComputedStyle(document.querySelector(".Menu_container")).marginLeft)*100)/screenWidth));
    var Button_left=parseFloat(window.getComputedStyle(document.querySelector(".Menu_button")).marginLeft);
    var stepEnd=Math.round((Button_left*100)/screenWidth);
    var step_button=stepEnd;
    p=setInterval(move,1);

    function move(){
       if(Menu_left<stepEnd){
           clearInterval(p);
       } 
       else{
           document.querySelector(".Menu_container").style.marginLeft=`${Menu_left}%`;
           document.querySelector(".Menu_button").style.marginLeft=`${step_button}%`;
           step_button+=0.5;
           Menu_left-=0.5;
       }
    }
});
document.querySelector(".Personal_Menu_button").addEventListener("click", function(e){
    var screenWidth=document.querySelector("html").clientWidth;
    var Menu_right=Math.round(((parseFloat(window.getComputedStyle(document.querySelector(".Personal_Menu_container")).marginRight)*100)/screenWidth));
    var Button_right=parseFloat(window.getComputedStyle(document.querySelector(".Personal_Menu_button")).marginRight);
    var stepEnd=Math.round((Button_right*100)/screenWidth);
    var step_button=stepEnd;
    p=setInterval(move,1);

    function move(){
       if(Menu_right>stepEnd){
           clearInterval(p);
       } 
       else{
           document.querySelector(".Personal_Menu_container").style.marginRight=`${Menu_right}%`;
           document.querySelector(".Personal_Menu_button").style.marginRight=`${step_button}%`;
           step_button-=0.5;
           Menu_right+=0.5;
       }
    }
});


document.querySelector(".slide_menu_right").addEventListener("click", function(e){
    var screenWidth=document.querySelector("html").clientWidth;
    var Menu_right=Math.round(((parseFloat(window.getComputedStyle(document.querySelector(".Personal_Menu_container")).marginRight)*100)/screenWidth));
    var Button_right=parseFloat(window.getComputedStyle(document.querySelector(".Personal_Menu_button")).marginRight);
    var stepEnd=Math.round((Button_right*100)/screenWidth);
    var step_button=stepEnd;
    p=setInterval(move,1);

    function move(){
       if(Menu_right<stepEnd){
           clearInterval(p);
       } 
       else{
           document.querySelector(".Personal_Menu_container").style.marginRight=`${Menu_right}%`;
           document.querySelector(".Personal_Menu_button").style.marginRight=`${step_button}%`;
           step_button+=0.5;
           Menu_right-=0.5;
       }
    }
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