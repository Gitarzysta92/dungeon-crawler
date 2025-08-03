import { Group, Points, BufferGeometry, Float32BufferAttribute, PointsMaterial, Vector3, ShaderMaterial } from "three";
import { TokenBase } from "../../tokens/common/token-base.game-object";
import { AnimationService } from "../../../../animations/animation.service";
import { IActorDefinition } from "../../../actor.interface";

export class MagicalHexagonHighlightParticlesObject extends TokenBase {
  private _particles!: Points;
  private _particleCount: number = 100;
  private _particlePositions!: Float32Array;
  private _particleVelocities: Vector3[] = [];
  private _objectGroup!: Group;
  private _debugFrameCount: number = 0;
  private _particleOpacities: number[] = [];
  private _particleSizes: number[] = [];
  private _particleColors: Vector3[] = [];

  constructor(
    private readonly _animationService: AnimationService
  ) {
    super({} as IActorDefinition);
    this._createParticleSystem();
  }

  private _createParticleSystem(): void {
    console.log('Creating particle system...'); // Debug log
    // Create particle geometry
    const geometry = new BufferGeometry();
    this._particlePositions = new Float32Array(this._particleCount * 3);

    // Initialize particles in a scattered circle around the hexagon
    for (let i = 0; i < this._particleCount; i++) {
      const angle = (i / this._particleCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.5; // Random angle offset
      const radius = 0.5 + Math.random() * 0.3; // More random radius around hexagon
      const height = (Math.random() - 0.5) * 1.5; // Random height

      this._particlePositions[i * 3] = Math.cos(angle) * radius;
      this._particlePositions[i * 3 + 1] = height;
      this._particlePositions[i * 3 + 2] = Math.sin(angle) * radius;

      // Initialize velocities for swirling motion with proper momentum
      const tangentialSpeed = 0.01 + Math.random() * 0.005; // Very slow speed around circle
      const verticalSpeed = (Math.random() - 0.5) * 0.005; // Very slow vertical drift
      
      this._particleVelocities.push(new Vector3(
        -Math.sin(angle) * tangentialSpeed, // Tangential velocity
        verticalSpeed, // Vertical drift
        Math.cos(angle) * tangentialSpeed
      ));
      
      // Initialize random opacity for fade effect
      this._particleOpacities.push(Math.random()); // Random opacity between 0.0 and 1.0
      
      // Initialize random size for each particle (favor smaller particles)
      const sizeRandom = Math.random();
      const size = 2.0 + Math.pow(sizeRandom, 2) * 3.0; // Favor smaller sizes (2.0 to 5.0)
      this._particleSizes.push(size);
      
      // Initialize random color for each particle (gold to orange range)
      const colorVariation = Math.random();
      const r = 1.0; // Red component (full)
      const g = 0.6 + colorVariation * 0.4; // Green: 0.6 to 1.0
      const b = 0.0 + colorVariation * 0.2; // Blue: 0.0 to 0.2
      this._particleColors.push(new Vector3(r, g, b));
    }

    geometry.setAttribute('position', new Float32BufferAttribute(this._particlePositions, 3));
    
    // Create opacity attribute for individual particle opacity
    const opacityArray = new Float32Array(this._particleCount);
    for (let i = 0; i < this._particleCount; i++) {
      opacityArray[i] = this._particleOpacities[i];
    }
    geometry.setAttribute('opacity', new Float32BufferAttribute(opacityArray, 1));
    
    // Create size attribute for individual particle size
    const sizeArray = new Float32Array(this._particleCount);
    for (let i = 0; i < this._particleCount; i++) {
      sizeArray[i] = this._particleSizes[i];
    }
    geometry.setAttribute('size', new Float32BufferAttribute(sizeArray, 1));
    
    // Create color attribute for individual particle colors
    const colorArray = new Float32Array(this._particleCount * 3);
    for (let i = 0; i < this._particleCount; i++) {
      const color = this._particleColors[i];
      colorArray[i * 3] = color.x; // Red
      colorArray[i * 3 + 1] = color.y; // Green
      colorArray[i * 3 + 2] = color.z; // Blue
    }
    geometry.setAttribute('color', new Float32BufferAttribute(colorArray, 3));

    // Create custom shader material for individual particle opacity
    const material = new ShaderMaterial({
      vertexShader: `
        attribute float opacity;
        attribute float size;
        attribute vec3 color;
        varying float vOpacity;
        varying vec3 vColor;
        void main() {
          vOpacity = opacity;
          vColor = color;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size;
        }
      `,
      fragmentShader: `
        varying float vOpacity;
        varying vec3 vColor;
        void main() {
          // Create circular points instead of squares
          vec2 center = gl_PointCoord - vec2(0.5);
          float dist = length(center);
          if (dist > 0.5) {
            discard; // Discard pixels outside the circle
          }
          gl_FragColor = vec4(vColor, vOpacity); // Individual color with individual opacity
        }
      `,
      transparent: true,
      blending: 1, // Additive blending
      depthWrite: false
    });

    this._particles = new Points(geometry, material);
    this._objectGroup = new Group();
    this._objectGroup.add(this._particles);

    // Animation will be handled externally via update() method
    console.log('Particle system created, ready for external animation...'); // Debug log
  }

  public updateParticles(time: number): void {
    // Apply time scale to slow down all animations
    const timeScale = 0.001; // Slow down time by 1000x
    const scaledTime = time * timeScale;
    
    for (let i = 0; i < this._particleCount; i++) {
      const baseIndex = i * 3;
      
      // Calculate current angle and radius from position
      const currentX = this._particlePositions[baseIndex];
      const currentZ = this._particlePositions[baseIndex + 2];
      const currentAngle = Math.atan2(currentZ, currentX);
      const currentRadius = Math.sqrt(currentX * currentX + currentZ * currentZ);
      
      // Add swirling motion by rotating the angle
      const swirlSpeed = 0.01; // Very slow rotation
      const newAngle = currentAngle + swirlSpeed;
      
      // Update position with swirling motion
      this._particlePositions[baseIndex] = Math.cos(newAngle) * currentRadius; // X
      this._particlePositions[baseIndex + 2] = Math.sin(newAngle) * currentRadius; // Z
      
            // Add oscillating vertical movement (no continuous drift)
      const verticalOffset = Math.sin(scaledTime * 0.02 + i * 0.2) * 0.3; // Oscillating around zero
      // this._particlePositions[baseIndex + 1] = verticalOffset; // Set to oscillating value instead of accumulating
      
      // Animate opacity fade in/out
      const fadeSpeed = 0.02 + i * 0.01; // Different fade speed for each particle
      this._particleOpacities[i] += Math.sin(scaledTime * fadeSpeed) * 0.05; // More dramatic fade in/out
      
      // Clamp opacity between 0.0 and 1.0
      this._particleOpacities[i] = Math.max(0.0, Math.min(1.0, this._particleOpacities[i]));
      
      // Animate particle size
      const sizeSpeed = 0.01 + i * 0.005; // Different size animation speed for each particle
      this._particleSizes[i] += Math.sin(scaledTime * sizeSpeed) * 0.1; // Subtle size pulsing
      
      // Clamp size between 1.5 and 6.0 (reduced max size)
      this._particleSizes[i] = Math.max(1.5, Math.min(6.0, this._particleSizes[i]));
      
      // Animate particle color
      const colorSpeed = 0.005 + i * 0.002; // Different color animation speed for each particle
      const colorShift = Math.sin(scaledTime * colorSpeed) * 0.1; // Subtle color variation
      const currentColor = this._particleColors[i];
      
      // Shift between gold and orange
      currentColor.y = Math.max(0.5, Math.min(1.0, currentColor.y + colorShift)); // Green component
      currentColor.z = Math.max(0.0, Math.min(0.3, currentColor.z + colorShift * 0.5)); // Blue component
    }

    // Update geometry - properly copy the position data to the geometry attribute
    this._particles.geometry.setAttribute('position', new Float32BufferAttribute(this._particlePositions, 3));
    
    // Update opacity attribute for individual particle opacity
    const opacityArray = new Float32Array(this._particleCount);
    for (let i = 0; i < this._particleCount; i++) {
      opacityArray[i] = this._particleOpacities[i];
    }
    this._particles.geometry.setAttribute('opacity', new Float32BufferAttribute(opacityArray, 1));
    
    // Update size attribute for individual particle size
    const sizeArray = new Float32Array(this._particleCount);
    for (let i = 0; i < this._particleCount; i++) {
      sizeArray[i] = this._particleSizes[i];
    }
    this._particles.geometry.setAttribute('size', new Float32BufferAttribute(sizeArray, 1));
    
    // Update color attribute for individual particle colors
    const colorArray = new Float32Array(this._particleCount * 3);
    for (let i = 0; i < this._particleCount; i++) {
      const color = this._particleColors[i];
      colorArray[i * 3] = color.x; // Red
      colorArray[i * 3 + 1] = color.y; // Green
      colorArray[i * 3 + 2] = color.z; // Blue
    }
    this._particles.geometry.setAttribute('color', new Float32BufferAttribute(colorArray, 3));
    
    
  }

  public get object(): Group {
    return this._objectGroup;
  }

  protected get _object(): any {
    return this._particles;
  }

  public clone(): MagicalHexagonHighlightParticlesObject {
    return new MagicalHexagonHighlightParticlesObject(this._animationService);
  }
} 