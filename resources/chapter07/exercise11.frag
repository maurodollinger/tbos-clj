uniform vec2 u_resolution;

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution;

    float r = distance(st,vec2(0.5));

    vec3 color = vec3(1-step(0.5, r));

  	gl_FragColor = vec4( color, 1.0 );
}