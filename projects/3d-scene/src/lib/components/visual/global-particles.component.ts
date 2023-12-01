import { PlaneGeometry, InstancedBufferGeometry, Vector3, InstancedBufferAttribute, ShaderMaterial, DoubleSide, Vector4, TextureLoader, Color, Mesh, Texture } from "three";
import { ActorsManager } from "../../actors/actors-manager";
import { GameObject } from "../../actors/game-objects/game-object";
import fragmentShader from "../../shaders/particles1.fragment";
import vertexShader from "../../shaders/particles1.vertex";


export class GlobalParticlesComponent {
  private _time: number = 0;
  private _flag: number = -1; 
  private _materials: any = []

  constructor(
    private readonly actorsManager: ActorsManager,
  ) { }

  public recalculate(): void {
    if (this._time > 2) {
      this._flag = -1
    } else if (this._time < 0) {
      this._flag = 1
    }

    this._time += (0.001 * this._flag);
    this._materials.forEach((m: any) =>{
      m.uniforms._Time.value = this._time*0.01;
    })
  }

  public initialize(texture: Texture): void {
    const x = this.getMesh({
      particle_size: 2,
      particle_size_frequency: 1.188,
      particle_size_dispersion: .3,
      rotation_dispersion: .1,
      time_scale: 1,
      twist_speed: 1,
      twist_frequency: 3,
      twist_dispersion: .1,
      twist_dispersion_frequency: 2,
      twist_amplitude: 5,
      rotation_speed: 0,
      frequency: 0,
      amplitude: 1,
      offset: 0,
      opacity: 1,
      cone_shape: 0,
      color: "#f9ebb8",
      instance_count: 200,
      min_radius: 30,
      max_radius: 100,
      texture: texture
    });

    this.actorsManager.initializeObject({ init: () => x } as GameObject);
    
  }

  public getMesh(opts: any): any {
    let count = opts.instance_count;
    let min_radius = opts.min_radius;
    let max_radius = opts.max_radius;
    let startergeo = new PlaneGeometry(1, 1);
    let geo = new InstancedBufferGeometry();
    geo.setAttribute("position", startergeo.getAttribute("position")),
      (geo.index = startergeo.index);

    const wpos = new Float32Array(3 * count);

    for (let r = 0; r < count; r++) {
      let i = 0.05 * (2 * Math.random() - 1);
      let s = 0.2 * (2 * Math.random() - 1);
      let a = 0.05 * (2 * Math.random() - 1);
      let l = Math.pow(r / (count - 1), 0.5);
      let c = 2 * Math.PI * 0.618033 * r;
      let u = new Vector3(l * Math.cos(c) + i, 0, l * Math.sin(c) + a);
      u.multiplyScalar(max_radius - min_radius)
        .add(u.clone().normalize().multiplyScalar(min_radius)),
          (wpos[3 * r + 0] = u.x);
      
      wpos[3 * r + 1] = u.y + s;
      wpos[3 * r + 2] = u.z;
    }
    let attr = new InstancedBufferAttribute(wpos, 3, false);
    geo.setAttribute("w_pos", attr);
    geo.instanceCount = count;

    let material = new ShaderMaterial({
      side: DoubleSide,
      uniforms: {
        time: { value: 0 },
        resolution: { value: new Vector4() },
        _MainTexture: {
          value: opts.texture,
        },
        _Opacity: {
          value: opts.opacity,
        },
        _MouseWorldPosition: {
          value: new Vector3(100, 0, 0),
        },
        _Size: {
          value: opts.particle_size,
        },
        _Time: {
          value: 0,
        },
        _RotationSpeed: {
          value: opts.rotation_speed,
        },
        _TwistSpeed: {
          value: opts.twist_speed,
        },
        _TwistFrequency: {
          value: opts.twist_frequency,
        },
        _TwistDispersion: {
          value: opts.twist_dispersion,
        },
        _TwistDispersionFrequency: {
          value: opts.twist_dispersion_frequency,
        },
        _RotationDispersion: {
          value: opts.rotation_dispersion,
        },
        _SizeFrequency: {
          value: opts.particle_size_frequency,
        },
        _SizeDispersion: {
          value: opts.particle_size_dispersion,
        },
        _TwistAmplitude: {
          value: opts.twist_amplitude,
        },
        _NoiseOffset: {
          value: opts.offset,
        },
        _NoiseFrequency: {
          value: 0,
        },
        _NoiseAmplitude: {
          value: opts.amplitude,
        },
        _Color: {
          // value: new Color('#f9ebb8'),
          value: new Color(opts.color),
        },
        _UseConeShape: {
          value: 0,
        },
        _MouseSphereRadius: {
          value: 0.3,
        },
        _MouseSphereAttractionRadius: {
          value: 0.4,
        },
        _MouseSphereFalloff: {
          value: 1,
        },
        _UseMouse: {
          value: 0,
        },
        _CameraFadeout: {
          value: 1,
        },
      },
      //wireframe: true,
      depthWrite: true,
      transparent: true,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    });


    // console.log(vertexShader);
    // console.log(fragmentShader);
    // let material = new MeshStandardMaterial({
    //   side: DoubleSide,
    //   color: 0x705e54,
    //   roughness: 0.65,
    //   metalness: 0.15,
    //   aoMapIntensity: 1,
    //   depthTest: true,
    //   wireframe: true
    // })

    //geo = new PlaneGeometry(10,10) as any;

    const cloud = new Mesh(geo, material);
    cloud.position.set(0, 10, 0);
    cloud.frustumCulled = false;
    this._materials.push(material as any)
    return cloud
  }
}