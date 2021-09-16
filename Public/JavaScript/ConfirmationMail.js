
document.querySelector('.Registration').addEventListener('submit', (e)=>{
    e.preventDefault();
    var User;
    var flag = true;
    readTextFile(`/Public/Users/NotMail${document.forms[0].login.value}.json`, function(text){
        User = JSON.parse(text);
    });
    if(document.forms[0].code.value != User.Code){
        document.forms[0].code.style.borderBottom="3px solid red";
        flag = false;
    }
    if(flag){
        document.querySelector('.Registration').submit();
    }
            
});


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