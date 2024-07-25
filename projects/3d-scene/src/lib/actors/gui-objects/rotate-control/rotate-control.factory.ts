import { Mesh, MeshStandardMaterial, Shape, Color, CylinderGeometry, DoubleSide, ShapeGeometry, MeshBasicMaterial } from "three";
import { IAssetDefinition } from "../../../assets/assets.interface";
import { ActorFactoryBase } from "../../actor-factory-base.factory";
import { ActorsManager } from "../../actors-manager";
import { RotateControlObject } from "./rotate-control.gui-object";
import { IRotateControlComposerDefinition, IRotateControlCreationDefinition } from "./rotate-control.interface";
import { rotateControlDefinitionName } from "./rotate-control.constants";

export class RotateControlFactory extends ActorFactoryBase<IRotateControlComposerDefinition, RotateControlObject> {

  constructor(
    private readonly _actorsManager: ActorsManager
  ) { 
    super(rotateControlDefinitionName)
  }

  public static async build(def: IRotateControlComposerDefinition): Promise<Mesh<ShapeGeometry, any>> {

    
    const material = new MeshStandardMaterial({
      color: new Color("#fff"),
      side: DoubleSide
    });
    const shape = new Shape();
    shape.moveTo(0, 0);
    shape.lineTo(0.5, 0.7);
    shape.lineTo(1, 0);
    shape.lineTo(0, 0);

    const geometry = new ShapeGeometry(shape);
    geometry.center()
    geometry.rotateX((Math.PI / 180) * 90);
    geometry.rotateY((Math.PI / 180) * 270);
    const mesh = new Mesh(geometry, material);

    return mesh;
  }

  
  public async create(def: IRotateControlCreationDefinition): Promise<RotateControlObject> {
    const mesh = await RotateControlFactory.build(def);
    return new RotateControlObject(def, mesh);
  }


  public async compose(def: IRotateControlComposerDefinition) {
    const control = await this.create(def);
    //control.setPosition(def.position);
    this._actorsManager.initializeObject(control);
  }

  public getRequiredAssetDefinitions(): IAssetDefinition[] {
    return [];
  }


}