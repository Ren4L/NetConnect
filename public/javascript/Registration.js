let request = new XMLHttpRequest();
document.querySelector('.Registration').addEventListener('submit', (e)=>{
    e.preventDefault();
    request.open('POST','/modules/Registration',true);
    request.setRequestHeader('Content-type', 'application/json');
    let inquiry = {login:document.forms[0].login.value, email:document.forms[0].email.value, post:'check'}
    request.send(JSON.stringify(inquiry));
    request.addEventListener('load', ()=>{
        let answer = JSON.parse(request.response);
        if(!answer.logflag && document.forms[0].login.value.length > 5){
            document.forms[0].login.style.borderBottom="3px solid red";
        }
        else if(!answer.mailflag){
            document.forms[0].email.style.borderBottom="3px solid red";
        }
        else if(document.forms[0].password.value != document.forms[0].confirmPassword.value){
            document.forms[0].confirmpassword.style.borderBottom="3px solid red";
        }
        else{
            document.querySelector('.Registration').submit();
        }
    });
});

