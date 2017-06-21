var database = firebase.database();
var storageRef = firebase.storage().ref();

function upload(evt) {
    var file = evt.target.files[0];

    var metadata = {
        contentType: file.type
    };
    $('button').prop('disabled', true);
    storageRef.child('public/' + file.name).put(file, metadata).then((snapshot) => {
        console.log("上傳完成");
        var publicRef = firebase.storage().ref().child('public/' + file.name);
        publicRef.getDownloadURL().then((url) => {
            $('#img').val(url);
            $('#img_temp').val(url);
            $('button').prop('disabled', false);
        })
    }).catch((err) => {
        console.error(err);
    });

}
window.addEventListener('load', () => {
    document.getElementById('file').addEventListener('change', upload)
    document.getElementById('file_temp').addEventListener('change', upload)
})

function push_user(name, uid) {
    var key = firebase.database().ref('user/' + uid).push({
        name: name
    }).key;
}
function push_temp(name, lat, lng, img, link, people, star) {
    var key = firebase.database().ref('parking_temp/').push({
        name: name,
        lat: lat,
        lng: lng,
        icon: "https://maps.google.com/mapfiles/kml/shapes/info-i_maps.png",
        img : img,
        link: link,
        people: people,
        star: star
    }).key;
}
function push_private(name, fee, lat, lng, img, number, time, link) {
    var key = firebase.database().ref('parking_private/').push({
        name: name,
        fee: fee,
        lat: lat,
        lng: lng,
        icon: "https://maps.google.com/mapfiles/kml/shapes/library_maps.png",
        img: img,
        number: number,
        time: time,
        link: link
    }).key;
}
function get_user(uid,callback) {
    var dbref = firebase.database().ref('user/'+uid+'/');
    dbref.once('value', (data) =>{
        console.log(data.val(),callback);
    })
}
function get_temp(callback) {
    var dbref = firebase.database().ref('parking_temp/');
    dbref.once('value', (data) => {
        $.each(data.val(), callback);
    })
}
function get_private(callback) {
    var dbref = firebase.database().ref('parking_private/');
    dbref.once('value', (data) => {
        $.each(data.val(), callback);
    })
}
function remove_private(id){
    firebase.database().ref('parking_private/' + id).remove();
    location.reload()
}
function remove_temp(id){
    firebase.database().ref('parking_temp/' + id).remove();
    location.reload()
}