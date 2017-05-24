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

var VSHADER_SOURCE =
    'attribute vec4 a_Position;\n' +
    'attribute vec2 a_TexCoord;\n' +
    'varying vec2 v_TexCoord;\n' +
    'uniform mat4 u_ModelMatrix;\n' +
    'void main()\n' +
    '{\n' +
    '    gl_Position = u_ModelMatrix * a_Position;\n' +
    '    v_TexCoord = a_TexCoord;\n' +
    '}'

var FSHADER_SOURCE =
    'precision mediump float;\n' +// 要添加这行不然初始化会失败
    'uniform sampler2D u_Sampler;\n' +
    'varying vec2 v_TexCoord;\n' +
    'void main()\n' +
    '{\n' +
    '    gl_FragColor = texture2D(u_Sampler, v_TexCoord);\n' +
    // '    gl_FragColor = vec4(1.0, 0, 0, 1.0);\n' +
    '}'


var u_ModelMatrix;// 变换矩阵
var modelMatrix;  // 变换矩阵值
var a_TexCoord; // 纹理坐标
var a_Position; // 顶点坐标
var vertexBuffer;   // 顶点坐标值
var texCoordBuffer; // 纹理坐标值

var texture;    // 纹理值
var u_Sampler;  // 纹理

var gl;
var bLButtonDown = false;

function main() {
    var canvas = $("canvas");
    if (canvas == null) {
        print("canvas is null");
        return;
    }

    gl = getWebGLContext(canvas, true);
    if (gl == null) {
        print("Get gl context failure......");
    }

    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        print("init shaders error......");
        return;
    }

    // canvas.onmousedown = function (ev) { onMouseDown(ev, gl, canvas, a_Position);};
    // canvas.onmouseup = function (ev) { onMouseUp(ev, gl, canvas, a_Position);};
    // canvas.onmousemove = function (ev) { onMouseMove(ev, gl, canvas, a_Position);};
    // if (canvas.addEventListener) {
    //     // IE9, Chrome, Safari, Opera
    //     canvas.addEventListener("mousewheel", onMouseWheel, false);
    //     // Firefox
    //     canvas.addEventListener("DOMMouseScroll", onMouseWheel, false);
    // }
    // else {
    //     // IE 6/7/8
    //     canvas.attachEvent("onmousewheel", onMouseWheel);
    // }

    // canvas.addEventListener("touchstart", function (ev) { onTouchStart(ev, gl, canvas, a_Position);});
    // canvas.addEventListener("touchend", function (ev) { onTouchEnd(ev, gl, canvas, a_Position);});
    // canvas.addEventListener("touchmove", function (ev) { onTouchMove(ev, gl, canvas, a_Position);});

    // 获取a_Position
    a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    if (a_Position < 0) {
        print("get a_Position failure......");
        return;
    }
    a_TexCoord = gl.getAttribLocation(gl.program, 'a_TexCoord');

    var n = initVertexBuffers(gl);// 初始化顶点
    if (n < 0) {
        return;
    }
    initTexture(gl);// 初始化纹理

    // 设置变换矩阵
    u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
    if (u_ModelMatrix < 0) {
        print("get u_ModelMatrix failure");
        return;
    }

    modelMatrix = new Matrix4();
    modelMatrix.setScale(1.0, 1.0, 1.0);
    gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);


    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    onLoadImage("1.jpg");

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

function draw(gl, n, angle, modelMatrix, u_ModelMatrix) {
    modelMatrix.setRotate(angle, 0, 0, 1);
    gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.LINE_LOOP, 0, n);
}

function initVertexBuffers(gl) {
    var n = 4;

    // 创建缓冲区对象
    vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
        print("create Buffer failure......");
        return -1;
    }

    texCoordBuffer = gl.createBuffer();
    if (!texCoordBuffer) {
        print("create Buffer failure......");
        return -1;
    }
    return n;
}

function initTexture(gl) {
    texture = gl.createTexture();
    u_Sampler = gl.getUniformLocation(gl.program, 'u_Sampler');
}

function onLoadImage(fileName) {
    var image = new Image();
    image.onload = function () {
        setAutoShow(gl, image.width, image.height);// 图片加载为设置自适应
        loadTexture(gl, texture, u_Sampler, image);// 加载纹理
    };
    image.src = fileName;
}

function loadTexture(gl, texture, u_Sampler, image) {
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);// 对纹理图片进行Y轴反转
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    gl.uniform1i(u_Sampler, 0);

    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
}

