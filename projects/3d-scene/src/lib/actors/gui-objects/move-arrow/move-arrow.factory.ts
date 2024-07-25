import { BoxGeometry, ExtrudeGeometry, ExtrudeGeometryOptions, Mesh, MeshStandardMaterial, Shape, Vector3 } from "three";
import { ActorsManager } from "../../actors-manager";
import { IMoveArrowComposerDefinition, IMoveArrowCreationDefinition, IMoveArrowDefinition } from "./move-arrow.interface";
import { MoveArrowObject } from "./move-arrow.gui-object";
import { ActorFactoryBase } from "../../actor-factory-base.factory";
import { IAssetDefinition } from "../../../assets/assets.interface";
import { moveArrowComposerDefinitionName } from "./move-arrow.constants";

export class MoveArrowFactory extends ActorFactoryBase<IMoveArrowComposerDefinition, MoveArrowObject> {

  private static readonly _extrudeSettings: ExtrudeGeometryOptions = {
    steps: 1,
    depth: 2,
    bevelEnabled: false,
    bevelThickness: 1,
    bevelSize: 1,
    bevelOffset: 10,
    bevelSegments: 1
  }; 

  constructor(
    private readonly _actorsManager: ActorsManager
  ) { 
    super(moveArrowComposerDefinitionName)
  }


  public static async build(def: IMoveArrowDefinition): Promise<Mesh<BoxGeometry, MeshStandardMaterial>> {
    const width = 10;
    const height = 10;

    const wrapperGeometry = new BoxGeometry(width, height, def.length);
    const wrapperMaterial = new MeshStandardMaterial({ visible: false });
    const mesh = new Mesh(wrapperGeometry, wrapperMaterial);

    const arrowHeadWidth = 4;
    const arrowMaterial = new MeshStandardMaterial({ color: def.color });
    const arrow = new Mesh(this._createArrowHead(def.length, arrowHeadWidth), arrowMaterial);
    mesh.add(arrow);
    const body = new Mesh(this._createArrowBody(def.length, arrowHeadWidth), arrowMaterial);
    mesh.add(body);
    return mesh;
  }

  
  public async create(def: IMoveArrowCreationDefinition): Promise<MoveArrowObject> {
    const mesh = await MoveArrowFactory.build(def);
    return new MoveArrowObject(def, mesh);
  }


  public async compose(def: IMoveArrowComposerDefinition) {
    const field = await this.create(def as IMoveArrowComposerDefinition);
    const { fromPosition, toPosition } = (def as IMoveArrowComposerDefinition); 
    field.setPosition(this._getMidPosition(fromPosition, toPosition));
    field.mesh.lookAt(toPosition);
    field.mesh.rotateX(-0.1);
    this._actorsManager.initializeObject(field);
  }

  public getRequiredAssetDefinitions(): IAssetDefinition[] {
    return [];
  }


  private static _createArrowBody(cChord: number, offsetX: number): ExtrudeGeometry {
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


  private static _createArrowHead(distance: number, offsetX: number): ExtrudeGeometry {
    const triangleShape = new Shape().moveTo(-3, 0).lineTo(0, -4).lineTo(3, 0);
    const arrowHeadGeometry = new ExtrudeGeometry(triangleShape, Object.assign(this._extrudeSettings, { depth: 0.7 }));
    arrowHeadGeometry.rotateX(Math.PI * 0.3);
    arrowHeadGeometry.rotateY(Math.PI);
    arrowHeadGeometry.translate(0, -(1.6 + distance * .01), distance/2 - offsetX);
    return arrowHeadGeometry;
  }


  private _getMidPosition(from: Vector3, to: Vector3): Vector3 {
    const distance = Math.floor(from.distanceTo(to));
    var dir = from.clone().sub(to).normalize().multiplyScalar(-distance/2);
    return from.clone().add(dir);
  }

}