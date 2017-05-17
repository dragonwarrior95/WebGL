/**
 * Created by dragon on 2017/3/14.
 */

function print(msg) {
    console.log(msg);
}

var VSHADER_SOURCE =
    'attribute vec4 a_Position;\n' +
    'attribute float a_PointSize;\n' +
    'void main()\n' +
    '{\n' +
    '    gl_Position = a_Position;\n' +
    '    gl_PointSize = a_PointSize;\n' +
    '}'

var FSHADER_SOURCE =
    'void main()\n' +
    '{\n' +
    '    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' +
    '}'

function main() {
    var canvas = document.getElementById("canvas");
    if (canvas == null) {
        print("canvas is null");
        return;
    }

    var gl = getWebGLContext(canvas);
    if (gl == null) {
        print("Get gl context failure......");
    }

    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        print("init shaders error......");
        return;
    }

    // 获取a_Position
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    if (a_Position < 0) {
        print("get a_Position failure......");
        return;
    }
    var a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize');
    if (a_PointSize < 0) {
        print("get a_PointSize failure......");
    }

    gl.vertexAttrib3f(a_Position, 0.5, 0.5, 0.0);
    gl.vertexAttrib1f(a_PointSize, 5.0);

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.POINTS, 0, 1);
}
