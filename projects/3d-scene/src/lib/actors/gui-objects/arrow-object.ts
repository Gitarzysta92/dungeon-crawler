import { Mesh, MeshStandardMaterial, ExtrudeGeometry, Vector3, BoxGeometry, ExtrudeGeometryOptions, Shape, WireframeGeometry, LineSegments, Group } from "three";
import { GameObject } from "../game-objects/game-object";


export interface GuiArrowConfig {
  auxId: string,
  position: Vector3,
  height: number,
  targetPosition: Vector3,
  wrapperGeometry: BoxGeometry,
  wrapperMaterial: MeshStandardMaterial,
  arrowMaterial: MeshStandardMaterial,
  extrudeSettings: ExtrudeGeometryOptions
}

export class GuiArrowObject extends GameObject {
  public auxCoords: any;
  protected _object!: Mesh<BoxGeometry, MeshStandardMaterial>;

  private _initialPosition: Vector3;
  private _targetPosition: Vector3;
  private _wrapperGeometry: BoxGeometry;
  private _wrapperMaterial: MeshStandardMaterial;
  private _arrowMaterial: MeshStandardMaterial;
  private _extrudeSettings: ExtrudeGeometryOptions;

  constructor(cfg: GuiArrowConfig) {
    super(cfg.auxId);
    this.auxId = cfg.auxId;
    this._initialPosition = cfg.position;
    this._initialPosition.y = cfg.height;
    this._targetPosition = cfg.targetPosition;
    this._targetPosition.y = cfg.height;
    this._wrapperGeometry = cfg.wrapperGeometry;
    this._wrapperMaterial = cfg.wrapperMaterial;
    this._arrowMaterial = cfg.arrowMaterial;
    this._extrudeSettings = cfg.extrudeSettings;
  }

  public init(): Mesh {
    this._object = new Mesh(this._wrapperGeometry, this._wrapperMaterial);

    const distance = Math.floor(this._initialPosition.distanceTo(this._targetPosition));
    var dir = this._initialPosition.clone().sub(this._targetPosition).normalize().multiplyScalar(-distance/2);
    const { x, z } = this._initialPosition.clone().add(dir);
    this._object.position.set(x, this._initialPosition.y, z);
    this._object.lookAt(this._targetPosition);
    this._object.rotateX(-0.1);

    const arrowHeadWidth = 4;
    const arrow = new Mesh(this._createArrowHead(distance, arrowHeadWidth), this._arrowMaterial);
    this._object.add(arrow);

    const body = new Mesh(this._createArrowBody(distance, arrowHeadWidth), this._arrowMaterial);
    this._object.add(body);

    super.init();
    return this._object;   
  }


  private _createArrowBody(cChord: number, offsetX: number): ExtrudeGeometry {
    const startAngleDegree = 120;
    const endAngleDegree = 60;
    const centralAngleDegree = startAngleDegree - endAngleDegree;
    const arcWidth = 2;
    const arcThickness = 0.7;

    cChord -= offsetX;

    const a = ((Math.PI / 180) * centralAngleDegree) / 2;
    const r = Math.round(Math.abs((cChord / 2) / Math.sin(a)));
    const startAngle = (Math.PI / 180) * startAngleDegree;
    const endAngle = (Math.PI / 180) * endAngleDegree;
    const offsetY = Math.round(Math.abs((cChord / 2) / Math.tan(a))) + 2;

    var shape = new Shape();
    shape.absarc(0, 0, r, endAngle, startAngle, false);
    shape.absarc(0, -arcThickness, r, startAngle, endAngle, true);

    const geometry = new ExtrudeGeometry(shape, Object.assign(this._extrudeSettings, { depth: arcWidth }));
    geometry.translate(offsetX/2, -offsetY, -1);
    geometry.rotateY(Math.PI * .5)
    return geometry;
  }

  private _createArrowHead(distance: number, offsetX: number): ExtrudeGeometry {
    const triangleShape = new Shape().moveTo(-3, 0).lineTo(0, -4).lineTo(3, 0);
    const arrowHeadGeometry = new ExtrudeGeometry(triangleShape, Object.assign(this._extrudeSettings, { depth: 0.7 }));
    arrowHeadGeometry.rotateX(Math.PI * 0.3);
    arrowHeadGeometry.rotateY(Math.PI);
    arrowHeadGeometry.translate(0, -(1.6 + distance * .01), distance/2 - offsetX);
    return arrowHeadGeometry;
  }


}