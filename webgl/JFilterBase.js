/**
 * Created by dragon on 2017/7/31.
 *
 *  ES6语法：https://segmentfault.com/a/1190000004365693
 */

class JFilterBase {
    constructor(webGL, width, height) {
        this.m_webGL = webGL;           // GL对象
        this.m_FrameBufferTexture = 0;// 离屏渲染纹理
        this.m_FrameBufferObj = 0;     // 帧缓冲区对象
        this.m_RenderBufferObj = 0;    // 渲染缓冲区对象
        this.m_textureWidth = width;
        this.m_textureHeight = height;


        this.m_vertexBuffer = null;   // 顶点坐标值
        this.m_texCoordBuffer = null; // 纹理坐标值

        this.m_modelMatrix = new Matrix4();
        this.m_modelMatrix.setScale(1.0, 1.0, 1.0);

        this.m_textureId = 0;

        this.m_vshader = null;
        this.m_fshader = null;

        this.initlize();
    }

    initlize() {
        this.getShader();
        if (!initShaders(this.m_webGL, this.m_vshader, this.m_fshader)) {
            print("[JFilterBase][constructor] init shaders error......");
            return;
        }
        this.a_PositionHandle = this.m_webGL.getAttribLocation(this.m_webGL.program, "a_Position");
        this.a_TexCoordHandle = this.m_webGL.getAttribLocation(this.m_webGL.program, "a_TexCoord");
        this.u_ModelMatrixHandle = this.m_webGL.getUniformLocation(this.m_webGL.program, "u_ModelMatrix");
        this.u_SamplerHandle = this.m_webGL.getUniformLocation(this.m_webGL.program, "u_Sampler");
    }

    release() {

    }

    initVertexBuffers(width, height) {
        var verticesTexCoords = new Float32Array([
            0.0,    height,0.0,1.0,
            width,  height,0.0,0.0,
            0.0,    0.0,   1.0,0.0,
            width,  0.0,   1.0,1.0
        ]);

        // 创建缓冲区对象
        if (this.m_vertexBuffer) {
            this.m_webGL.deleteBuffer(this.m_vertexBuffer);
        }
        this.m_vertexBuffer = this.m_webGL.createBuffer();
        if (!this.m_vertexBuffer) {
            print("create Buffer failure......");
            return -1;
        }
        // 将缓冲区对象绑定到目标
        this.m_webGL.bindBuffer(this.m_webGL.ARRAY_BUFFER, vertexBuffer);
        // 向缓冲区对象写入数据
        this.m_webGL.bufferData(this.m_webGL.ARRAY_BUFFER, verticesTexCoords, this.m_webGL.STATIC_DRAW);
        // 将缓冲区对象分配给a_Position变量
        this.m_webGL.vertexAttribPointer(a_Position, 2, this.m_webGL.FLOAT, false, verticesTexCoords.BYTES_PER_ELEMENT * 4, 0);
        // 连接a_Position变量与分配给他的缓冲区对象
        this.m_webGL.enableVertexAttribArray(a_Position);

        if (!this.m_texCoordBuffer) {
            this.m_webGL.deleteBuffer(this.m_texCoordBuffer);
        }
        this.m_texCoordBuffer = this.m_webGL.createBuffer();
        this.m_webGL.bindBuffer(this.m_webGL.ARRAY_BUFFER, this.m_texCoordBuffer);
        this.m_webGL.bufferData(this.m_webGL.ARRAY_BUFFER, verticesTexCoords, this.m_webGL.STATIC_DRAW);
        this.m_webGL.vertexAttribPointer(a_TexCoord, 2, this.m_webGL.FLOAT, false, verticesTexCoords.BYTES_PER_ELEMENT * 4, verticesTexCoords.BYTES_PER_ELEMENT * 2);
        this.m_webGL.enableVertexAttribArray(a_TexCoord);
    }

    bind(textureId, width, height) {
        this.m_textureId = textureId;
        this.m_textureWidth = width;
        this.m_textureHeight = height;
    }
    // 绑定纹理
    bindTexture () {
        this.m_webGL.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);// 对纹理图片进行Y轴反转

