let request = new XMLHttpRequest();
document.querySelector('.Authorization').addEventListener('submit', (e)=>{
    e.preventDefault();
    request.open('POST','/modules/Authorization',true);
    request.setRequestHeader('Content-type', 'application/json');
    let inquiry = {email:document.forms[0].email.value, password:document.forms[0].password.value, confirmation:false, post: 'pass'}
    request.addEventListener('load', ()=>{
        let answer = JSON.parse(request.response);
        if(!answer.mail){
            document.forms[0].email.style.borderBottom="3px solid red";
        }
        else if(!answer.pass){
            document.forms[0].password.style.borderBottom="3px solid red";
        }
        else{
            document.location.href='/modules/News';
        }
    });
    request.send(JSON.stringify(inquiry));
});

