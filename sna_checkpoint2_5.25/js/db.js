$("#btn1").click(function(){
    var db = firebase.database();
    var ref = db.ref("/");
    var value;
    ref.once("value", function(res) {
        if(res.val() == null){
            value = {"car":[
                {
                    name: $("#name").val(),
                    position: $("#pos").val(),
                    num: $("#num").val()
                }
            ]};
            ref.set(value);
        }
        else{
            value = {
                name: $("#name").val(),
                position: $("#pos").val(),
                number: $("#num").val()
            };
            var n = res.val();
            n.car.push(value);
            ref.set(n);
        }
    });
});
$("#btn2").click(function(){
    var db = firebase.database();
    var ref = db.ref("/");
    var i;
    var pos = $("#search_pos").val()
    var num = 0;
    ref.once("value", function(res) {
        for(i = 0; i < res.val().car.length; i++){
            if(res.val().car[i].position == pos){
                $("#result").text("還有 "+ res.val().car[i].number +" 個車位");
                break;
            }
        }
        if(i == res.val().car.length){
            $("#result").text("找不到停車場");
        }
    });
});
var filechooser = document.getElementById('filechooser');
var previewer = document.getElementById('previewer');

filechooser.onchange = function() {
    var files = this.files;
    var file = files[0];

    // 接受 jpeg, jpg, png 类型的图片
    if (!/\/(?:jpeg|jpg|png)/i.test(file.type)) return;

    var reader = new FileReader();

    reader.onload = function() {
        var result = this.result;

        previewer.src = result;

        // 清空图片上传框的值
        filechooser.value = '';
    };

    reader.readAsDataURL(file);
};