function setAutoShow(gl, imgWidth, imgHeight) {
    var canvas = $("canvas");
    var canvasWidth = canvas.width; // 画布宽高
    var canvasHeight= canvas.height;

    var startXonCanvas; // 图片在画布上显示的起始位置
    var startYonCanvas;
    var startXonImg;    // 图片显示的起始位置
    var startYonImg;
    var imgShowWidth;   // 图片显示宽高
    var imgShowHeight;
    var scale = 1.0;    // 缩放倍数

    if (canvasWidth >= imgWidth && canvasHeight >= imgHeight) {
        // 画布大
        startXonCanvas = (canvasWidth - imgWidth) / 2.0;
        startYonCanvas = (canvasHeight - imgHeight) / 2.0;
        imgShowWidth = imgWidth;
        imgShowHeight = imgHeight;
    }
    else {
        var percentW = canvasWidth / imgWidth;
        var percentH = canvasHeight / imgHeight;

        if (percentH < percentW)
            scale = percentH;
        else
            scale = percentW;

        //得到缩略图的显示大小
        imgShowWidth = imgWidth * scale;
        imgShowHeight = imgHeight * scale;

        startXonCanvas = (canvasWidth - imgShowWidth) / 2.0;
        startYonCanvas = (canvasHeight - imgShowHeight) / 2.0;
    }
    startXonImg = 0.0;
    startYonImg = 0.0;

    // 转换为WebGL的顶点坐标
    var width = canvas.width / 2;
    var height= canvas.height/2;

    // canvas上的坐标转换为WebGL上的坐标
    // x1 = (y - width) / width;
    // y1 = (height - x) / height;
    // WebGL上的坐标对应图片上的坐标
    // var vertices = new Float32Array([
    //     -1.0, 1.0, 0.0, 1.0,
    //     -1.0, -1.0, 0.0, 0.0,
    //     1.0, -1.0, 1.0, 0.0,
    //     1.0, 1.0, 1.0, 1.0
    // ]);

    // // 顶点坐标
    // var vertices = new Float32Array([
    //     (startXonCanvas - width) / width,               (height - startYonCanvas) / height,
    //     (startXonCanvas - width) / width,               (height - (startYonCanvas + imgShowHeight)) / height,
    //     (startXonCanvas + imgShowWidth - width) / width,(height - (startYonCanvas + imgShowHeight)) / height,
    //     (startXonCanvas + imgShowWidth - width) / width,(height - startYonCanvas) / height
    // ]);
    //
    // //　图片坐标
    // var texCoords = new Float32Array([
    //     startXonImg / imgWidth,                 startYonImg / imgHeight,
    //     startXonImg / imgWidth,                 (startYonImg + imgShowHeight) / imgHeight,
    //     (startXonImg + imgShowWidth) / imgWidth,startYonImg / imgHeight,
    //     (startXonImg + imgShowWidth) / imgWidth,(startYonImg + imgShowHeight) / imgHeight
    // ]);

    // 顶点坐标图片坐标
    var verticesTexCoords = new Float32Array([
        (startXonCanvas - width) / width,               (height - startYonCanvas) / height,                     startXonImg / imgWidth,                 startYonImg / imgHeight,
        (startXonCanvas - width) / width,               (height - (startYonCanvas + imgShowHeight)) / height,   startXonImg / imgWidth,                 (startYonImg + imgShowHeight) / imgHeight,
        (startXonCanvas + imgShowWidth - width) / width,(height - (startYonCanvas + imgShowHeight)) / height,   (startXonImg + imgShowWidth) / imgWidth,startYonImg / imgHeight,
        (startXonCanvas + imgShowWidth - width) / width,(height - startYonCanvas) / height,                     (startXonImg + imgShowWidth) / imgWidth,(startYonImg + imgShowHeight) / imgHeight
    ]);

    // 创建缓冲区对象
    if (vertexBuffer) {
        gl.deleteBuffer(vertexBuffer);
    }
    vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
        print("create Buffer failure......");
        return -1;
    }
    // 将缓冲区对象绑定到目标
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    // 向缓冲区对象写入数据
    gl.bufferData(gl.ARRAY_BUFFER, verticesTexCoords, gl.STATIC_DRAW);
    // 将缓冲区对象分配给a_Position变量
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, verticesTexCoords.BYTES_PER_ELEMENT * 4, 0);
    // 连接a_Position变量与分配给他的缓冲区对象
    gl.enableVertexAttribArray(a_Position);

    if (texCoordBuffer) {
        gl.deleteBuffer(texCoordBuffer);
    }
    texCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, verticesTexCoords, gl.STATIC_DRAW);
    gl.vertexAttribPointer(a_TexCoord, 2, gl.FLOAT, false, verticesTexCoords.BYTES_PER_ELEMENT * 4, verticesTexCoords.BYTES_PER_ELEMENT * 2);
    gl.enableVertexAttribArray(a_TexCoord);
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
    if (ev.detail <= 0) {
        // 缩小
        $("scale").value -= 10;
    }
    else {
        // 放大
        $("scale").value += 10;
    }
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