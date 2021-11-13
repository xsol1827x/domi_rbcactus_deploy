const dots = document.querySelectorAll('.banner-dots');
let slides = document.getElementsByClassName('banner-list');
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


//listen for auth status changes
auth.onAuthStateChanged(user =>{
    if(user){
        console.log('user logged in');
        //redirect the user to the diary home page
        //show the login button
        logout.style.display="block";

    } else{
        console.log('user logged out');
        //hide the log out button
        logout.style.display="none";
    }
})

//logout
const logout = document.querySelector('.button-nav-logout');
logout.addEventListener('click',e=>{
    e.preventDefault();
    auth.signOut().then(()=>{
        alert('User signed out');
    })
})

//onclick logout for mobile
function clickLogOut(){
    auth.signOut().then(()=>{
        alert('User signed out');
    })
}