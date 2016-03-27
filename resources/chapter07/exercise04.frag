uniform vec2 u_resolution;

vec3 blurryBorder(float width, vec2 st) {
    // Initialize all RGB color components to 0.0.
    vec3 color = vec3(0.0);

    // Bottom left ┗
    vec2 bl = smoothstep(vec2(0.5*width), vec2(width), st); 
    float c = bl.x * bl.y;
    
    // top-right ┓
    vec2 tr = smoothstep(vec2(0.5*width), vec2(width), 1.0-st); 
    c *= tr.x * tr.y;

    return vec3(c);  
}

// Blurry borders.
void main() {
    // Normalize the (x,y) coords of each pixel.
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    
    vec3 color = blurryBorder(0.5, st);

    gl_FragColor = vec4(color,1.0);
}
