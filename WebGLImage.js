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

function onChange(value) {
    console.log(value);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.vertexAttrib1f(a_PointSize, value);
    gl.drawArrays(gl.POINTS, 0, 1);
}

var red = 0.0;
var green = 0.0;
var blue = 0.0;
var alpha = 0.0;
function onRValue(value) {
    red = value;
    onColorChange();
}

function onGValue(value) {
    green = value;
    onColorChange();
}

function onBValue(value) {
    blue = value;
    onColorChange();
}

function onAValue(value) {
    alpha = value;
    onColorChange();
}

function onColorChange() {
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform4f(u_FragColor, red / 255.0, green/255.0, blue/255.0, alpha / 255.0);
    gl.drawArrays(gl.POINTS, 0, 1);
}

function onScaleValue(scale) {
    // 设置变换矩阵
    modelMatrix.setScale(scale / 100.0, scale / 100.0, 1.0);
    gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);

    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
}

function onRotateValue(angle) {
    // 设置变换矩阵
    modelMatrix.setRotate(angle, 0, 0, 1);
    gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);

    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
}


function jsReadFiles(files) {
    if (files.length) {
        // var file = files[0];
        var file = files;
        var strContext;
        var reader = new FileReader();//new一个FileReader实例
        if (/text+/.test(file.type)) {//判断文件类型，是不是text类型
            reader.onload = function() {
                strContext = this.result;
            }
            reader.readAsText(file);
        } else if(/image+/.test(file.type)) {//判断文件是不是imgage类型
            reader.onload = function() {
                strContext = this.result;
            }
            reader.readAsDataURL(file);
        }
        else {
            strContext = this.result;
        }

        return strContext;
    }
}

var vertexBuffer;   // 顶点坐标值
var texCoordBuffer; // 纹理坐标值
var bLButtonDown = false;
let filterBase = null;
let glTexture;      // gl纹理

function main() {
    var vs = document.getElementById("vs");
    var fs = document.getElementById("fs");
    // var vertexContext = jsReadFiles("shader.fs");
    window.onresize=function(){onResize()};
    var canvas = $("canvas");
    if (canvas == null) {
        print("canvas is null");
        return;
    }

    gl = getWebGLContext(canvas, true);
    if (gl == null) {
        print("Get gl context failure......");
    }

    filterBase = new JFilterBase(gl);
    filterBase.initlize();

    // canvas.onmousedown = function (ev) { onMouseDown(ev, gl, canvas, a_Position);};
    // canvas.onmouseup = function (ev) { onMouseUp(ev, gl, canvas, a_Position);};
    // canvas.onmousemove = function (ev) { onMouseMove(ev, gl, canvas, a_Position);};
    if (canvas.addEventListener) {
        // IE9, Chrome, Safari, Opera
        canvas.addEventListener("mousewheel", onMouseWheel, false);
        // Firefox
        canvas.addEventListener("DOMMouseScroll", onMouseWheel, false);
    }
    else {
        // IE 6/7/8
        canvas.attachEvent("onmousewheel", onMouseWheel);
    }

    // canvas.addEventListener("touchstart", function (ev) { onTouchStart(ev, gl, canvas, a_Position);});
    // canvas.addEventListener("touchend", function (ev) { onTouchEnd(ev, gl, canvas, a_Position);});
    // canvas.addEventListener("touchmove", function (ev) { onTouchMove(ev, gl, canvas, a_Position);});
    onLoadImage("1.jpg");

    requestAnimationFrame(draw);
    // gl.drawArrays(gl.TRIANGLE_FAN, 0, n);
}

var g_last = new Date();
function animal(angle) {
    var now = new Date();
    var elapse = now - g_last;
    g_last = now;

    var newAngle = angle + (elapse * 45.0) / 1000;

    return newAngle %= 360;
}

