const dots = document.querySelectorAll('.dot');
let slides = document.getElementsByClassName('slides');
let index = 0;
let dotIndex=0;

//get the index of each dot element
let array = Array.prototype.slice.call(dots);

//change image on dot click
dots.forEach(function(element){
    element.addEventListener('click',()=>{
        removeClass();
        element.classList.add('active');
        for(i=0;i<slides.length;i++){
            slides[i].style.display="none"
        }
        //change image
        slides[array.indexOf(element)].style.display="block"
    })
})

function removeClass(){
    dots.forEach((element)=>{
        element.classList.remove('active')
    })
}

const slideShow = function(){
    for(i=0;i<slides.length;i++){
        slides[i].style.display='none';
    }
    index++;
    if(index>slides.length){
        index=1;
    }
    slides[index-1].style.display="block";
    setTimeout(slideShow,9000);
}
slideShow();

//for the image displayed show the matching dot
const showDots=function(){
    for(i=0;i<dots.length;i++){
        removeClass();
    }
    dotIndex++;
    //array.index++;
    if(dotIndex>dots.length){
        //array.index=1;
        dotIndex=1;
    }
    dots[dotIndex-1].classList.add('active');
    setTimeout(showDots,9000)
}
showDots();