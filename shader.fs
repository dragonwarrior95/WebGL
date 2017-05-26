/**
 * Created by meitu on 2017/5/26.
 */
precision mediump float;// 要添加这行不然初始化会失败
uniform sampler2D u_Sampler;
varying vec2 v_TexCoord;
void main()
{
    gl_FragColor = texture2D(u_Sampler, v_TexCoord);
    // '    gl_FragColor = vec4(1.0, 0, 0, 1.0);\n' +
}