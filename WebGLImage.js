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

var VSHADER_SOURCE =
    'attribute vec4 a_Position;\n' +
    'attribute float a_PointSize;\n' +
    'attribute vec2 a_TexCoord;\n' +
    'varying vec2 v_TexCoord;\n' +
    'void main()\n' +
    '{\n' +
    '    gl_Position = a_Position;\n' +
    // '    gl_PointSize = a_PointSize;\n' +
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

var a_Position;
var u_ModelMatrix;// 平移分量
var a_PointSize;
var u_FragColor;
var gl;
var bLButtonDown = false;
var texture;
var u_Sampler;
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

    // a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize');
    // if (a_PointSize < 0) {
    //     print("get a_PointSize failure......");
    // }
    // 获取a_Position
    a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    if (a_Position < 0) {
        print("get a_Position failure......");
        return;
    }
    // u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
    // if (u_ModelMatrix < 0) {
    //     print("get u_ModelMatrix failure");
    //     return;
    // }
    //
    // u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
    // if (u_FragColor < 0) {
    //     print("get u_FragColor failure......");
    //     return;
    // }

    var n = initVertexBuffers(gl);
    if (n < 0) {
        return;
    }

    // canvas.onmousedown = function (ev) { onMouseDown(ev, gl, canvas, a_Position);};
    // canvas.onmouseup = function (ev) { onMouseUp(ev, gl, canvas, a_Position);};
    // canvas.onmousemove = function (ev) { onMouseMove(ev, gl, canvas, a_Position);};
    //
    // canvas.addEventListener("touchstart", function (ev) { onTouchStart(ev, gl, canvas, a_Position);});
    // canvas.addEventListener("touchend", function (ev) { onTouchEnd(ev, gl, canvas, a_Position);});
    // canvas.addEventListener("touchmove", function (ev) { onTouchMove(ev, gl, canvas, a_Position);});

    // gl.vertexAttrib1f(a_PointSize, 10.0);
    // gl.vertexAttrib3f(a_Position, 0.5, 0.5, 0.0);

    // red = 255.0;
    // green = 0.0;
    // blue = 0.0;
    // alpha = 255;
    // gl.uniform4f(u_FragColor, red / 255.0, green/255.0, blue/255.0, alpha / 255.0);

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // 设置变换矩阵
    // var modelMatrix = new Matrix4();
    // var angle = 0.0;
    // modelMatrix.setRotate(angle, 0, 0, 1);
    // modelMatrix.setTranslate(0.5, 0, 0);
    // modelMatrix.setScale(1.5, 1.5, 0);
    // modelMatrix.rotate(angle, 0, 0, 1);
    // gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
    // var tick = function () {
    //     angle = animal(angle);
    //     draw(gl, n, angle, modelMatrix, u_ModelMatrix);
    //     requestAnimationFrame(tick);
    // }

    // tick();
    initTexture(gl);
    onLoadImage("512.jpg");

    gl.drawArrays(gl.TRIANGLE_FAN, 0, n);
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
    var vertices = new Float32Array([
        -0.5, 0.5, 0.0, 1.0,
        -0.5, -0.5, 0.0, 0.0,
        0.5, -0.5, 1.0, 0.0,
        0.5, 0.5, 1.0, 1.0
    ]);
    var n = 4;

    // 创建缓冲区对象
    var vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
        print("create Buffer failure......");
        return -1;
    }

    // 将缓冲区对象绑定到目标
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    // 向缓冲区对象写入数据
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    // 将缓冲区对象分配给a_Position变量
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, vertices.BYTES_PER_ELEMENT*4, 0);
    // 连接a_Position变量与分配给他的缓冲区对象
    gl.enableVertexAttribArray(a_Position);

    var texCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    var a_TexCoord = gl.getAttribLocation(gl.program, 'a_TexCoord');
    gl.vertexAttribPointer(a_TexCoord, 2, gl.FLOAT, false, vertices.BYTES_PER_ELEMENT*4, vertices.BYTES_PER_ELEMENT*2);
    gl.enableVertexAttribArray(a_TexCoord);

    return n;
}

