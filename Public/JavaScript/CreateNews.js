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

var request = new XMLHttpRequest();
request.overrideMimeType("application/json");
