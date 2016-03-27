uniform vec2 u_resolution;
uniform float u_time;

void main(){
    // Normalize the inbound pixel coordinates.
    vec2 st = gl_FragCoord.xy/u_resolution.xy;

    // Compute the position of the pixel with the origin as the center of the window.
    vec2 pos = vec2(0.5)-st;

    // Compute the radius vector with respect to the origin.
    float r = length(pos)*2.0;
    
    // Compute the angle between the radius and the x-axis.
    float theta = atan(pos.y, pos.x);

    // Compute f(a), which is dependent on both the angle and the current time,
    // which is passed in as a uniform.
    float f = abs(cos(theta*12.0) * sin(theta* (1+sin(u_time)) *3.0)) * 0.8 + 0.1;

    // Initialize all components of the color vector to a shade of grey,
    // depending on the magnitude of the radius.
    vec3 color = vec3(1.0 - smoothstep(f, f+0.2, r));
    
    // Set the output color to a mix of black and a color between red and yellow
    // depending on the magnitude of the radius.
    color = mix(vec3(0.0), 
                vec3(1.0, 1.0-0.7*r, 1.0-2.0*r),
                color);

    // Output the color of the pixel.
    gl_FragColor = vec4(color, 1.0);
}
