/**
 * Created by dragon on 2017/7/31.
 *
 *  ES6语法：https://segmentfault.com/a/1190000004365693
 */

class JFilterBase {
    constructor(webGL) {
        var self = this;
        this.m_webGL = webGL;           // GL对象
        this.m_FrameBufferTexture = 0;// 离屏渲染纹理
        this.m_FrameBufferObj = 0;     // 帧缓冲区对象
        this.m_RenderBufferObj = 0;    // 渲染缓冲区对象
        this.m_textureWidth = 0;
        this.m_textureHeight = 0;


        this.m_vertexBuffer = null;   // 顶点坐标值
        this.m_texCoordBuffer = null; // 纹理坐标值

        this.m_modelMatrix = new Matrix4();
        this.m_modelMatrix.setScale(1.0, 1.0, 1.0);

        this.m_textureId = 0;

        this.m_vshader = null;
        this.m_fshader = null;
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

    useProgram() {
        if (this.m_webGL.program)
            this.m_webGL.useProgram(this.m_webGL.program);
        else
            print("m_webGL.program is null......");
    }

    release() {

    }

    setVertexBuffers(verticesTexCoords) {
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
        this.m_webGL.bindBuffer(this.m_webGL.ARRAY_BUFFER, this.m_vertexBuffer);
        // 向缓冲区对象写入数据
        this.m_webGL.bufferData(this.m_webGL.ARRAY_BUFFER, verticesTexCoords, this.m_webGL.STATIC_DRAW);
        // 将缓冲区对象分配给a_Position变量
        this.m_webGL.vertexAttribPointer(this.a_PositionHandle, 2, this.m_webGL.FLOAT, false, verticesTexCoords.BYTES_PER_ELEMENT * 4, 0);
        // 连接a_Position变量与分配给他的缓冲区对象
        this.m_webGL.enableVertexAttribArray(this.a_PositionHandle);

        if (!this.m_texCoordBuffer) {
            this.m_webGL.deleteBuffer(this.m_texCoordBuffer);
        }
        this.m_texCoordBuffer = this.m_webGL.createBuffer();
        this.m_webGL.bindBuffer(this.m_webGL.ARRAY_BUFFER, this.m_texCoordBuffer);
        this.m_webGL.bufferData(this.m_webGL.ARRAY_BUFFER, verticesTexCoords, this.m_webGL.STATIC_DRAW);
        this.m_webGL.vertexAttribPointer(this.a_TexCoordHandle, 2, this.m_webGL.FLOAT, false, verticesTexCoords.BYTES_PER_ELEMENT * 4, verticesTexCoords.BYTES_PER_ELEMENT * 2);
        this.m_webGL.enableVertexAttribArray(this.a_TexCoordHandle);
    }

    setVertexBuffers(vertexs, texCoords) {
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
        this.m_webGL.bindBuffer(this.m_webGL.ARRAY_BUFFER, this.m_vertexBuffer);
        // 向缓冲区对象写入数据
        this.m_webGL.bufferData(this.m_webGL.ARRAY_BUFFER, vertexs, this.m_webGL.STATIC_DRAW);
        // 将缓冲区对象分配给a_Position变量
        this.m_webGL.vertexAttribPointer(this.a_PositionHandle, 2, this.m_webGL.FLOAT, false, 0, 0);
        // 连接a_Position变量与分配给他的缓冲区对象
        this.m_webGL.enableVertexAttribArray(this.a_PositionHandle);

        if (!this.m_texCoordBuffer) {
            this.m_webGL.deleteBuffer(this.m_texCoordBuffer);
        }
        this.m_texCoordBuffer = this.m_webGL.createBuffer();
        this.m_webGL.bindBuffer(this.m_webGL.ARRAY_BUFFER, this.m_texCoordBuffer);
        this.m_webGL.bufferData(this.m_webGL.ARRAY_BUFFER, texCoords, this.m_webGL.STATIC_DRAW);
        this.m_webGL.vertexAttribPointer(this.a_TexCoordHandle, 2, this.m_webGL.FLOAT, false, 0, 0);
        this.m_webGL.enableVertexAttribArray(this.a_TexCoordHandle);
    }

    bind(textureId, width, height) {
        this.m_textureId = textureId;
        this.m_textureWidth = width;
        this.m_textureHeight = height;
    }
    loadTexture (image) {
        if (this.m_textureId) {
            this.m_webGL.deleteTexture(this.m_textureId);
        }
        this.m_textureId = this.m_webGL.createTexture();
        this.m_webGL.pixelStorei(this.m_webGL.UNPACK_FLIP_Y_WEBGL, 1);// 对纹理图片进行Y轴反转

        this.m_webGL.activeTexture(this.m_webGL.TEXTURE0);
        this.m_webGL.bindTexture(this.m_webGL.TEXTURE_2D, this.m_textureId);
        this.m_webGL.texParameteri(this.m_webGL.TEXTURE_2D, this.m_webGL.TEXTURE_MIN_FILTER, this.m_webGL.LINEAR);
        this.m_webGL.texParameteri(this.m_webGL.TEXTURE_2D, this.m_webGL.TEXTURE_WRAP_S, this.m_webGL.CLAMP_TO_EDGE);
        this.m_webGL.texParameteri(this.m_webGL.TEXTURE_2D, this.m_webGL.TEXTURE_WRAP_T, this.m_webGL.CLAMP_TO_EDGE);

        this.m_textureWidth = image.width;
        this.m_textureHeight = image.height;

        return this.m_textureId;
    }
    // 绑定纹理
    bindTexture() {
        this.m_webGL.activeTexture(this.m_webGL.TEXTURE0);
        this.m_webGL.bindTexture(this.m_webGL.TEXTURE_2D, this.m_textureId);
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
            }
        `);
    }

    print (msg) {
        console.log(msg);
    }

    // 创建一个空的纹理
    createTexture (width, height)
    {
        var texture = this.m_webGL.createTexture();
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
        if (this.bindFBO() == false)
        {
            print("bin fbo fail");
            return 0;
        }

        this.useProgram();
        this.m_webGL.viewport(0, 0, this.m_textureWidth, this.m_textureHeight);// 设置离屏渲染区域

        this.m_modelMatrix = new Matrix4();
        this.m_modelMatrix.ortho(0.0, this.m_textureWidth, 0.0, this.m_textureHeight, -1.0, 1.0);
        // GLfloat vertexs[8] = { 0.0f, (float)m_TextureHeight,
        // (float)m_TextureWidth, (float)m_TextureHeight,
        // 0.0f, 0.0f,
        // (float)m_TextureWidth, 0 };
        // GLfloat texcoords[8] = { 0.0f, 1.0f,
        // 1.0f, 1.0f,
        // 0.0f, 0.0f,
        // 1.0f, 0.0f };
        let vertexBufferData = new Float32Array([
            0.0,this.m_TextureHeight,            0.0,1.0,
            this.m_TextureWidth, this.m_TextureHeight,1.0,1.0,
            0.0,0.0,                        0.0,0.0,
            this.m_TextureWidth,0.0,             1.0,0.0
        ]);
        this.bindTexture();// 设置纹理变量
        this.setUniformMatrix4fv("u_ModelMatrix", false, this.m_modelMatrix.elements);// 设置u_ModelMatrix变量
        // this.setVertexAttribPointer("a_Position", this.m_vertexBuffer, vertexBufferData, 2, this.m_webGL.FLOAT, false, vertexBufferData.BYTES_PER_ELEMENT*4, vertexBufferData.BYTES_PER_ELEMENT*0);
        // this.setVertexAttribPointer("a_TexCoord", this.m_texCoordBuffer, vertexBufferData, 2, this.m_webGL.FLOAT, false, vertexBufferData.BYTES_PER_ELEMENT*4, vertexBufferData.BYTES_PER_ELEMENT*2);
        this.setVertexBuffers(vertexBufferData);
        this.m_webGL.drawArrays(this.m_webGL.TRIANGLE_STRIP, 0, 4);

        if(bSavePixels)
        {
            // 保存纹理
        }
        this.unBindFBO();
        return this.m_FrameBufferTexture;
    }

    // virtual void FilterToScreen(GLfloat *mvp, GLfloat vertexs[8], GLfloat texcoords[8], int ScreenWidth, int ScreenHeight);// 渲染到屏幕
    // virtual void FilterToScreenSample(GLfloat *mvp, GLfloat vertexs[8], GLfloat texcoords[8], int ScreenWidth, int ScreenHeight);// 普通渲染(不执行任何特效)
    filterToScreen(uMatrix, vertexs, texcoords, screenWidth, screenHeight)
    {
        if (this.filterToFBO() && this.m_webGL.program)
        {
            // this.m_webGL.viewport(0, 0, screenWidth, screenHeight);
            // this.useProgram();
            this.m_webGL.activeTexture(this.m_webGL.TEXTURE0);
            this.m_webGL.bindTexture(this.m_webGL.TEXTURE_2D, this.m_FrameBufferTexture);
            this.m_webGL.uniform1i(this.u_SamplerHandle, 0);

            this.setUniformMatrix4fv("u_ModelMatrix", false, uMatrix.elements);// 设置u_ModelMatrix变量
            this.setVertexBuffers(vertexs, texcoords);
            // this.setVertexAttribPointer("a_Position", this.m_vertexBuffer, vertexs, 2, this.m_webGL.FLOAT, false, 0, 0);
            // this.setVertexAttribPointer("a_TexCoord", this.m_texCoordBuffer, texcoords, 2, this.m_webGL.FLOAT, false, 0, 0);

            this.m_webGL.drawArrays(this.m_webGL.TRIANGLE_STRIP, 0, 4);
        }
    }
    filterToScreenSample(uMatrix, vertexs, texcoords, screenWidth, screenHeight)
    {
        if (this.m_textureId && this.m_webGL.program)
        {
            this.unBindFBO();
            // this.m_webGL.viewport(0, 0, screenWidth, screenHeight);
            // this.useProgram();
            this.m_webGL.activeTexture(this.m_webGL.TEXTURE0);
            this.m_webGL.bindTexture(this.m_webGL.TEXTURE_2D, this.m_textureId);
            this.m_webGL.uniform1i(this.u_SamplerHandle, 0);

            this.setUniformMatrix4fv("u_ModelMatrix", false, uMatrix.elements);// 设置u_ModelMatrix变量
            this.setVertexBuffers(vertexs, texcoords);
            // this.setVertexAttribPointer("a_Position", this.m_vertexBuffer, vertexs, 2, this.m_webGL.FLOAT, false, 0, 0);
            // this.setVertexAttribPointer("a_TexCoord", this.m_texCoordBuffer, texcoords, 2, this.m_webGL.FLOAT, false, 0, 0);

            this.m_webGL.drawArrays(this.m_webGL.TRIANGLE_STRIP, 0, 4);
        }
    }


    getWebGL ()
    {
        return this.m_webGL;
    }

    setUniformli(strKey, value)
    {
        let uHandle = this.m_webGL.getUniformLocation(this.m_webGL.program, strKey);
        this.m_webGL.uniform1i(uHandle, value);
    }

    setUniform2f(strKey, x, y)
    {
        let uHandle = this.m_webGL.getUniformLocation(this.m_webGL.program, strKey);
        this.m_webGL.uniform2f(uHandle, x, y);
    }

    setUniform3f(strKey, x, y, z)
    {
        let uHandle = this.m_webGL.getUniformLocation(this.m_webGL.program, strKey);
        this.m_webGL.uniform3f(uHandle, x, y, z);
    }

    setUniform4f(strKey, r, g, b, a)
    {
        let uHandle = this.m_webGL.getUniformLocation(this.m_webGL.program, strKey);
        this.m_webGL.uniform4f(uHandle, r, g, b, a);
    }

    /**
     * @param {WebGLUniformLocation} strKey
     * @param {boolean} transpose
     * @param {Float32Array|Array.<number>} data
     */
    setUniformMatrix4fv(strKey, transpose, data)
    {
        let uHandle = this.m_webGL.getUniformLocation(this.m_webGL.program, strKey);
        this.m_webGL.uniformMatrix4fv(uHandle, transpose, data);
    }

    setVertexAttrib1f(strKey, value)
    {
        let aHandle = this.m_webGL.getAttribLocation(this.m_webGL.program, strKey);
        if (aHandle) {
            this.m_webGL.vertexAttrib1f(aHandle, value);
        }
    }

    setVertexAttrib2f(strKey, x, y)
    {
        let aHandle = this.m_webGL.getAttribLocation(this.m_webGL.program, strKey);
        if (aHandle) {
            this.m_webGL.vertexAttrib2f(aHandle, x, y);
        }
    }

    setVertexAttrib3f(strKey, x, y, z)
    {
        let aHandle = this.m_webGL.getAttribLocation(this.m_webGL.program, strKey);
        if (aHandle) {
            this.m_webGL.vertexAttrib3f(aHandle, x, y, z);
        }
    }

    setVertexAttrib4f(strKey, r, g, b, a)
    {
        let aHandle = this.m_webGL.getAttribLocation(this.m_webGL.program, strKey);
        if (aHandle) {
            this.m_webGL.vertexAttrib4f(aHandle, r, g, b, a);
        }
    }

    /**
     * @param {number} indx
     * @param {Float32Array|Array.<number>} values
     */
    setVertexAttriblfv(strKey, values)
    {
        let aHandle = this.m_webGL.getAttribLocation(this.m_webGL.program, strKey);
        if (aHandle) {
            this.m_webGL.vertexAttrib1fv(aHandle, values);
        }
    }
    setVertexAttrib2fv(strKey, values)
    {
        let aHandle = this.m_webGL.getAttribLocation(this.m_webGL.program, strKey);
        if (aHandle) {
            this.m_webGL.vertexAttrib2fv(aHandle, values);
        }
    }
    setVertexAttrib3fv(strKey, values)
    {
        let aHandle = this.m_webGL.getAttribLocation(this.m_webGL.program, strKey);
        if (aHandle) {
            this.m_webGL.vertexAttrib3fv(aHandle, values);
        }
    }
    setVertexAttrib4fv(strKey, values)
    {
        let aHandle = this.m_webGL.getAttribLocation(this.m_webGL.program, strKey);
        if (aHandle) {
            this.m_webGL.vertexAttrib4fv(aHandle, values);
        }
    }

    /**
     * @param {string} strKey
     * @param {} vertexBuffer
     * @param {Float32Array|Array.<number>} vertexBufferData
     * @param {number} size, 指定几个分量，一维：1，二维：x, y 三维：x, y, z。。。
     * @param {number} type 数据类型, 如：this.m_webGL.FLOAT
     * @param {boolean} normalized， 是否将数据归一化到[0,1]或者[-1,1]
     * @param {number} stride 指定相邻两个顶点间的字节数 vertexBufferData.BYTES_PER_ELEMENT * 4
     * @param {number} offset 指定缓冲区的偏移量，即Attribute变量从缓冲区中何处开始存储 vertexBufferData.BYTES_PRE_ELEMENT * 0
     */
    setVertexAttribPointer(strKey, vertexBuffer, vertexBufferData, size, type, normalized, stride, offset)
    {
        let aHandle = this.m_webGL.getAttribLocation(this.m_webGL.program, strKey);
        if (aHandle) {
            // 创建缓冲区对象
            if (vertexBuffer) {
                this.m_webGL.deleteBuffer(vertexBuffer);
            }
            vertexBuffer = this.m_webGL.createBuffer();
            if (!vertexBuffer) {
                print("create Buffer failure......");
                return -1;
            }
            // 将缓冲区对象绑定到目标
            this.m_webGL.bindBuffer(this.m_webGL.ARRAY_BUFFER, vertexBuffer);
            // 向缓冲区对象写入数据
            this.m_webGL.bufferData(this.m_webGL.ARRAY_BUFFER, vertexBufferData, this.m_webGL.STATIC_DRAW);
            // 将缓冲区对象分配给a_Position变量
            this.m_webGL.vertexAttribPointer(aHandle, size, type, normalized, stride, offset);
            // 连接a_Position变量与分配给他的缓冲区对象
            this.m_webGL.enableVertexAttribArray(aHandle);
        }
    }
}