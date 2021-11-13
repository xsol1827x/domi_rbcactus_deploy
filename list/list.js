const inject = document.querySelector('.placeholder');
const dbData = document.getElementById('db-entries');

//get a reference to the storage service
var storage = firebase.storage();
var storageRef = storage.ref();
storageRef.listAll().then(function(result){
    result.items.forEach(function(imgRef){
        imgRef.getDownloadURL().then(function(url){
            let img = document.createElement('img');
            img.setAttribute('src',url);
            inject.appendChild(img);
        })
    })
})

//listen for auth status changes
auth.onAuthStateChanged(user =>{
    if(user){
        console.log('user logged in');
        //redirect the user to the diary home page
    } else{
        console.log('user logged out');
    }
})

//logout
const logout = document.querySelector('.button-nav-logout');
logout.addEventListener('click',e=>{
    e.preventDefault();
    auth.signOut().then(()=>{
        alert('User signed out');
        window.location.reload();
    })
})

//onclick logout for mobile
function clickLogOut(){
    auth.signOut().then(()=>{
        alert('User signed out');
        window.logcation.reload();
    })
}