/**
 * Created by dragon on 2017/3/14.
 */

function print(msg) {
    console.log(msg);
}

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
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

}
