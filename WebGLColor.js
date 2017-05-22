/**
 * Created by dragon on 2017/5/22.
 *
 * WebGL颜色与纹理
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
    'attribute vec4 a_FragColor;\n' +
    'varying vec4 v_FragColor;\n' +
    'void main()\n' +
    '{\n' +
    '    gl_Position = a_Position;\n' +
    '    gl_PointSize = a_PointSize;\n' +
        ' v_FragColor = a_FragColor;\n' +
    '}'

var FSHADER_SOURCE =
    'precision mediump float;\n' +// 要添加这行不然初始化会失败
    'uniform vec4 u_FragColor;\n' +
    'varying vec4 v_FragColor;\n' +
    'void main()\n' +
    '{\n' +
    '    gl_FragColor = v_FragColor;\n' +
    '}'

var a_Position;
var u_ModelMatrix;// 平移分量
var a_PointSize;
var u_FragColor;
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

    a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize');
    if (a_PointSize < 0) {
        print("get a_PointSize failure......");
    }
    // 获取a_Position
    a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    if (a_Position < 0) {
        print("get a_Position failure......");
        return;
    }
    u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
    if (u_ModelMatrix < 0) {
        print("get u_ModelMatrix failure");
        return;
    }

    u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
    if (u_FragColor < 0) {
        print("get u_FragColor failure......");
        return;
    }

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

    gl.drawArrays(gl.LINE_LOOP, 0, n);
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
            -0.5, 0.5, 5.0, 1.0, 0.0, 0.0, 1.0,
            -0.5, -0.5, 10.0, 0.0, 1.0, 0.0, 1.0,
            0.5, -0.5, 15.0, 0.0, 0.0, 1.0, 1.0,
            0.5, 0.5, 20.0, 1.0, 1.0, 0.0, 1.0
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
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, vertices.BYTES_PER_ELEMENT*7, 0);
    // 连接a_Position变量与分配给他的缓冲区对象
    gl.enableVertexAttribArray(a_Position);

    // var PointSize = new Float32Array([5.0, 10.0, 15.0, 20.0]);
    var sizeBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, sizeBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    gl.vertexAttribPointer(a_PointSize, 1, gl.FLOAT, false, vertices.BYTES_PER_ELEMENT*7, vertices.BYTES_PER_ELEMENT*2);
    gl.enableVertexAttribArray(a_PointSize);

    var colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    var a_FragColor = gl.getAttribLocation(gl.program, 'a_FragColor');
    gl.vertexAttribPointer(a_FragColor, 4, gl.FLOAT, true, vertices.BYTES_PER_ELEMENT*7, vertices.BYTES_PER_ELEMENT*3);
    gl.enableVertexAttribArray(a_FragColor);

    return n;
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