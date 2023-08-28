import { CylinderGeometry, Mesh, MeshBasicMaterial, ShaderMaterial, Vector3 } from "three";
import { BLOOM_SCENE } from "../../constants/layers";
import { GameObject } from "./game-object"

export interface NuclearRodObjectConfig {
  rotation: Vector3,
  position: Vector3,
  mainMaterial: ShaderMaterial,
  mainGeometry: CylinderGeometry,
  upperMaterial: MeshBasicMaterial,
  upperGeometry: CylinderGeometry,
  topMaterial: MeshBasicMaterial,
  topGeometry: CylinderGeometry
}

export class NuclearRodObject extends GameObject {
  protected _object!: Mesh<CylinderGeometry, ShaderMaterial>;
  private _mainGeometry: CylinderGeometry;
  private _mainMaterial: ShaderMaterial;

  private _upperMesh!: Mesh<CylinderGeometry, MeshBasicMaterial>;
  private _upperGeometry: CylinderGeometry;
  private _upperMaterial: MeshBasicMaterial;

  private _topMesh!: Mesh<CylinderGeometry, MeshBasicMaterial>;
  private _topGeometry: CylinderGeometry;
  private _topMaterial: MeshBasicMaterial;

  private _initialPosition: Vector3;
  private _initialRotation: Vector3;
  
  constructor(cfg: NuclearRodObjectConfig) {
    super("");
    this._initialPosition = cfg.position;
    this._initialRotation = cfg.rotation;

    this._mainGeometry = cfg.mainGeometry;
    this._mainMaterial = cfg.mainMaterial;

    this._upperGeometry = cfg.upperGeometry;
    this._upperMaterial = cfg.upperMaterial;
    
    this._topGeometry = cfg.topGeometry;
    this._topMaterial = cfg.topMaterial;
  }

  public init(): Mesh {
    this._object = new Mesh(this._mainGeometry, this._mainMaterial);
    this._object.position.set(
      this._initialPosition.x,
      this._initialPosition.y,
      this._initialPosition.z
    );

    this._object.layers.enable( BLOOM_SCENE );

    this._object.rotateX(this._initialRotation.x);
    this._object.rotateY(this._initialRotation.y);
    this._object.rotateZ(this._initialRotation.z);
    
    this._upperMesh = new Mesh(this._upperGeometry, this._upperMaterial);
    this._object.add(this._upperMesh);
    this._upperMesh.position.y = 5.5;
    
    this._topMesh = new Mesh(this._topGeometry, this._topMaterial);
    this._object.add(this._topMesh);
    this._topMesh.position.y = 6.3;

    super.init();
    return this._object;   
  }

}