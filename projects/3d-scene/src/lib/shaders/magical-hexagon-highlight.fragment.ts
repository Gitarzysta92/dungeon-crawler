export default `// #
// # ShaderChunk: logdepthbuf_pars_fragment
// #
#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif

// #
// # ShaderChunk: fog_pars_fragment
// #
#ifdef USE_FOG

	uniform vec3 fogColor;

	#ifdef FOG_EXP2

		uniform float fogDensity;

	#else

		uniform float fogNear;
		uniform float fogFar;
	#endif

#endif

// #
// # ShaderChunk: custom
// #
uniform vec3 primaryColor;
uniform vec3 secondaryColor;
uniform float intensity;
uniform float pulseSpeed;
uniform float time;
varying vec2 vUv;
varying vec3 vPosition;
varying float vFadeFactor;

// Hexagon pattern function
float hexagon(vec2 uv, float size) {
    vec2 hex = vec2(size, size * 1.154700538);
    vec2 grid = abs(uv - hex * round(uv / hex));
    return length(grid) - size * 0.5;
}

// Magic pulse effect
float magicPulse(float t) {
    return 0.5 + 0.5 * sin(t * pulseSpeed) + 0.25 * sin(t * pulseSpeed * 2.0);
}

// Ripple effect
float ripple(vec2 uv, float t) {
    float dist = length(uv - vec2(0.5));
    return sin(dist * 20.0 - t * 3.0) * exp(-dist * 3.0);
}

void main() 
{
	// Base hexagon pattern
	float hex = hexagon(vUv * 8.0, 0.5);
	float hexPattern = smoothstep(0.1, 0.0, hex);
	
	// Magic pulse
	float pulse = magicPulse(time);
	
	// Ripple effect
	float rippleEffect = ripple(vUv, time);
	
	// Combine effects
	float magicEffect = hexPattern * pulse + rippleEffect * 0.3;
	
	// Color blending
	vec3 color = mix(secondaryColor, primaryColor, magicEffect);
	
	// Apply intensity and fade
	float alpha = magicEffect * intensity * vFadeFactor;
	
	gl_FragColor = vec4(color, alpha);

  // #
  // # ShaderChunk: logdepthbuf_fragment
  // #
  #if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	  // Doing a strict comparison with == 1.0 can cause noise artifacts
	  // on some platforms. See issue #17623.
	  gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
  #endif

	// #
  // # ShaderChunk: fog_fragment
  // #
	#ifdef USE_FOG

		#ifdef USE_LOGDEPTHBUF_EXT

			float depth = gl_FragDepthEXT / gl_FragCoord.w;

		#else

			float depth = gl_FragCoord.z / gl_FragCoord.w;

		#endif

		#ifdef FOG_EXP2

			const float LOG2 = 1.442695;
			float fogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );
			fogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );

		#else

			float fogFactor = smoothstep( fogNear, fogFar, depth );

		#endif
		
		gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );

	#endif
}` 