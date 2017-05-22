/**
 * Created by dragon on 2017/3/14.
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
    'uniform vec4 u_Translation;\n' +
    'void main()\n' +
    '{\n' +
    '    gl_Position = a_Position + u_Translation;\n' +
    '    gl_PointSize = a_PointSize;\n' +
    '}'

var FSHADER_SOURCE =
    'precision mediump float;\n' +// 要添加这行不然初始化会失败
    'uniform vec4 u_FragColor;\n' +
    'void main()\n' +
    '{\n' +
    '    gl_FragColor = u_FragColor;\n' +
    '}'

var a_Position;
var u_Translation;// 平移分量
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
    u_Translation = gl.getUniformLocation(gl.program, 'u_Translation');
    if (u_Translation < 0) {
        print("get u_Translation failure");
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

    gl.vertexAttrib1f(a_PointSize, 10.0);
    // gl.vertexAttrib3f(a_Position, 0.5, 0.5, 0.0);
    gl.uniform4f(u_Translation, 0.5, 0, 0, 0);

    red = 255.0;
    green = 0.0;
    blue = 0.0;
    alpha = 255;
    gl.uniform4f(u_FragColor, red / 255.0, green/255.0, blue/255.0, alpha / 255.0);

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.LINE_LOOP, 0, n);
}

function initVertexBuffers(gl) {
    var vertices;
    var n;
    if (0)
    {
        vertices = new Float32Array([0.0, 0.5, -0.5, -0.5, 0.5, -0.5]);
        n = 3;
    }
    else
    {
        vertices = new Float32Array([-0.5, 0.5, -0.5, -0.5, 0.5, -0.5, 0.5, 0.5]);
        n = 4;
    }

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
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
    // 连接a_Position变量与分配给他的缓冲区对象
    gl.enableVertexAttribArray(a_Position);

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