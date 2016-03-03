uniform vec2 u_resolution;

#define WIDTH 0.02

// Computes a value representing the closeness of the
// y-coordinate to the second parameter passed in.
float plot(vec2 st, float pct){
    return  smoothstep( pct-WIDTH, pct, st.y) - 
            smoothstep( pct, pct+WIDTH, st.y);
}

void main() {
    // Normalizes the inbound (x,y) coordinate.
  	vec2 st = gl_FragCoord.xy/u_resolution;

    // This represents the function to be plotted.
    float y = st.x;

    // Set part of the resultant color to all three components
    // being equal to the y value.
    vec3 color = vec3(y);
    
    // Compute the coefficient of the color correspondent
    // with the function to be plotted.
    float pct = plot(st,y);
    
    // Sum the two colors: one will be a shade of grey,
    // the other will be a factor of the color "assigned"
    // to the plot (the vec3 that is in the second
    // part of the expression below.)
    color = (1.0-pct)*color+pct*vec3(0.0,1.0,0.0);
    
    // Output the color of the pixel.
  	gl_FragColor = vec4(color,1.0);
}