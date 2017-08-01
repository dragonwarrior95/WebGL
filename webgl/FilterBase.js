/**
 * Created by meitu on 2017/7/31.
 */


var FilterBase = function (webGL, width, height) {
    var self = this;
    this.m_webGL = webGL;           // GL对象
    this.m_FrameBufferTexture = 0;// 离屏渲染纹理
    this.m_FrameBufferObj = 0;     // 帧缓冲区对象
    this.m_RenderBufferObj = 0;    // 渲染缓冲区对象
    this.m_textureWidth = width;
    this.m_textureHeight = height;


    this.print = function (msg) {
        console.log(msg);
    }

    // 创建一个空的纹理
    this.createTexture = function (width, height)
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
    this.bindFBO = function () {
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
            this.m_FrameBufferTexture = self.createTexture(this.m_textureWidth, this.m_textureHeight);
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

    this.unBindFBO = function () {
        this.m_webGL.bindFramebuffer(this.m_webGL.FRAMEBUFFER, null);
    }

    this.bindTexture = function () {
        // for(int i = 0 ; i < FILTER_MAX_SOURCE_HANDLER ;i++)
        // {
        //     if(m_TextureId[i] != 0 && m_TextureHandle[i] != -1)
        //     {
        //         glActiveTexture(GL_TEXTURE0 + i);
        //         glBindTexture(GL_TEXTURE_2D, m_TextureId[i]);
        //         glUniform1i(m_TextureHandle[i], i);
        //     }
        //
        // }
        //
        // for(int i = 0 ; i < FILTER_MAX_MATERIAL_HANDLER ; i++)
        // {
        //     if(m_TmpId[i] != 0 && m_TexTmpHandle[i] != -1)
        //     {
        //         glActiveTexture(GL_TEXTURE0 + FILTER_MAX_SOURCE_HANDLER + i);
        //         glBindTexture(GL_TEXTURE_2D, m_TmpId[i]);
        //         glUniform1i(m_TexTmpHandle[i], FILTER_MAX_SOURCE_HANDLER + i);
        //     }
        // }
    }

    this.filterToFBO = function (bSavePixels)
    {
        if (self.bindFBO() == false)
        {
            print("bin fbo fail");
            return 0;
        }

        this.m_webGL.viewport(0, 0, this.m_textureWidth, this.m_textureHeight);

        // glm::mat4 Projection = glm::ortho(.0f, (float)m_TextureWidth, .0f, (float)m_TextureHeight);
        //
        //
        // GLfloat vertexs[8] = {0.0f,(float)m_TextureHeight,
        // (float)m_TextureWidth,(float)m_TextureHeight,
        // 0.0f,0.0f,
        // (float)m_TextureWidth,0};
        // GLfloat texcoords[8] = {0.0f,1.0f,
        // 1.0f,1.0f,
        // 0.0f,0.0f,
        // 1.0f,0.0f};
        //
        // glUseProgram(m_ProgramHandle);

        self.bindTexture();

        // glUniform1i(m_TextureHandle[0], 0);
        // glUniformMatrix4fv(m_MvpHandle, 1, false,&Projection[0][0]);
        // glEnableVertexAttribArray(m_VertexHandle);
        // glVertexAttribPointer(m_VertexHandle, 2,GL_FLOAT, false,0, (const void*)vertexs);
        // glEnableVertexAttribArray(m_TexcoordHandle);
        // glVertexAttribPointer(m_TexcoordHandle, 2,GL_FLOAT, false,0, (const void*)texcoords);
        // glDrawArrays(GL_TRIANGLE_STRIP, 0, 4);
        // glFlush();
        this.m_webGL.last_flush();

        if(bSavePixels)
        {
            // 保存纹理
        }
        self.unBindFBO();
        return this.m_FrameBufferTexture;
    }
}