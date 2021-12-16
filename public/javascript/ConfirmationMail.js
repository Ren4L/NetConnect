let request = new XMLHttpRequest();
document.querySelector('.Registration').addEventListener('submit', (e)=>{
    e.preventDefault();
    request.open('POST','/modules/ConfirmationMail',true);
    request.setRequestHeader('Content-type', 'application/json');
    let inquiry = {code:document.forms[0].code.value, login:document.forms[0].login.getAttribute('value'), post:'check'}
    request.send(JSON.stringify(inquiry));
    request.addEventListener('load', ()=>{
        let answer = JSON.parse(request.response);
        if(!answer.flag){
            document.forms[0].code.style.borderBottom="3px solid red";
        }
        else {
            document.querySelector('.Registration').submit();
        }
    });         
});

