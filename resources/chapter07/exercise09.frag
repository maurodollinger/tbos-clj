uniform vec2 u_resolution;
uniform float u_time;

#define PI 3.1415926

#define GEAR_COUNT 4
#define GEAR_TEETH 10
#define GEAR_INNER_RADIUS 0.2
#define GEAR_OUTER_RADIUS 0.3
#define GEAR_TOOTH_LENGTH 0.1

const vec2 gearCenters[GEAR_COUNT] = vec2[GEAR_COUNT](vec2(0.325, 0.675),
                                                      vec2(0.325, 0.325),
                                                      vec2(0.675, 0.325),
                                                      vec2(0.675, 0.675));
const vec3 gearColors[GEAR_COUNT] = vec3[GEAR_COUNT](vec3(1.0, 0.0, 0.0),
                                                     vec3(1.0, 1.0, 0.0),
                                                     vec3(0.0, 1.0, 0.0),
                                                     vec3(0.0, 0.0, 1.0));

float plot(vec2 st, float pct){
   return  smoothstep( pct-0.01, pct, st.y) - 
           smoothstep( pct, pct+0.01, st.y);
}

vec3 gearOutline(vec2 gearCenter, vec3 gearColor, float spin, float offset, vec2 pixelCoord) {
    vec2 relativeCoord = gearCenter - pixelCoord;
    float distanceFromCenter = length(relativeCoord)*2.0;
    float angle = atan(relativeCoord.y, relativeCoord.x);
    float rotationPhase = 8.0*u_time*spin;

    // The actual gear "function"
    float inverseBody = smoothstep(-1.0, 1.0, cos(angle*GEAR_TEETH + offset + rotationPhase))*GEAR_TOOTH_LENGTH + GEAR_OUTER_RADIUS;

    // Normally we'd pass in a cartesian tuple but we're effectively plotting
    // in polar coordinates so we pass in a polar tuple.
    return plot(vec2(angle, distanceFromCenter), inverseBody) * gearColor;
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;

    vec3 color = vec3(0.0);
    for(int i=0; i<GEAR_COUNT; i++) {
        vec2 gearCenter = gearCenters[i];
        vec3 gearColor = gearColors[i];
        float spin = mod(i, 2.0) - 0.5;
        float offset = i*PI;
        color += gearOutline(gearCenter, gearColor, spin, offset, st);
    }

    gl_FragColor = vec4(color, 1.0);
}