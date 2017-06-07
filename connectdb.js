var database = firebase.database();

function push_user(name , account , pwd){
      var key = firebase.database().ref('user/').push({
        name : name,
        account : account,
        pwd : pwd
    }).key;
}
function push_temp(lat , lng , icon , content , name , time , link) {
    var key = firebase.database().ref('parking_temp/').push({
        name : name,
        lat : lat,
        lng : lng,
        icon : icon,
        content : content,
        time : time,
        link : link
    }).key;
}
function push_private(lat , lng , icon , content , name , fee , time , link) {
    var key = firebase.database().ref('parking_private/').push({
        name : name,
        fee : fee,
        lat : lat,
        lng : lng,
        icon : icon,
        content : content,
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
function get_temp(){
    var dbref = firebase.database().ref('parking_temp/');
    dbref.once('value',(data)=>{
        $.each(data.val(), function(index, value) {
            console.log(value);
        });
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