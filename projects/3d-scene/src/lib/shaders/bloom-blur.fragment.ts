export default `
uniform sampler2D tDiffuse;
uniform vec2 uDirection;
uniform vec2 uResolution;
uniform float uRadius;

varying vec2 vUv;

void main() {
  vec2 texel = 1.0 / uResolution;
  vec4 result = vec4(0.0);
  
  // Gaussian blur weights
  float weights[9];
  weights[0] = 0.05;
  weights[1] = 0.09;
  weights[2] = 0.12;
  weights[3] = 0.15;
  weights[4] = 0.16;
  weights[5] = 0.15;
  weights[6] = 0.12;
  weights[7] = 0.09;
  weights[8] = 0.05;
  
  // Apply blur
  for (int i = 0; i < 9; i++) {
    float offset = float(i - 4) * uRadius;
    vec2 samplePos = vUv + uDirection * texel * offset;
    result += texture2D(tDiffuse, samplePos) * weights[i];
  }
  
  gl_FragColor = result;
}
`; 