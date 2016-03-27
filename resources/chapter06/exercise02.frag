uniform vec2 u_resolution;
uniform float u_time;

float circularEaseOut (float h) {
    return sqrt(1 - pow(1 - h, 2.0));
}

// Convert HSB to RGB.
//
//  Function from Iñigo Quiles 
//  https://www.shadertoy.com/view/MsS3Wc
vec3 hsb2rgb(in vec3 c) {
    vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),
                             6.0)-3.0)-1.0, 
                     0.0, 
                     1.0 );
    rgb = rgb*rgb*(3.0-2.0*rgb);
    return c.z * mix(vec3(1.0), rgb, c.y);
}

void main() {
    // Normalize pixel (x,y) coordinates
    vec2 st = gl_FragCoord.xy/u_resolution;

    // Initialize color vector.
    vec3 color = vec3(0.0);

    // The call to circularEaseOut will stretch the purple end of the HSB spectrum.
    color = hsb2rgb(vec3(circularEaseOut(st.x), 1.0, 1.0));

    gl_FragColor = vec4(color,1.0);
}
