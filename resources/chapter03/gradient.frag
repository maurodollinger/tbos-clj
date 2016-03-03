uniform vec2 u_resolution;

void main() {
    // Yup... we're dividing a vector by another vector here;
    // See https://en.wikibooks.org/wiki/GLSL_Programming/Vector_and_Matrix_Operations#Operators
  	vec2 st = gl_FragCoord.xy/u_resolution;
  	gl_FragColor = vec4(st.x, st.y, 0.0, 1.0);
}