        this.m_webGL.activeTexture(this.m_webGL.TEXTURE0);
        this.m_webGL.bindTexture(gl.TEXTURE_2D, this.m_textureId);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        this.m_webGL.uniform1i(this.u_SamplerHandle, 0);
    }

    // 更新参数
    update() {

    }

    getShader() {
        this.m_vshader = (`
            precision highp float;
            attribute vec4 a_Position;
            attribute vec2 a_TexCoord;
            varying vec2 v_TexCoord;
            uniform mat4 u_ModelMatrix;
            
            void main()
            {
                gl_Position = u_ModelMatrix * a_Position;
                v_TexCoord = a_TexCoord;
            }
        `);

        this.m_fshader = (`
            precision highp float;
            uniform sampler2D u_Sampler;
            varying vec2 v_TexCoord;
            
            void main()
            {
                gl_FragColor = texture2D(u_Sampler, v_TexCoord);
            // '    gl_FragColor = vec4(1.0, 0, 0, 1.0);\\n' +
            }
        `);
    }

    print (msg) {
        console.log(msg);
    }

    // 创建一个空的纹理
    createTexture (width, height)
    {
        var v = this.m_webGL.createTexture();
        if(texture == 0)
        {
            return 0;
        }
        this.m_webGL.pixelStorei(this.m_webGL.UNPACK_FLIP_Y_WEBGL, 1);// 对纹理图片进行Y轴反转
        this.m_webGL.bindTexture(this.m_webGL.TEXTURE_2D, texture);
        this.m_webGL.texParameteri(this.m_webGL.TEXTURE_2D, this.m_webGL.TEXTURE_MIN_FILTER, this.m_webGL.LINEAR);
        this.m_webGL.texParameteri(this.m_webGL.TEXTURE_2D, this.m_webGL.TEXTURE_WRAP_S, this.m_webGL.CLAMP_TO_EDGE);
        this.m_webGL.texParameteri(this.m_webGL.TEXTURE_2D, this.m_webGL.TEXTURE_WRAP_T, this.m_webGL.CLAMP_TO_EDGE);
        this.m_webGL.texImage2D(this.m_webGL.TEXTURE_2D, 0, this.m_webGL.RGBA, width, height, 0, this.m_webGL.RGBA, this.m_webGL.UNSIGNED_BYTE, null);
        this.m_webGL.texParameteri(this.m_webGL.TEXTURE_2D, this.m_webGL.TEXTURE_MIN_FILTER, this.m_webGL.LINEAR);
        this.m_webGL.texParameteri(this.m_webGL.TEXTURE_2D, this.m_webGL.TEXTURE_MAG_FILTER, this.m_webGL.LINEAR);

        return texture;
    }

    // 设置渲染到纹理
    bindFBO () {
        // 1、创建缓冲区对象
        if (this.m_FrameBufferObj == 0){
            this.m_FrameBufferObj = this.m_webGL.createFramebuffer();
            if(this.m_FrameBufferObj == 0)
            {
                print("this.m_FrameBufferObj == 0");
                return false;
            }
        }

        // 2、创建纹理对象并设置其尺寸和参数
        if(this.m_FrameBufferTexture == 0) {
            this.m_FrameBufferTexture = this.createTexture(this.m_textureWidth, this.m_textureHeight);
            if (this.m_FrameBufferTexture==0)
            {
                self.print("m_FrameBufferTexture is 0");
                return false;
            }
        }
        this.m_FrameBufferObj.texture = this.m_FrameBufferTexture;// 保存纹理对象

        // 3、创建渲染缓冲区对象并设置其尺寸和参数
        this.m_RenderBufferObj = this.m_webGL.createRenderbuffer();// 创建渲染缓冲区

        // 4、绑定渲染缓冲区对象
        this.m_webGL.bindRenderbuffer(this.m_webGL.RENDERBUFFER, this.m_RenderBufferObj);
        this.m_webGL.renderbufferStorage(this.m_webGL.RENDERBUFFER, this.m_webGL.DEPTH_COMPONENT16, this.m_textureWidth, this.m_textureHeight);

        // 5、将纹理和渲染缓冲区对象关联到帧缓冲区对象上
        this.m_webGL.bindFramebuffer(this.m_webGL.FRAMEBUFFER, this.m_FrameBufferObj);
        this.m_webGL.framebufferTexture2D(this.m_webGL.FRAMEBUFFER, this.m_webGL.COLOR_ATTACHMENT0, this.m_webGL.TEXTURE_2D, this.m_FrameBufferTexture, 0);

        // 6、
        this.m_webGL.framebufferRenderbuffer(this.m_webGL.FRAMEBUFFER, this.m_webGL.DEPTH_ATTACHMENT, this.m_webGL.RENDERBUFFER, this.m_RenderBufferObj);

        // 7、校验是否正确配置
        var e = this.m_webGL.checkFramebufferStatus(this.m_webGL.FRAMEBUFFER);
        if (e != this.m_webGL.FRAMEBUFFER_COMPLETE) {
            print('Framebuffer object is incomplete: ' + e.toString());
            return error();
        }
    }

    unBindFBO () {
        this.m_webGL.bindFramebuffer(this.m_webGL.FRAMEBUFFER, null);
    }

    filterToFBO (bSavePixels)
    {
        if (self.bindFBO() == false)
        {
            print("bin fbo fail");
            return 0;
        }

        this.m_webGL.viewport(0, 0, this.m_textureWidth, this.m_textureHeight);// 设置离屏渲染区域
        this.m_webGL.uniformMatrix4fv(this.u_ModelMatrixHandle, false, this.m_modelMatrix.elements);
        this.initVertexBuffers(this.m_textureWidth, this.m_textureHeight);

        this.bindTexture();
        this.m_webGL.last_flush();

        if(bSavePixels)
        {
            // 保存纹理
        }
        self.unBindFBO();
        return this.m_FrameBufferTexture;
    }
}