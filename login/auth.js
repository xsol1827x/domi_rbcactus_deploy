//listen for auth status changes
auth.onAuthStateChanged(user =>{
    if(user){
        console.log('user logged in')
        //redirect the user to the diary home page
    } else{
        console.log('user logged out');
    }
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
        location.href="../main.html"
    }).catch(function(err){
        alert(err)
        loginForm.reset();
    })
})