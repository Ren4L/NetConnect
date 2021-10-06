let slider = document.querySelector('.slider');
function SlideCheck(){
    slider.style.left = `${document.querySelector('.Inf').offsetLeft}px`;
    slider.style.width = `${document.querySelector('.Inf').offsetWidth}px`;
}

document.querySelector('.MenuContainer').addEventListener('click',(e)=>{
    let target = e.target;
    if(target.className != 'MenuContainer'){
        move(target);
    }
})

function move(target){
    slider.style.left = `${target.offsetLeft}px`;   
    slider.style.width = `${target.offsetWidth}px`;
    setTimeout(() => {
        switch(target.className){
            case 'Inf': document.querySelector('.form').innerHTML = `Inf`;
            break;
            case 'Av': document.querySelector('.form').innerHTML = `Av`;
            break;
            case 'Pass': document.querySelector('.form').innerHTML = `Pass`;
            break;
        }
    }, 500);
}

document.querySelector('form[name=Inf]').addEventListener('submit',(e)=>{
    e.preventDefault();
    console.log(document.forms['Inf'].elements);
    // var request = new XMLHttpRequest();
    // request.overrideMimeType("application/json");
    // request.open('POST','/Modules/Setting', true);
    // request.send(FD);
});
