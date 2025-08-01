export default `
uniform sampler2D tBase;
uniform sampler2D tBloom;
uniform float uIntensity;
uniform float uSaturation;

varying vec2 vUv;

void main() {
  vec4 base = texture2D(tBase, vUv);
  vec4 bloom = texture2D(tBloom, vUv);
  
  // Apply bloom intensity
  bloom *= uIntensity;
  
  // Additive blend for glow effect
  vec4 result = base + bloom;
  
  // Optional: enhance saturation
  if (uSaturation > 1.0) {
    float luminance = dot(result.rgb, vec3(0.299, 0.587, 0.114));
    result.rgb = mix(vec3(luminance), result.rgb, uSaturation);
  }
  
  gl_FragColor = result;
}
`; 