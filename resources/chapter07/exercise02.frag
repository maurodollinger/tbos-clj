uniform vec2 u_resolution;

// Blurry borders.
void main() {
    // Normalize the (x,y) coords of each pixel.
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    
    // Initialize all RGB color components to 0.0.
    vec3 color = vec3(0.0);
    
    // Bottom left ┗
    vec2 bl = smoothstep(vec2(0.1), vec2(0.2), st); 
    float c = bl.x * bl.y;
    
    // top-right ┓
    vec2 tr = smoothstep(vec2(0.1), vec2(0.2), 1.0-st); 
    c *= tr.x * tr.y;
    
    // c will either be 0.0 or 1.0, so the output color will 
    // either be black or white respectively.
    color = vec3(c);

    gl_FragColor = vec4(color,1.0);
}