function initTexture(gl) {
    texture = gl.createTexture();
    u_Sampler = gl.getUniformLocation(gl.program, 'u_Sampler');
}

function onLoadImage(fileName) {
    var image = new Image();
    image.onload = function () {
        loadTexture(gl, texture, u_Sampler, image);
    };
    image.src = fileName;
}

function loadTexture(gl, texture, u_Sampler, image) {
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);// 对纹理图片进行Y轴反转
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    gl.uniform1i(u_Sampler, 0);

    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
}

function onEditChange(files) {
    if (files) {
        filepath.value = files.item(0).name;
        var value = files[0].name;
        // var value = files.item(0).getAsDataURL();
        onLoadImage(value);
    }

    // var pic = document.getElementById(picId);
    // var fileName = null;
    // var file = document.getElementById(fileId);
    // if(window.FileReader){//chrome,firefox7+,opera,IE10+
    //     oFReader = new FileReader();
    //     oFReader.readAsDataURL(file.files[0]);
    //     oFReader.onload = function (oFREvent) {
    //         fileName = oFREvent.target.result;
    //     };
    // }
    // else if (document.all) {//IE9-//IE使用滤镜，实际测试IE6设置src为物理路径发布网站通过http协议访问时还是没有办法加载图片
    //     file.select();
    //     file.blur();//要添加这句，要不会报拒绝访问错误（IE9或者用ie9+默认ie8-都会报错，实际的IE8-不会报错）
    //     var reallocalpath = document.selection.createRange().text//IE下获取实际的本地文件路径
    //     //if (window.ie6) pic.src = reallocalpath; //IE6浏览器设置img的src为本地路径可以直接显示图片
    //     //else { //非IE6版本的IE由于安全问题直接设置img的src无法显示本地图片，但是可以通过滤镜来实现，IE10浏览器不支持滤镜，需要用FileReader来实现，所以注意判断FileReader先
    //     fileName = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';//设置img的src为base64编码的透明图片，要不会显示红xx
    //     // }
    // }
    // else if (file.files) {//firefox6-
    //     if (file.files.item(0)) {
    //         url = file.files.item(0).getAsDataURL();
    //         fileName = url;
    //     }
    // }
    // if (fileName != null) {
    //     onLoadImage(fileName);
    // }
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


{
    //使用IE条件注释来判断是否IE6，通过判断userAgent不一定准确
    function change(picId,fileId) {
        var pic = document.getElementById(picId);
        var file = document.getElementById(fileId);
        if(window.FileReader){//chrome,firefox7+,opera,IE10+
            var oFReader = new FileReader();
            oFReader.readAsDataURL(file.files[0]);
            oFReader.onload = function (oFREvent) {pic.src = oFREvent.target.result;};
        }
        else if (document.all) {//IE9-//IE使用滤镜，实际测试IE6设置src为物理路径发布网站通过http协议访问时还是没有办法加载图片
            file.select();
            file.blur();//要添加这句，要不会报拒绝访问错误（IE9或者用ie9+默认ie8-都会报错，实际的IE8-不会报错）
            var reallocalpath = document.selection.createRange().text//IE下获取实际的本地文件路径
            //if (window.ie6) pic.src = reallocalpath; //IE6浏览器设置img的src为本地路径可以直接显示图片
            //else { //非IE6版本的IE由于安全问题直接设置img的src无法显示本地图片，但是可以通过滤镜来实现，IE10浏览器不支持滤镜，需要用FileReader来实现，所以注意判断FileReader先
            pic.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='image',src=\"" + reallocalpath + "\")";
            pic.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';//设置img的src为base64编码的透明图片，要不会显示红xx
            // }
        }
        else if (file.files) {//firefox6-
            if (file.files.item(0)) {
                url = file.files.item(0).getAsDataURL();
                pic.src = url;
            }
        }
    }
}