function inPhoto(e){
    let photo = e.files[0];
    document.querySelector('.headUp').innerHTML = `<img src="${URL.createObjectURL(photo)}" width="150px" class="asd" style="display:flex; justify-content: center; border-radius:15px"></img>`    
}

function DopPhoto1(e){
    let photo = e.files[0];
    document.querySelector('.container1').innerHTML = `<img src="${URL.createObjectURL(photo)}" width="150px" class="asd" style="display:flex; justify-content: center; border-radius:15px"></img>`
}

function DopPhoto2(e){
    let photo = e.files[0];
    document.querySelector('.container2').innerHTML = `<img src="${URL.createObjectURL(photo)}" width="150px" class="asd" style="display:flex; justify-content: center; border-radius:15px"></img>`
}

function DopPhoto3(e){
    let photo = e.files[0];
    document.querySelector('.container3').innerHTML = `<img src="${URL.createObjectURL(photo)}" width="150px" class="asd" style="display:flex; justify-content: center; border-radius:15px"></img>`
}

document.querySelector('.CreateNews').addEventListener('submit', (e)=>{
    e.preventDefault();
        if(document.forms[0].title.value.length < 20){
            
            document.forms[0].title.style.borderBottom="3px solid red";
        }
        else{
            if(document.forms[0].content.value.length < 300){
                document.forms[0].content.style.border="3px solid red";
            }
            else{
                document.querySelector('.CreateNews').submit();
            }
        }
});
