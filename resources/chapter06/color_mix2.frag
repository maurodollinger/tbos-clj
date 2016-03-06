uniform vec2 u_resolution;

#define WIDTH 0.01
#define PI 3.1415926

vec3 colorA = vec3(0.149,0.141,0.912);
vec3 colorB = vec3(1.000,0.833,0.224);

float plot (vec2 st, float pct){
  return  smoothstep( pct-WIDTH, pct, st.y) - 
          smoothstep( pct, pct+WIDTH, st.y);
}

void main() {
    // Normalize the (x,y) values
    vec2 st = gl_FragCoord.xy/u_resolution.xy;

    // Initialize each of the RGB components of the color for each
    // plot line to the normalized x value of the pixel.
    vec3 pct = vec3(st.x);

    // Compute the value of the RGB component of each plot independently.
    pct.r = smoothstep(0.0,1.0, st.x);
    pct.g = sin(st.x*PI);
    pct.b = pow(st.x,0.5);

    // Interpolate the computed color of the "background" 
    // between the two constant colors.
    vec3 color = mix(colorA, colorB, pct);

    // Mix in colors for "plots" for each color component
    color = mix(color, vec3(1.0,0.0,0.0), plot(st,pct.r));
    color = mix(color, vec3(0.0,1.0,0.0), plot(st,pct.g));
    color = mix(color, vec3(0.0,0.0,1.0), plot(st,pct.b));
    
    // Output the final color of the pixel
    gl_FragColor = vec4(color,1.0);
}