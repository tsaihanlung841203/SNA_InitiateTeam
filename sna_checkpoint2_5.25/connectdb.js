var database = firebase.database();
var storageRef = firebase.storage().ref();

function upload(evt) {
    var imgurl;
    var file = evt[0].files[0];

    var metadata = {
        contentType : file.type
    };
    //console.log(file)
    storageRef.child('public/' + file.name).put(file, metadata).then((snapshot) => {
        console.log("上傳完成",snapshot);
    }).catch((err) => {
        console.error(err);
    });

    var publicRef = firebase.storage().ref().child('public/' + file.name);
    publicRef.getDownloadURL().then((url)=>{
        imgurl = url;
        console.log(url);
    })
    return imgurl;
}

function push_user(name , account , pwd){
      var key = firebase.database().ref('user/').push({
        name : name,
        account : account,
        pwd : pwd
    }).key;
}
function push_temp(name , lat , lng , link) {
    var key = firebase.database().ref('parking_temp/').push({
        name : name,
        lat : lat,
        lng : lng,
        icon : "https://maps.google.com/mapfiles/kml/shapes/info-i_maps.png",
        content : content,
        link : link
    }).key;
}
function push_private(name , fee  , lat , lng , img , number , time , link) {
    var key = firebase.database().ref('parking_private/').push({
        name : name,
        fee : fee,
        lat : lat,
        lng : lng,
        icon : "https://maps.google.com/mapfiles/kml/shapes/library_maps.png",
        img : upload(img),
        number : number,
        time : time,
        link : link
    }).key;
}
function get_user(){
    var dbref = firebase.database().ref('user/');
    dbref.once('value',(data)=>{
        $.each(data.val(), function(index, value) {
            console.log(value);
        });
    })
}
function get_temp(callback){
    var dbref = firebase.database().ref('parking_temp/');
    dbref.once('value',(data)=>{
        $.each(data.val(), callback);
    })
}
function get_private(){
    var dbref = firebase.database().ref('parking_private/');
    dbref.once('value',(data)=>{
        $.each(data.val(), function(index, value) {
            console.log(value);
        });
    })
}