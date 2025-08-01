export default `
uniform sampler2D tDiffuse;
uniform float uThreshold;
uniform float uSmoothness;

varying vec2 vUv;

void main() {
  vec4 color = texture2D(tDiffuse, vUv);
  
  // Calculate luminance
  float brightness = dot(color.rgb, vec3(0.299, 0.587, 0.114));
  
  // Smooth threshold for better transitions
  float factor = smoothstep(uThreshold, uThreshold + uSmoothness, brightness);
  
  // Extract bright areas
  gl_FragColor = color * factor;
}
`; 