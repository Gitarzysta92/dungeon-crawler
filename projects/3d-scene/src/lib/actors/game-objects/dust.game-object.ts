import { BufferGeometry, Euler, InstancedMesh, Material, Matrix4, Mesh, Quaternion, Sprite, SpriteMaterial, Vector3 } from "three";
import { GameObject } from "./game-object";
import { Animatable } from "../../behaviours/animations/animatable";

export interface DustObjectConfig {
  position: Vector3,
  mainMaterial: SpriteMaterial,
}

export class DustObject extends GameObject implements Animatable {

  public get animationSubject() { return this._object };

  protected _object!: Sprite;
  private _mainMaterial: SpriteMaterial;
  private _initialPosition: Vector3;

  private _position: Vector3;
  private _rotation: Euler;
  private _quaternion: Quaternion;
  private _scale: Vector3;
  private _matrix: Matrix4;
  
  constructor(cfg: DustObjectConfig) {
    super("");
    this._initialPosition = cfg.position;
    this._mainMaterial = cfg.mainMaterial;

    this._position = new Vector3();
    this._rotation = new Euler();
    this._quaternion = new Quaternion();
    this._scale = new Vector3();
    this._matrix = new Matrix4();
  }
  
  public init(): Sprite {
    this._object = new Sprite(this._mainMaterial)
    this._object.position.y = 7;
    this._object.scale.set(4, 4, 4);
    this._object.material.rotation = 180;
    this._object.visible = false;
    return this.object as Sprite;
  }

  public randomizePositions(): void {
    throw new Error("Method not implemented.");
  }

  private _randomizeMatrix(matrix: Matrix4): void {
    this._position.x = Math.random();
    this._position.y = Math.random();
    this._position.z = Math.random();

    this._rotation.x = Math.random() * 2 * Math.PI;
    this._rotation.y = Math.random() * 2 * Math.PI;
    this._rotation.z = Math.random() * 2 * Math.PI;

    this._quaternion.setFromEuler(this._rotation);
    this._scale.x = Math.random() * 0.06 + 0.01;
    this._scale.y = Math.random() * 0.02 + 0.01;
    this._scale.z = Math.random() * 0.04 + 0.01;
    matrix.compose(this._position, this._quaternion, this._scale);
  }
}