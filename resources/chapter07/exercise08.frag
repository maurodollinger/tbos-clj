uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;

    vec2 pos = vec2(0.5)-st;

    float r = length(pos)*2.0;
    float a = atan(pos.y,pos.x);

    float f = 0.3*abs(cos(a*3.5));

    vec3 color = vec3(1.0);
    for(float i=0.0; i<6.0; i+=1.0) {
        color += 2.0*(mod(i, 2.0)-0.5)*vec3(smoothstep(f, f+0.04, (1.0-0.2*(i+0.2*sin(2.0*u_time)))*r));
    }

    gl_FragColor = vec4(color, 1.0);
}