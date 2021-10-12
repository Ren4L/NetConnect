var request = new XMLHttpRequest();
request.overrideMimeType("application/json");
document.querySelector('.Authorization').addEventListener('submit', (e)=>{
    e.preventDefault();
    var FullList;
    var flag = false;
    readTextFile("/Public/Users/FullList.json", function(text){
        FullList = JSON.parse(text);
    });
    for (let i = 0; i < FullList.Users.length; i++) {
        if(document.forms[0].email.value == FullList.Users[i].email){
            flag = true;
        }
        if(flag){break;}
    }
    if(!flag){
        document.forms[0].email.style.borderBottom="3px solid red";
    }
    else{
        document.forms[0].submit();
    }
});


function readTextFile(file, callback) {
    request.open("GET", file, false);
    request.onreadystatechange = function() {
        if (request.readyState === 4 && request.status == "200") {
            callback(request.responseText);
        }
    }
    request.send(null);
}