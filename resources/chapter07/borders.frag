uniform vec2 u_resolution;

void main() {
    // Normalize the (x,y) coords of each pixel.
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    
    // Initialize all RGB color components to 0.0.
    vec3 color = vec3(0.0);
    
    // Bottom left ┗
    //
    // Both x and y coordinates are "subjected" to the same step function;
    // and so both x and y components are 0.0 along the first 10% of each axis
    // and 1.0 for the remaining
    vec2 bl = step(vec2(0.1),st); 
    
    // This effectively "and"s the x and y components; the output component
    // value is 0.0 if either x < 0.1 or y < 0.1, or 1.0 otherwise.
    float c = bl.x * bl.y;
    
    // top-right ┓
    //
    // This time, both x and y coordinates are assigned to the 
    // to the same step function, but with the origin effectively
    // set to the top right corner by passing 1.0-st instead of st to step.
    vec2 tr = step(vec2(0.1), 1.0-st);

    // "And" the components of the vector above with the current value of c.
    c *= tr.x * tr.y;
    
    // c will either be 0.0 or 1.0, so the output color will 
    // either be black or white respectively.
    color = vec3(c);

    gl_FragColor = vec4(color,1.0);
}