function draw(canvas) {
    let width = canvas.width;
    let height= canvas.height;

    if (!filterBase || !glTexture) {
        return;
    }
    let webGL = filterBase.getWebGL();
    webGL.clearColor(224.0/255.0, 224.0/255.0, 224.0/255.0, 1.0);
    webGL.clear(gl.COLOR_BUFFER_BIT);
    let Projection = new Matrix4();
    Projection.setIdentity();
    Projection.ortho(0.0, width, height, -1.0, 1.0);
    let TRSMat = new Matrix4();
    TRSMat.scale(1.0, 1.0, 1.0);
    TRSMat.translate(width/2.0, height/2.0, 0.0);

    // QRect rcShow = CenterScaleImage(m_nTextureWidth, m_nTextureHeight, nWidth, nHeight);
    // GLfloat vertexs[8] = {
    //     -rcShow.width() / 2.0f, rcShow.height() / 2.0f,
    //     rcShow.width() / 2.0f, rcShow.height() / 2.0f,
    //     -rcShow.width() / 2.0f, -rcShow.height() / 2.0f,
    //     rcShow.width() / 2.0f, -rcShow.height() / 2.0f
    // };
// 	GLfloat vertexs[8] = { 0.0f, 0.0f,
// 		(float)m_nTextureWidth, 0,
// 		0.0f, (float)m_nTextureHeight,
// 		(float)m_nTextureWidth, (float)m_nTextureHeight};

    let vertexs = new  Float32Array([
        0.0, 0.0,
        width, 0.0,
        0.0, height,
        width, height
    ]);
    let texcoords = new Float32Array([
        0.0,0.0,
        1.0,0.0,
        0.0,1.0,
        1.0,1.0
    ]);
    filterBase.useProgram();
    filterBase.initlize();
    filterBase.bind(glTexture, glTexture.width, glTexture.height);
    filterBase.filterToScreenSample(Projection.multiply(TRSMat), vertexs, texcoords, width, height);


    // requestAnimationFrame(draw);
}

function onLoadImage(fileName) {
    var image = new Image();
    image.onload = function () {
        // setAutoShow(gl, image.width, image.height);// 图片加载为设置自适应

        glTexture = filterBase.loadTexture(image);

        var canvas = $("canvas");
        draw(canvas);
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

var g_points = [];
function onMouseDown(ev, gl, canvas, a_Position) {
    bLButtonDown = true;

    var x = ev.x - canvas.offsetLeft;
    var y = ev.y - canvas.offsetTop;
    var rect = ev.target.getBoundingClientRect();

    var width = canvas.width / 2;
    var height= canvas.height/2;

    x = (x - width) / width;
    y = (height - y) / height;

    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.vertexAttrib3f(a_Position, x, y, 0.0);
    gl.drawArrays(gl.POINTS, 0, 1);
}
function onMouseUp(ev, gl, canvas, a_Position) {
    bLButtonDown = false;

    var x = ev.x - canvas.offsetLeft;
    var y = ev.y - canvas.offsetTop;
    var rect = ev.target.getBoundingClientRect();

    var width = canvas.width / 2;
    var height= canvas.height/2;
}
function onMouseMove(ev, gl, canvas, a_Position) {
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
        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.vertexAttrib3f(a_Position, x, y, 0.0);
        gl.drawArrays(gl.POINTS, 0, 1);
    }
}

function onMouseWheel(ev) {
    // cross-browser wheel delta
    var e = window.event || ev; // old IE support
    var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));

    var rangeScale = $("scale");
    var scale = parseInt(rangeScale.value);
    if (delta <= 0) {
        // 缩小
        scale = scale - 10;
    }
    else {
        // 放大
        scale = scale + 10;
    }
    rangeScale.value = scale;

    // 设置变换矩阵
    modelMatrix.setScale(scale / 100.0, scale / 100.0, 1.0);
    gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);

    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
}

function onTouchStart(ev, gl, canvas, a_Position) {
    bLButtonDown = true;
}

function onTouchMove(ev, gl, canvas, a_Position) {
    bLButtonDown = false;
}

function onTouchMove(ev, gl, canvas, a_Position) {
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
        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.vertexAttrib3f(a_Position, x, y, 0.0);
        gl.drawArrays(gl.POINTS, 0, 1);
    }
}

function onResize(){
    var canvas = $("canvas");
    var div = $("RightPanel");
}