import { BufferGeometry, Euler, InstancedMesh, Material, Matrix4, Quaternion, Vector3 } from "three";
import { ActorBase } from "../../../actor-base";
import { IParticlesDefinition } from "./particles.interface";
import { IAnimatable } from "../../../../animations/animations.interface";


export class ParticlesObject extends ActorBase implements IAnimatable {
  public get object() { return this._object };
  public get animationSubject() { return this._object }
  
  private _particlesNumber: number;
  private _position: Vector3 = new Vector3();
  private _rotation: Euler = new Euler();
  private _quaternion: Quaternion = new Quaternion();
  private _scale: Vector3 = new Vector3();
  private _matrix: Matrix4 = new Matrix4();
  
  constructor(
    def: IParticlesDefinition,
    protected _object: InstancedMesh<BufferGeometry, Material>
  ) {
    super({ auxId: "string", auxCoords: "string" });
    this._particlesNumber = def.count;
  }

  public init(): InstancedMesh {
    super.init();
    this.randomizePositions();
    //this._object.layers.enable(BLOOM_SCENE);
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