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
uniform sampler2D baseTexture;
uniform sampler2D bloomTexture;
varying vec2 vUv;

void main() 
{
	gl_FragColor = ( texture2D( baseTexture, vUv ) + vec4( 1.0 ) * texture2D( bloomTexture, vUv ) );

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