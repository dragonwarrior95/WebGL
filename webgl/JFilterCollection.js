/**
 * Created by dragon on 2017/7/31.
 *
 *  Filter集合
 */

class JFilterTwoInputAlpha extends JFilterBase {
    constructor() {
        super();// 调用这个方法之后才能使用this
        this.type = "FilterTwoInputScreen";

        this.m_texture = 0;
        this.m_fAlpha = 0.0;
        this.u_Sampler2 = this.m_webGL.getUniformLocation(this.m_webGL.program, "u_Sampler2");
        this.u_fAlpha = this.m_webGL.getUniformLocation(this.m_webGL.program, "u_fAlpha");
    }

    getShader() {
        JFilterBase.getShader();
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

        // this.m_fshader = (`
        //     precision highp float;
        //     uniform sampler2D u_Sampler;
        //     varying vec2 v_TexCoord;
        //
        //     void main()
        //     {
        //         gl_FragColor = texture2D(u_Sampler, v_TexCoord);
        //     // '    gl_FragColor = vec4(1.0, 0, 0, 1.0);\\n' +
        //     }
        // `);
        this.m_fshader = (`
            precision highp float;

            uniform sampler2D u_Sampler;
            uniform sampler2D u_Sampler2;
            
            varying vec2 v_TexCoord;
            
            uniform float u_fAlpha;
                    
            void main()
            {
                vec4 top = texture2D(u_Sampler, v_TexCoord);
                vec4 bottom = texture2D(u_Sampler2, v_TexCoord);
                
                gl_FragColor = mix(top, bottom, u_fAlpha);
            }
        `);
    }


    initlize() {
        JFilterBase.initlize();
        this.u_Sampler2 = this.m_webGL.getUniformLocation(this.m_webGL.program, "u_Sampler2");
        this.u_fValue = this.m_webGL.getUniformLocation(this.m_webGL.program, "u_fAlpha");
    }

    update(texture, fAlpha) {
        this.m_texture = texture;
        this.m_fAlpha = fAlpha;
        if(texture > 0)
        {
            this.m_webGL.activeTexture(this.m_webGL.TEXTURE1);
            this.m_webGL.bindTexture(gl.TEXTURE_2D, this.m_texture);
            this.m_webGL.uniform1i(this.u_Sampler2, 0);
        }

        this.m_webGL.uniform1f(this.u_fAlpha, this.m_fAlpha);
    }
};