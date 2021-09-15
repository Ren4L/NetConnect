document.querySelector('.Registration').addEventListener('submit', (e)=>{
    e.preventDefault();
    var FullList;
    readTextFile("/Public/Users/FullList.json", function(text){
        FullList = JSON.parse(text);
    });
    console.log(FullList);
    if(document.forms[0].password.value == document.forms[0].confirmPassword.value){
        if(document.forms[0].login.value.length >= 4){
            document.querySelector('.Registration').submit();
        }
        else{
            document.forms[0].login.style.borderBottom="3px solid red";
        }
    }
    else{
        document.forms[0].confirmPassword.style.borderBottom="3px solid red";
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