document.querySelector('.Registration').addEventListener('submit', (e)=>{
    e.preventDefault();
    if(document.forms[0].password.value == document.forms[0].confirmPassword.value){
        document.querySelector('.Registration').submit();
    }
    else{
        document.forms[0].confirmPassword.style.borderBottom="3px solid red";
    }
});