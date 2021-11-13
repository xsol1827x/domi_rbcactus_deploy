//signup
const rform = document.querySelector('.register-form');
rform.addEventListener('submit',e=>{
    e.preventDefault();

    //get user info
    const email = rform['email'].value;
    const pass = rform['pass'].value;
    
    //signup the user
    auth.createUserWithEmailAndPassword(email,pass).then(cred=>{
        rform.reset();
        alert('Registered successfully')
        location.href="../main.html";
    }).catch(function(err){
        alert(err)
    })
})

