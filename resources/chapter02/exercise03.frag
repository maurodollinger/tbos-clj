vec4 purple() {
    return vec4(0.5, 0.0, 1.0, 1.0);
}

void main() {
    // No color returned; result should be that the window is all black.
    gl_FragColor = purple();
}