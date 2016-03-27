uniform vec2 u_resolution;

const int edge_count = 7;
const int array_count = edge_count*edge_count;
uniform vec2[array_count] u_edges;

uniform float[edge_count] u_xs;
uniform float[edge_count] u_ys;

// float[] xs = float[4](-0.1, 0.2, 0.8, 1.1);
// float[] ys = float[4](-0.1, 0.35, 0.7, 1.1);

uniform int[edge_count*edge_count] u_color_indices;

const vec3 colors[4] = vec3[4](vec3(1.0, 1.0, 1.0),
                               vec3(1.0, 0.0, 0.0),
                               vec3(1.0, 1.0, 0.0),
                               vec3(0.0, 0.0, 1.0));

int[] rectColors = int[36](0, 0, 3, 0, 0, 1,
                           1, 0, 0, 0, 2, 3,
                           0, 0, 0, 0, 0, 3,
                           0, 0, 1, 0, 2, 0,
                           0, 1, 0, 0, 0, 3,
                           0, 2, 0, 3, 0, 0);

vec3 rect(vec2 from, vec2 to, vec2 st, vec3 color) {
    vec2 bl = step(from+0.01, st) - step(to-0.01, st);     
    // This effectively "and"s the x and y components.
    return bl.x * bl.y * color;    
}

float cross(vec2 edge, vec2 st, float w) {
    // Set each component to 1 if it is within w of the
    // corresponding component of the inbound edge.
    vec2 bl = step(edge, st) - step(edge+w, st);     
    // This effectively "or"s the x and y components.
    return bl.x + bl.y;
}

void main() {
    // Normalize the (x,y) coords of each pixel.
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    
    // Initialize all components of the sum vector.
    // vec3 pct = vec3(0.0);
    // for (int i=0; i<edge_count; i++) {
    //   pct += cross(u_edges[i], st, 0.02);
    // }
    vec3 color = vec3(0.0);
    for (int i=0; i<edge_count; i++) {
      for (int j=0; j<edge_count; j++) {
        int rectColor = rectColors[j + edge_count*i];      
        color += rect(vec2(u_xs[i], u_ys[j]), 
                      vec2(u_xs[i+1], u_ys[j+1]), 
                      st, 
                      colors[rectColor]);
        // pct += cross(vec2(xs[i], ys[j]), st, 0.02);
      }
    }
    // vec3 color = 1.0 - pct;

    // Initialize all RGB color components to 0.0.
    // vec3 color = vec3(0.0);

    // vec3 color = vec3(0.0);
    // for (int i=0; i<3; i++) {
    //     color += rect(vec2(xs[i], ys[i]), vec2(xs[i+1], ys[i+1]), st, colors[i]);
    // }

    // float pct = rect(vec2(0.1, 0.1), vec2(0.3, 0.4), st);

    gl_FragColor = vec4(color, 1.0);

}
