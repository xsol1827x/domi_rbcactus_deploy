const fileSelector=document.getElementById('filetag');
//const display = document.getElementById("preview");
const inputForm = document.querySelector('.entry');
const title = document.getElementById('title');
const body = document.getElementById('text');
const ulList=document.querySelector('.diary-photo-list');
//test
const inject = document.getElementById('diary-entries');

//listen for auth status changes
auth.onAuthStateChanged(user =>{
  if(user){
      console.log('user logged in')
      //redirect the user to the diary home page


// Get a reference to the storage service, which is used to create references in your storage bucket
var storage = firebase.storage();
var storageRef = storage.ref();


//reference: https://stackoverflow.com/questions/41673499/how-to-upload-multiple-files-to-firebase
fileSelector.addEventListener('change', function(e){ 
  const promises = [];
  let fileList = e.target.files;
    for(const file of fileList){
        promises.push(uploadImageAsPromise(file))
      }
      
//The Promise.all() will stop the execution, until all of the promises are resolved.
  Promise.all(promises).then((fileURLS)=>{
//Once all the promises are resolved, you will get the urls in a array.
    console.log(fileURLS)
  })
});

  //waiting to upload each image file using a promise
  //Upload Image Function returns a promise  
  async function uploadImageAsPromise(imageFile) {
    return new Promise(function (resolve, reject) {
      //const task = storageRef.child(folder).child(imageFile.name).put(imageFile);
      const task = storageRef.child(imageFile.name).put(imageFile);

      async function complete() {
        //The getDownloadURL returns a promise and it is resolved to get the image url.
        const imageURL = await task.snapshot.ref.getDownloadURL();
        resolve(imageURL);
      }

      //show percentage on page
      task.on(
        "state_changed",
        function progress(snapshot) {
          const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if(percentage==100){
            alert('Images have been uploaded.')
            //then reload page
            window.location.reload();
          }
        },

        function error(err) {
          reject(err);
        },
      );
    });
  }

//get the references of the images
storageRef.listAll().then(function(result){
  result.items.forEach(function(imageRef){
    ShowImgs(imageRef);
})
})

//shows all the images from firestore
const ShowImgs = function(imageRef){
  imageRef.getDownloadURL().then(function(url){
    //style the images
    let li = document.createElement('li');
    ulList.appendChild(li)

    //display the image on the UI
    let div = document.createElement('img');
    div.setAttribute('src',url);
    li.appendChild(div)
    console.log(url)

    //delete button for the images
    let delBtn = document.createElement("button");
    delBtn.classList.add('button-delete-photo')
    delBtn.innerHTML="X";
    li.appendChild(delBtn);

    delBtn.addEventListener("click",()=>{
    div.classList.add('display');
    delBtn.classList.add('display');
    
    //create a reference to the image
    imageRef.delete();
    })
  })
}

} else{
  console.log('user logged out');
  //hide all the other html elements and replace them with a log in text
  document.querySelector('.file-upload-button').style.display="none";
  document.getElementById('listbtn').style.display="none";
  let text = document.createElement('p');
  text.innerText="Please log in to use the diary feature."
  text.classList.add('about-main-contents-character-title')
  ulList.appendChild(text);
}
})

//onclick logout for mobile
function clickLogOut(){
  auth.signOut().then(()=>{
      alert('User signed out');
  })
}