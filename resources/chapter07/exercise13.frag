uniform vec2 u_resolution;

float circle(float smoothness, float radius) {
    return 1.0 - smoothstep(0.5-smoothness, 0.5, radius);
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution;

    float r = distance(st, vec2(0.5));

    vec3 color = vec3(circle(0.1, r));

  	gl_FragColor = vec4( color, 1.0 );
}