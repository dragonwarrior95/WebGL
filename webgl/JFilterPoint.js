class JFilterPoint extends JFilterBase {
    constructor(webGL) {
        super(webGL);
        var self = this;
        this.u_ColorHandle = 0;
        this.m_red = 0;
        this.m_green = 0;
        this.m_blue = 0;
    }
    getShader() {
        this.m_vshader = (`
            attribute vec4 a_Position;
            uniform mat4 u_ModelMatrix;
            void main()
            {
                #ifdef GL_ES
                    gl_PointSize = 5.0;
                #endif
                gl_Position = u_ModelMatrix * a_Position;
            }
            );
        `);

        this.m_fshader = (`
            precision highp float;
            uniform vec3 u_Color;
            void main() {
                gl_FragColor = vec4(u_Color, 1.0); 
            }
        `);
    }

    initlize() {
        this.getShader();
        if (!initShaders(this.m_webGL, this.m_vshader, this.m_fshader)) {
            print("[JFilterPoint][constructor] init shaders error......");
            return;
        }
        this.a_PositionHandle = this.m_webGL.getAttribLocation(this.m_webGL.program, "a_Position");
        this.u_ModelMatrixHandle = this.m_webGL.getUniformLocation(this.m_webGL.program, "u_ModelMatrix");
        this.u_ColorHandle = this.m_webGL.getUniformLocation(this.m_webGL.program, "u_Color");
    }

    setColor(red, green, blue) {
        this.m_red = red;
        this.m_green = green;
        this.m_blue = blue;
    }

    // 向FBO中绘制一个椭圆
    drawEllipsToFBO(a, b, r1, r2, lineWidth) {
        if (this.bindFBO() && this.m_webGL.program)
        {
            this.m_webGL.viewport(0, 0, screenWidth, screenHeight);
            this.useProgram();
            this.m_webGL.activeTexture(this.m_webGL.TEXTURE0);
            this.m_webGL.bindTexture(this.m_webGL.TEXTURE_2D, this.m_FrameBufferTexture);
            this.m_webGL.uniform1i(this.u_SamplerHandle, 0);

            this.setUniformMatrix4fv("u_ModelMatrix", false, uMatrix.elements);// 设置u_ModelMatrix变量
            // this.setVertexBuffers(vertexs, texcoords);
            this.setVertexAttribPointer("a_Position", this.m_vertexBuffer, vertexs, 2, this.m_webGL.FLOAT, false, 0, 0);
            this.setVertexAttribPointer("a_TexCoord", this.m_texCoordBuffer, texcoords, 2, this.m_webGL.FLOAT, false, 0, 0);

            this.m_webGL.drawArrays(this.m_webGL.TRIANGLE_STRIP, 0, 4);
        }

        if (this.bindFBO() == false)
        {
            this.print("bin fbo fail");
            return 0;
        }
        this.m_webGL.viewport(0, 0, this.m_textureWidth, this.m_textureHeight);
        this.m_modelMatrix = new Matrix4();
        this.m_modelMatrix.setIdentity();
        this.m_modelMatrix.ortho(0.0, this.m_textureWidth, 0.0, this.m_textureHeight, -1.0, 1.0);
        this.m_webGL.setLineWidth(lineWidth);

        // 计算椭圆上的点
        let _vertCount = 100; //分割份数
        let delta = 2.0*M_PI / _vertCount;
        let texcoord = new Float32Array[100];
        let i = 0;
        for (i = 0; i < _vertCount; i++) {
            let x = a + r1 * cos(delta * i);
            let y = b + r2 * sin(delta * i);
            let point = newFloat32([x, y]);
            texcoord.push(point);
        }

        this.setUniform3f("u_Color", m_red, m_green, m_blue);
        this.setUniformMatrix4fv("u_ModelMatrix", false, Projection.elem);
        this.setVertexAttribPointer("a_Position", this.m_vertexBuffer, texcoord, 2, this.m_webGL.FLOAT, false, 0, 0);
        this.m_webGL.glDrawArrays(this.m_webGL.GL_LINE_LOOP, 0, _vertCount);
        this.unBindFBO();
        return m_FrameBufferTexture == 0 ? m_AsFrameBufferTexture : m_FrameBufferTexture;
    }
}