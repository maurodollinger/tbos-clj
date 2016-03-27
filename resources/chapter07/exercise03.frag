uniform vec2 u_resolution;

#define BORDER_WIDTH 0.1

// Solid borders but with floor instead of step.
void main() {
    // Normalize the (x,y) coords of each pixel.
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    
    // Initialize all RGB color components to 0.0.
    vec3 color = vec3(0.0);
    
    // Bottom left ┗
    vec2 bl = floor(st + 1.0-BORDER_WIDTH); 
    float c = bl.x * bl.y;
    
    // // top-right ┓
    vec2 tr = floor(st - 1.0+BORDER_WIDTH); 
    c *= tr.x * tr.y;
    
    // c will either be 0.0 or 1.0, so the output color will 
    // either be black or white respectively.
    color = vec3(c);

    gl_FragColor = vec4(color,1.0);
}
