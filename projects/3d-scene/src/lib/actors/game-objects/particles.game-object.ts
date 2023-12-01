import { BufferGeometry, Euler, InstancedMesh, Material, Matrix4, Mesh, Quaternion, Sprite, Vector3 } from "three";
import { BLOOM_SCENE } from "../../constants/layers";
import { GameObject } from "./game-object";
import { Animatable } from "../../behaviours/animations/animatable";

export interface ParticlesObjectConfig {
  position: Vector3,
  particlesNumber: number,
  mainMaterial: Material,
  mainGeometry: BufferGeometry,
}

export class ParticlesObject extends GameObject implements Animatable {
  public get object() { return this._object };
  public get animationSubject() { return this._object }
  protected _object!: InstancedMesh<BufferGeometry, Material>;
  private _mainGeometry: BufferGeometry;
  private _mainMaterial: Material;

  private _initialPosition: Vector3;
  private _particlesNumber: number;

  private _position: Vector3;
  private _rotation: Euler;
  private _quaternion: Quaternion;
  private _scale: Vector3;
  private _matrix: Matrix4;
  
  constructor(cfg: ParticlesObjectConfig) {
    super("");
    this._initialPosition = cfg.position;
    this._particlesNumber = cfg.particlesNumber;

    this._mainGeometry = cfg.mainGeometry;
    this._mainMaterial = cfg.mainMaterial;

    this._position = new Vector3();
    this._rotation = new Euler();
    this._quaternion = new Quaternion();
    this._scale = new Vector3();
    this._matrix = new Matrix4();
  }

  public init(): InstancedMesh {
    this._object = new InstancedMesh(
      this._mainGeometry,
      this._mainMaterial,
      this._particlesNumber
    );
    super.init();

    this.randomizePositions();

    this._object.position.set(
      this._initialPosition.x,
      this._initialPosition.y,
      this._initialPosition.z
    );

    this._object.layers.enable(BLOOM_SCENE);
    return this._object;   
  }

  public randomizePositions(): void {
    for ( let i = 0; i < this._particlesNumber; i ++ ) {
      this._randomizeMatrix(this._matrix);
      this._object.setMatrixAt(i, this._matrix);
    }
  }

  private _randomizeMatrix(matrix: Matrix4): void {
    const bit = Math.random() > 0.5 ? 1 : -1;

    this._position.x = Math.random() * 2 * bit;
    this._position.y = Math.random() * 2 * bit;
    this._position.z = Math.random() * 2 * bit;

    this._rotation.x = Math.random() * 2 * Math.PI;
    this._rotation.y = Math.random() * 2 * Math.PI;
    this._rotation.z = Math.random() * 2 * Math.PI;

    this._quaternion.setFromEuler( this._rotation );
    this._scale.x = Math.random() * 0.06 + 0.01;
    this._scale.y = Math.random() * 0.02 + 0.01;
    this._scale.z = Math.random() * 0.04 + 0.01;
    matrix.compose(this._position, this._quaternion, this._scale);
  }

}