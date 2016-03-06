uniform vec2 u_resolution;

#define WIDTH 0.02
#define PI 3.1415926536
#define TWO_PI 2*PI

// Computes a value representing the closeness of the
// y-coordinate to the second parameter passed in.
float plot(vec2 st, float pct){
    return  smoothstep( pct-WIDTH, pct, st.y) - 
            smoothstep( pct, pct+WIDTH, st.y);
}

void main() {
    // Normalizes the inbound (x,y) coordinate.
  	vec2 st = gl_FragCoord.xy/u_resolution;

    // Transform x range from (0.0, 1.0) to (-1.0, 1.0)
    float x = mix(-1.0, 1.0, st.x);

    // The following five functions are used in the image referenced
    // in the exercise, and with varying values of the exponent.
    // float y = 1.0 - pow(abs(x), 0.5);
    // float y = pow(cos(PI*x/2.0), 0.5);
    // float y = 1.0 - pow(abs(sin(PI*x/2.0)), 0.5);
    // float y = pow(min(cos(PI*x/2.0), 1.0-abs(x)), 0.5);
    float y = 1.0 - pow(max(0.0, 2.0*abs(x) - 1.0), 3.5);

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