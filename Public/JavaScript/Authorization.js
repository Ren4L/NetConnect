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
            if(FullList.Users[i].ConfirmationMail){
                flag = true;
            }
        }
        if(flag){break;}
    }
    if(flag){
        request.open('POST','/Modules/Authorization',true);

        request.setRequestHeader('Content-type', 'application/json');
        let inquiry = {email:document.forms[0].email.value, password:document.forms[0].password.value, confirmation:false}
        request.addEventListener('load', ()=>{
            let answer = JSON.parse(request.response);
            if(!answer.confirmation){
                document.forms[0].password.style.borderBottom="3px solid red";
            }
            else{
                document.location.href='/Modules/News';
            }
        });
        request.send(JSON.stringify(inquiry));
    
    }
    else{document.forms[0].email.style.borderBottom="3px solid red";}
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