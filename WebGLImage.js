/**
 * Created by dragon on 2017/5/22.
 *
 * WebGL纹理
 */

function print(msg) {
    console.log(msg);
}

function $(id) {
    return typeof id == "string" ? document.getElementById(id) : id;
}

var bLButtonDown = false;
var filterBase;
var glTexture = 0;      // gl纹理

function onScaleValue(value) {
    if (filterBase) {
        filterBase.setScale(value);
    }
}

function onRotateValue(value) {
    if (filterBase) {
        filterBase.setRotate(value);
    }
}

function main() {
    var canvas = $("canvas");
    if (canvas == null) {
        print("canvas is null");
        return;
    }
    filterBase = new JFilterBase(getWebGLContext(canvas, true));
    filterBase.initlize();
    filterBase.setFrameSize(canvas.clientWidth, canvas.clientHeight);
    var gl = filterBase.getWebGL();
    canvas.onmousedown = function (ev) { onMouseDown(ev, gl, canvas);};
    canvas.onmouseup = function (ev) { onMouseUp(ev, gl, canvas);};
    canvas.onmousemove = function (ev) { onMouseMove(ev, gl, canvas);};

    canvas.addEventListener("touchstart", function (ev) { onTouchStart(ev, gl, canvas);});
    canvas.addEventListener("touchend", function (ev) { onTouchEnd(ev, gl, canvas);});
    canvas.addEventListener("touchmove", function (ev) { onTouchMove(ev, gl, canvas);});

    onLoadImage("1.jpg");
}

function onLoadImage(fileName) {
    var image = new Image();
    image.onload = function () {
        // setAutoShow(gl, image.width, image.height);// 图片加载为设置自适应
        print("Image(" + image.width +", " + image.height+")");
        glTexture = filterBase.loadTexture(image);
        filterBase.draw();
    };
    image.src = fileName;
}

// 获取图片完整地址打开图片
function onEditChange(input) {
    var imgURL = "";
    try{
        var file = null;
        if(input.files && input.files[0] ){
            file = input.files[0];
        }else if(input.files && input.files.item(0)) {
            file = input.files.item(0);
        }
        //Firefox 因安全性问题已无法直接通过input[file].value 获取完整的文件路径
        try{
            imgURL =  file.getAsDataURL();
        }catch(e){
            imgURL = window.URL.createObjectURL(file);
        }
    }catch(e){
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                imgURL = e.target.result;
            };
            reader.readAsDataURL(input.files[0]);
        }
    }

    if (imgURL != "") {
        onLoadImage(imgURL);
    }
}

function onMouseDown(ev, gl, canvas) {
    bLButtonDown = true;

    var x = ev.x - canvas.offsetLeft;
    var y = ev.y - canvas.offsetTop;
    var rect = ev.target.getBoundingClientRect();

    var width = canvas.width / 2;
    var height= canvas.height/2;

    x = (x - width) / width;
    y = (height - y) / height;
}
function onMouseUp(ev, gl, canvas) {
    bLButtonDown = false;

    var x = ev.x - canvas.offsetLeft;
    var y = ev.y - canvas.offsetTop;
    var rect = ev.target.getBoundingClientRect();

    var width = canvas.width / 2;
    var height= canvas.height/2;
}
function onMouseMove(ev, gl, canvas) {
    if (bLButtonDown === true) {
        var x = ev.x - canvas.offsetLeft;
        var y = ev.y - canvas.offsetTop;
        var rect = ev.target.getBoundingClientRect();

        var width = canvas.width / 2;
        var height= canvas.height/2;

        x = (x - width) / width;
        y = (height - y) / height;

        var div = $("console");
        div.innerHTML = "point(" + ev.clientX + "," + ev.clientY + ")<br/>gl(" +
            x.toFixed(2) + "," + y.toFixed(2) + ")";
    }
}

function onTouchStart(ev, gl, canvas) {
    bLButtonDown = true;
}

function onTouchMove(ev, gl, canvas) {
    bLButtonDown = false;
}

function onTouchMove(ev, gl, canvas) {
    if (bLButtonDown === true) {
        var x = ev.x - canvas.offsetLeft;
        var y = ev.y - canvas.offsetTop;
        var rect = ev.target.getBoundingClientRect();

        var width = canvas.width / 2;
        var height = canvas.height / 2;

        x = (x - width) / width;
        y = (height - y) / height;

        var div = $("console");
        div.innerHTML = "point(" + ev.touches[0].pageX + "," + ev.touches[0].pageY + ")<br/>gl(" +
            x.toFixed(2) + "," + y.toFixed(2) + ")";
    }
}