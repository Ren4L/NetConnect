let LikeFlag = true;
function Like(e){
    if(LikeFlag){
        LikeFlag = false;
        let req = new XMLHttpRequest();
        req.overrideMimeType('application/json');
        req.open('POST', '/Modules/PersonalPage');
        req.setRequestHeader('Content-type', 'application/json');
        switch (e.className) {
            case "Like":
                req.addEventListener('load',()=>{
                    let answer = JSON.parse(req.response);
                    if(answer.bool){
                        e.className = 'LikeOn';
                        e.parentNode.querySelector('.LikesNum').innerHTML = Number.parseInt(e.parentNode.querySelector('.LikesNum').innerHTML)+1;
                        LikeFlag = true;
                    }
                });
                list = {
                    post: 'Like',
                    name: e.parentNode.parentNode.parentNode.getAttribute('value'),
                    login: e.parentNode.parentNode.querySelector('.Name_Avatar').innerHTML
                }
                req.send(JSON.stringify(list));
                break;
            case "LikeOn":
                req.addEventListener('load',()=>{
                    let answer = JSON.parse(req.response);
                    if(answer.bool){
                        e.className = 'Like';
                        e.parentNode.querySelector('.LikesNum').innerHTML = Number.parseInt(e.parentNode.querySelector('.LikesNum').innerHTML)-1;
                        LikeFlag = true;
                    }
                });
                list = {
                    post: 'DisLike',
                    name: e.parentNode.parentNode.parentNode.getAttribute('value'),
                    login: e.parentNode.parentNode.querySelector('.Name_Avatar').innerHTML
                }
                req.send(JSON.stringify(list));
                break;
        }
    }
}