let savedAns=[];

const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const quizes = document.querySelectorAll('.quiz');
const form = document.querySelector('form');
const inputEl = document.querySelectorAll('input');
const total = quizes.length;

//a variable to increment the classes
let ind = 0;

//get all the input elements for each question, assign a class
quizes.forEach(function(element){
    ind++;
    let inputs = element.querySelectorAll('input');
    inputs.forEach((input)=>{
        input.classList.add(`quiz${ind}`)
    })
})

//function to only allow the user to check one checkbox
const checkBox = function(checkbox){
    let checkboxes = document.getElementsByName('answer');
    checkboxes.forEach((element)=>{
        if(element!==checkbox) {
            element.checked=false;
        }
    })
}

//keep a track of which question is visible 
let count =0;

//function to hide all the quizes
const hide = function(){
    quizes.forEach((element)=>{
        element.style.display='none'
    })
}

//function to calculate the results of the array
//reference: https://stackoverflow.com/questions/2440295/extracting-the-most-duplicate-value-from-an-array-in-javascript-with-jquery
const calc = function() {
    let counts = {}, max = 0, res;
    for (let v in savedAns) {
    counts[savedAns[v]] = (counts[savedAns[v]] || 0) + 1;
    if (counts[savedAns[v]] > max) { 
    max = counts[savedAns[v]];
    res = savedAns[v];
  }
}
console.log(res + " occurs " + counts[res] + " times");

//display results according to choice
if(res==3){
    //rubber plant
    console.log('3 was the highest')
    window.location.href = '../src/results/resultthree.html'
} else if(res==2){
    //devils ivy
    console.log('2 was the highest')
    window.location.href='../src/results/resulttwo.html'
} else if (res==1){
    //bunny ears cactus
    console.log('1 was the highest')
    window.location.href='../src/results/resultone.html'
}

}

//show and hide divs when user presses next
nextBtn.addEventListener('click',function(){
    //the variable equals -1, because if the index=-1 it doesn't exist
    let userAns = -1;
    //get all the active inputs for that question
    const activeInputs=quizes[count].querySelectorAll('input');
    activeInputs.forEach((input,index)=>{
        if(input.checked){
            userAns = index;
        }
    });
    if(userAns===-1){
        alert('Please select an answer');
        return;
    }

    if(count<total-1){
        inputEl.forEach(function(element){
            if(element.checked){
                savedAns[count]=element.value;
                console.log(savedAns)
            } 
        }) 
        count++;    
    }     
    else{
        inputEl.forEach(function(element){
            if(element.checked){
                savedAns[count]=element.value;
                console.log(savedAns)
            }
        })
        //calculate the results here
        calc(savedAns);
    }
    hide();
    quizes[count].style.display='block'
})

prevBtn.addEventListener('click',function(){
    if(count>0){
        count--;
    } else{
        alert('no more previous questions')
        return
    }
    hide();
    quizes[count].style.display='block'
})

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

//onclick logout for mobile
function clickLogOut(){
    auth.signOut().then(()=>{
        alert('User signed out');
    })
}

//logout
const logout = document.querySelector('.button-nav-logout');
logout.addEventListener('click',e=>{
    e.preventDefault();
    auth.signOut().then(()=>{
        alert('User signed out');
    })
})