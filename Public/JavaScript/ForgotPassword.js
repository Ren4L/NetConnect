var request = new XMLHttpRequest();
request.overrideMimeType("application/json");
document.querySelector('.ForgotPassword').addEventListener('submit', (e)=>{
    e.preventDefault();
    request.open('POST','/modules/ForgotPassword',true);
    request.setRequestHeader('Content-type', 'application/json');
    let inquiry = {email:document.forms[0].email.value, post: 'pass'}
    request.addEventListener('load', ()=>{
        let answer = JSON.parse(request.response);
        console.log(answer);
        if(!answer.mail){
            document.forms[0].email.style.borderBottom="3px solid red";
        }
        else {
            document.forms[0].submit();
        }
    });
    request.send(JSON.stringify(inquiry));
});
