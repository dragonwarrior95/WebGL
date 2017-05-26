/**
 * Created by meitu on 2017/5/26.
 */
attribute vec4 a_Position;
attribute vec2 a_TexCoord;
varying vec2 v_TexCoord;
uniform mat4 u_ModelMatrix;
void main()
{
    gl_Position = u_ModelMatrix * a_Position;
    v_TexCoord = a_TexCoord;
}