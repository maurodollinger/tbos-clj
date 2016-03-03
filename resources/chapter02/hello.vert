
// This uniform and attribute are both initialized by Processing by default.
uniform mat4 transformMatrix;

attribute vec4 position;

void main() {
    // Vertices are untouched.
    gl_Position = transformMatrix * position;  
}