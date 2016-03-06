uniform float u_time;

// Cobalt blue
vec3 colorA = vec3(0.149,0.141,0.912);
// Spanish orange
vec3 colorB = vec3(1.000,0.833,0.224);

void main() {
    vec3 color = vec3(0.0);

    // Compute number which oscillates between 0 and 1.
    float pct = abs(sin(u_time));

    // Mix the two colors using the pct parameter.
    color = mix(colorA, colorB, pct); 

    // Output the color
    gl_FragColor = vec4(color,1.0);
}