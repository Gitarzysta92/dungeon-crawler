import {
  WebGLRenderTarget,
  LinearFilter,
  RGBAFormat,
  ShaderMaterial,
  PlaneGeometry,
  Mesh,
  OrthographicCamera,
  Scene,
  Vector2,
  WebGLRenderer,
  Color
} from "three";

export class MultiResBloom {

  private readonly blurScale = 1.5;
  private readonly uRadius = 3.0;

  private renderer: WebGLRenderer;
  private width: number;
  private height: number;

  private blurMaterial: ShaderMaterial;
  private blurScene: Scene;
  private blurQuad: Mesh;
  private blurCamera: OrthographicCamera;

  private targets: WebGLRenderTarget[] = [];
  private tempTarget!: WebGLRenderTarget;



  getShaderBlurMaterial() {

  }

  constructor(renderer: WebGLRenderer, width: number, height: number) {
    this.renderer = renderer;
    this.width = width;
    this.height = height;

    // ✅ Gaussian blur shader
this.blurMaterial = new ShaderMaterial({
  uniforms: {
    tDiffuse: { value: null },
    uDirection: { value: new Vector2(1, 0) },
    uResolution: { value: new Vector2(width, height) },
    uRadius: { value: this.uRadius },       // Gaussian sigma
    blurScale: { value: this.blurScale },     // Spread per sample
    uStrength: { value: 1.5 }      // Bloom intensity
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position.xy, 0.0, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform vec2 uDirection;
    uniform vec2 uResolution;
    uniform float uRadius;
    uniform float blurScale;
    uniform float uStrength;
    varying vec2 vUv;

    float gaussian(float x, float sigma) {
        return exp(-0.5 * (x * x) / (sigma * sigma)) / (2.5066 * sigma);
    }

    void main() {
        vec2 texel = 1.0 / uResolution;
        vec3 result = texture2D(tDiffuse, vUv).rgb * gaussian(0.0, uRadius);
        float weight = gaussian(0.0, uRadius);

        for (int i = 1; i < 8; i++) {   // fewer samples, same quality
            float x = float(i);
            float w = gaussian(x, uRadius);
            vec2 offset = uDirection * texel * x * blurScale;
            result += texture2D(tDiffuse, vUv + offset).rgb * w;
            result += texture2D(tDiffuse, vUv - offset).rgb * w;
            weight += 2.0 * w;
        }

        result /= weight;
        result *= uStrength;  // adjustable bloom strength
        gl_FragColor = vec4(result, 1.0);
    }
  `
});

    // ✅ Fullscreen quad
    this.blurScene = new Scene();
    this.blurCamera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
    this.blurQuad = new Mesh(new PlaneGeometry(2, 2), this.blurMaterial);
    this.blurScene.add(this.blurQuad);

    // ✅ Downsample levels
    for (let i = 0; i < 3; i++) {
      const scale = Math.pow(2, i + 1); // 1/2, 1/4, 1/8
      const rt = new WebGLRenderTarget(width / scale, height / scale, {
        format: RGBAFormat,
        minFilter: LinearFilter,
        magFilter: LinearFilter
      });
      this.targets.push(rt);
    }

    // ✅ Temporary target for ping-pong blurring
    this.tempTarget = this.targets[this.targets.length - 1].clone();
  }

  private blurPass(input: WebGLRenderTarget, output: WebGLRenderTarget, dir: Vector2) {
    this.blurMaterial.uniforms.tDiffuse.value = input.texture;
    this.blurMaterial.uniforms.uDirection.value.copy(dir);
    this.blurMaterial.uniforms.uResolution.value.set(output.width, output.height);
    this.renderer.setRenderTarget(output);
    this.renderer.clear();
    this.renderer.render(this.blurScene, this.blurCamera);
  }

  /** ✅ Apply multi-resolution bloom blur */
  public process(
    input: WebGLRenderTarget,
    blurScale: number
  ): WebGLRenderTarget {
    let current = input;
    // this.blurMaterial.uniforms.uRadius.value = 1 + this.uRadius * blurScale;
    // this.blurMaterial.uniforms.blurScale.value = 1 + this.blurScale * blurScale;
    // STEP 1: Downsample progressively
    for (let i = 0; i < this.targets.length; i++) {
      this.blurPass(current, this.targets[i], new Vector2(1, 0));
      this.blurPass(this.targets[i], this.tempTarget, new Vector2(0, 1));
      current = this.tempTarget;
    }

    // STEP 2: Return final blurred texture (at lowest resolution)
    return current;
  }

  public resize(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.blurMaterial.uniforms.uResolution.value.set(width, height);
    this.targets.forEach((rt, i) => {
      const scale = Math.pow(2, i + 1);
      rt.setSize(width / scale, height / scale);
    });
    this.tempTarget.setSize(width / 8, height / 8);
  }
}
