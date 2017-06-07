var storageRef = firebase.storage().ref();

function upload(evt){
    var file = evt.target.files[0];

    var metadata = {
        contentType : file.type
    };

    storageRef.child('public/' + file.name).put(file, metadata).then((snapshot)=>{
        console.log("上傳完成");
    }).catch((err)=>{
        console.error(err);
    });
}

window.addEventListener('load',function(){
    document.getElementById('file').addEventListener('change' , upload);
})