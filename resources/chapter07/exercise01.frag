uniform vec2 u_resolution;

// Borders of different sizes.
void main() {
    // Normalize the (x,y) coords of each pixel.
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    
    // Initialize all RGB color components to 0.0.
    vec3 color = vec3(0.0);
    
    // Bottom left ┗
    vec2 bl = vec2(step(0.1, st.x), step(0.2, st.y)); 
    float c = bl.x * bl.y;
    
    // top-right ┓
    vec2 tr = vec2(step(0.3, 1.0-st.x), step(0.4, 1.0-st.y));
    c *= tr.x * tr.y;
    
    // c will either be 0.0 or 1.0, so the output color will 
    // either be black or white respectively.
    color = vec3(c);

    gl_FragColor = vec4(color,1.0);
}
