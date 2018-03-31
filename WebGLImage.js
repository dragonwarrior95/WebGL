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

var vertexBuffer;   // 顶点坐标值
var texCoordBuffer; // 纹理坐标值
var bLButtonDown = false;
var filterBase;
var glTexture = 0;      // gl纹理

function main() {
    var canvas = $("canvas");
    if (canvas == null) {
        print("canvas is null");
        return;
    }

    filterBase = new JFilterBase(getWebGLContext(canvas, true));
    filterBase.initlize();
    filterBase.setFrameSize(canvas.clientWidth, canvas.clientHeight);
    onLoadImage("512.jpg");
}

function draw(clientWidth, clientHeight) {
    var width = clientWidth;
    var height= clientHeight;
    
    var Projection = new Matrix4();
    Projection.setIdentity();
    // Projection.ortho(0.0, width, height, -1.0, 1.0);
    var TRSMat = new Matrix4();
    TRSMat.scale(1.0, 1.0, 1.0);
    TRSMat.translate(0.0, 0.0, 0.0);

    var vertexs = filterBase.setAutoShowSize(filterBase.m_textureWidth, filterBase.m_textureHeight, width, height);
    // let vertexs = new Float32Array([
    //     -0.5, 0.5,//左上角——v0
    //     0.5,  0.5,//右上角——v2
    //     -0.5,-0.5,//左下角——v1
    //     0.5, -0.5 //右下角——v3
    // ]);
    var texcoords = new Float32Array([
        0.0, 1.0,//左上角——uv0
        1.0, 1.0,//右上角——uv2
        0.0, 0.0,//左下角——uv1
        1.0, 0.0 //右下角——uv3
    ]);
    filterBase.filterToScreenSample(Projection.multiply(TRSMat), vertexs, texcoords, width, height);
}

function onLoadImage(fileName) {
    var image = new Image();
    image.onload = function () {
        // setAutoShow(gl, image.width, image.height);// 图片加载为设置自适应
        print("Image(" + image.width +", " + image.height+")");
        glTexture = filterBase.loadTexture(image);
        draw(filterBase.m_frameWidth, filterBase.m_frameHeight);
    };
    image.src = fileName;
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
    // var verticesTexCoords = new Float32Array([
    //     (startXonCanvas - width) / width,               (height - startYonCanvas) / height,                     startXonImg / imgWidth,                 (imgHeight - startYonImg) / imgHeight,
    //     (startXonCanvas - width) / width,               (height - (startYonCanvas + imgShowHeight)) / height,   startXonImg / imgWidth,                 (imgHeight - startYonImg - imgShowHeight) / imgHeight,
    //     (startXonCanvas + imgShowWidth - width) / width,(height - (startYonCanvas + imgShowHeight)) / height,   (startXonImg + imgShowWidth) / imgWidth,(imgHeight - startYonImg) / imgHeight,
    //     (startXonCanvas + imgShowWidth - width) / width,(height - startYonCanvas) / height,                     (startXonImg + imgShowWidth) / imgWidth,(imgHeight - startYonImg - imgShowHeight) / imgHeight
    // ]);

    var verticesTexCoords = new Float32Array([
        (startXonCanvas - width) / width,               (height - startYonCanvas) / height,                     0.0,1.0,
        (startXonCanvas - width) / width,               (height - (startYonCanvas + imgShowHeight)) / height,   0.0,0.0,
        (startXonCanvas + imgShowWidth - width) / width,(height - (startYonCanvas + imgShowHeight)) / height,   1.0,0.0,
        (startXonCanvas + imgShowWidth - width) / width,(height - startYonCanvas) / height,                     1.0,1.0
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

    $("scale").value = scale*100;
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