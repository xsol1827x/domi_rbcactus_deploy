//get the pop up close button
const closebtn = document.querySelector('.button-login-close');
closebtn.addEventListener('click',()=>{
    loginForm.style.display="none";
})

//open the login pop up
const loginBtn = document.querySelector('.button-login-open');
loginBtn.addEventListener('click',()=>{
    loginForm.style.display="block";
})

//login
const loginForm = document.querySelector('.login-form');
loginForm.addEventListener('submit',e=>{
    e.preventDefault();

    //get the user info
    const email = loginForm['email'].value;
    const pass = loginForm['pass'].value;

    auth.signInWithEmailAndPassword(email,pass).then(cred=>{
        alert('Logged in')
        loginForm.reset();
    }).catch(function(err){
        alert(err)
        loginForm.reset();
    })
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

//hide log in popup when logged in
//listen for auth status changes
auth.onAuthStateChanged(user =>{
    if(user){
        console.log('user logged in')
        loginForm.style.display="none";
        document.querySelector('.button-login-open').style.display="none";
        document.querySelector('.button-nav-logout').style.display="block";
    } else{
        console.log('user logged out');
        loginForm.style.visibility="visible";
        document.querySelector('.button-login-open').style.display="block";
        document.querySelector('.button-nav-logout').style.display="none";
    }
})