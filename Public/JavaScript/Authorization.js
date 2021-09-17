
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
    if(flag){
        document.querySelector('.Registration').submit();
    }
    else{document.forms[0].email.style.borderBottom="3px solid red";}
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