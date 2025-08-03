import { Group, Mesh, BufferGeometry, MeshLambertMaterial, SpriteMaterial, Sprite } from "three";
import { AnimationService } from "../../../../animations/animation.service";
import { modelFileExtensionName, alphaMapFileExtensionName } from "../../../../assets/assets.constants";
import { IAssetsProvider, IAssetDeclaration } from "../../../../assets/assets.interface";
import { ActorFactoryBase } from "../../../actor-factory-base.factory";
import { ActorsManager } from "../../../actors-manager";
import { PointLightFactory } from "../../../light-objects/point-light/point-light.factory";
import { FieldBase } from "../../fields/common/base-field.game-object";
import { IBarrelWithCandlesComposerDefinition, IBarrelWithCandlesCreationDefinition, IBarrelWithCandlesDefinition } from "./barrel-with-candles.interfaces";
import { barrelWithCandlesAlphaMapFileName, barrelWithCandlesBodyModelFileName, barrelWithCandlesCandlesModelFileName, barrelWithCandlesDefinitionName, barrelWithCandlesHoopModelFileName } from "./barrel-with-candles.constants";
import { BarrelWithCandlesObject } from "./barrel-with-candles.game-object";


export class BarrelWithCandlesFactory extends ActorFactoryBase<IBarrelWithCandlesComposerDefinition, BarrelWithCandlesObject> {
  
  constructor(
    private readonly _actorsManager: ActorsManager,
    private readonly _assetsLoader: IAssetsProvider,
    private readonly _anmationService: AnimationService
  ) { 
    super(barrelWithCandlesDefinitionName)
  }

  public async create(def: IBarrelWithCandlesCreationDefinition): Promise<BarrelWithCandlesObject> {
    const treasureChest = await BarrelWithCandlesFactory.build(def, this._assetsLoader, PointLightFactory);
    return new BarrelWithCandlesObject(def, treasureChest, this._anmationService);
  }

  
  public async compose(def: IBarrelWithCandlesComposerDefinition): Promise<void> {
    const token = await this.create(def);
    token.object.layers.enable(1)
    this._actorsManager.initializeObject(token);
    token.setRotation(def.rotation);
    const field = this._actorsManager.getObjectById<FieldBase & any>(def.takenFieldId!);
    if (field) {
      const { coords } = field.takeBy(token, def.takenFieldId);
      token.setPosition(coords);
      token.afterEnteringScene(coords, def.initialAnimationDelay);
    } else if (def.position) {
      token.setPosition(def.position);
    }
    def.isHandled = true;
  }


  public static async build(
    def: IBarrelWithCandlesDefinition,
    assetsLoader: IAssetsProvider,
    pointLightFactory: typeof PointLightFactory
  ): Promise<Group> {
    const primaryMaterial = new MeshLambertMaterial({ color: def.primaryColor });
    const secondaryMaterial = new MeshLambertMaterial({ color: def.secondaryColor });

    const group = new Group();
    const barrels = (await assetsLoader.loadAsync({ fileName: barrelWithCandlesBodyModelFileName, ext: modelFileExtensionName })).scene.children[0] as Mesh<BufferGeometry, MeshLambertMaterial>;
    barrels.material = primaryMaterial;
    barrels.receiveShadow = true;
    barrels.castShadow = true;
    barrels.position.setY(0.2);
    group.add(barrels);

    const hoops = (await assetsLoader.loadAsync({ fileName: barrelWithCandlesHoopModelFileName, ext: modelFileExtensionName })).scene.children[0] as Mesh<BufferGeometry, MeshLambertMaterial>;
    hoops.material = secondaryMaterial;
    hoops.receiveShadow = true;
    hoops.castShadow = true;
    hoops.position.setY(0.14);
    group.add(hoops);

    const candles = (await assetsLoader.loadAsync({ fileName: barrelWithCandlesCandlesModelFileName, ext: modelFileExtensionName })).scene.children[0] as Mesh<BufferGeometry, MeshLambertMaterial>;
    candles.material = secondaryMaterial;
    candles.receiveShadow = true;
    candles.castShadow = true;
    candles.position.setY(0);
    group.add(candles);

    const candleAlphaMap = await assetsLoader.loadAsync( { fileName: barrelWithCandlesAlphaMapFileName, ext: alphaMapFileExtensionName });
    const sprite1 = new Sprite(new SpriteMaterial({ color: def.lightColor, opacity: 0.1, alphaMap: candleAlphaMap }));
    sprite1.scale.set(0.4, 0.4, 0.4);
    sprite1.position.set(0.3, 0.65, 0);
    group.add(sprite1);

    const sprite2 = new Sprite(new SpriteMaterial({ color: def.lightColor, opacity: 0.1, alphaMap: candleAlphaMap }));
    sprite2.position.set(0, 0.2, -0.4);
    group.add(sprite2);

    const sprite3 = new Sprite(new SpriteMaterial({ color: def.lightColor, opacity: 0.1, alphaMap: candleAlphaMap }));
    sprite3.position.set(-0.2, 0.2, 0.4);
    group.add(sprite3);


    const light = await pointLightFactory.build({
      color: def.lightColor,
      intensity: 10,
      distance: 2,
      decay: 1,
      castShadow: true
    })
    light.position.setY(1);
    group.add(light);
    group.scale.set(1.15, 1.15, 1.15);
    return group;
  }


  public getRequiredAssetDefinitions(): IAssetDeclaration[] {
    return [
      { fileName: barrelWithCandlesBodyModelFileName, ext: modelFileExtensionName },
      { fileName: barrelWithCandlesCandlesModelFileName, ext: modelFileExtensionName },
      { fileName: barrelWithCandlesHoopModelFileName, ext: modelFileExtensionName },
      { fileName: barrelWithCandlesAlphaMapFileName, ext: alphaMapFileExtensionName }
    ]
  }
}