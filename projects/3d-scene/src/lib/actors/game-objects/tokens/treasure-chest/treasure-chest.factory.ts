import { Group, Mesh, BufferGeometry, MeshLambertMaterial, PlaneGeometry, Sprite, SpriteMaterial } from "three";
import { AnimationService } from "../../../../animations/animation.service";
import { modelFileExtensionName, alphaMapFileExtensionName } from "../../../../assets/assets.constants";
import { IAssetsProvider, IAssetDefinition } from "../../../../assets/assets.interface";
import { ActorFactoryBase } from "../../../actor-factory-base.factory";
import { ActorsManager } from "../../../actors-manager";
import { PointLightFactory } from "../../../light-objects/point-light/point-light.factory";
import { FieldBase } from "../../fields/common/base-field.game-object";
import { chestBodyFirstModelFileName, chestBodySecondModelFileName, chestLidFirstModelFileName, chestLidSecondModelFileName, chestTreasureAlphaMapFileName, chestTreasureModelFileName, treasureChestDefinitionName } from "./treasure-chest.constants";
import { ITreasureChestComposerDefinition, ITreasureChestCreationDefinition, ITreasureChestDefinition } from "./treasure-chest.interface";
import { TreasureChestObject } from "./treasure-chest.game-object";

export class TreasureChestFactory extends ActorFactoryBase<ITreasureChestComposerDefinition, TreasureChestObject> {
  
  constructor(
    private readonly _actorsManager: ActorsManager,
    private readonly _assetsLoader: IAssetsProvider,
    private readonly _anmationService: AnimationService
  ) { 
    super(treasureChestDefinitionName)
  }

  public async create(def: ITreasureChestCreationDefinition): Promise<TreasureChestObject> {
    const treasureChest = await TreasureChestFactory.build(def, this._assetsLoader, PointLightFactory);
    return new TreasureChestObject(def, treasureChest, this._anmationService);
  }

  
  public async compose(def: ITreasureChestComposerDefinition): Promise<void> {
    const token = await this.create(def);
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
    def: ITreasureChestDefinition,
    assetsLoader: IAssetsProvider,
    pointLightFactory: typeof PointLightFactory
  ): Promise<Group> {
    const primaryMaterial = new MeshLambertMaterial({ color: def.primaryColor });
    const secondaryMaterial = new MeshLambertMaterial({ color: def.secondaryColor });
    const tertiaryMaterial = new MeshLambertMaterial({ color: def.tertiaryColor });

    const bodyGroup = new Group();
    const chestBodyFirst = (await assetsLoader.loadAsync(chestBodyFirstModelFileName, modelFileExtensionName)).scene.children[0] as Mesh<BufferGeometry, MeshLambertMaterial>;
    chestBodyFirst.material = primaryMaterial;
    chestBodyFirst.receiveShadow = true;
    chestBodyFirst.castShadow = true;
    bodyGroup.add(chestBodyFirst);

    const chestBodySecond = (await assetsLoader.loadAsync(chestBodySecondModelFileName, modelFileExtensionName)).scene.children[0] as Mesh<BufferGeometry, MeshLambertMaterial>;
    chestBodySecond.material = secondaryMaterial;
    chestBodySecond.receiveShadow = true;
    chestBodySecond.castShadow = true;
    bodyGroup.add(chestBodySecond);
    bodyGroup.position.set(0, -0.2, 0);
    bodyGroup.rotateY((Math.PI / 180) * 30);

    const chestInnerTreasure = new Mesh(new PlaneGeometry(1, 0.5), tertiaryMaterial);
    chestInnerTreasure.receiveShadow = true;
    chestInnerTreasure.castShadow = true;
    bodyGroup.add(chestInnerTreasure);
    chestInnerTreasure.position.set(0, 0.5, 0);
    chestInnerTreasure.rotateX((Math.PI / 180) * -90);

    const glowAlphaMap = await assetsLoader.loadAsync(chestTreasureAlphaMapFileName, alphaMapFileExtensionName);
    const sprite1 = new Sprite(new SpriteMaterial({ color: def.lightColor, opacity: 0.6, alphaMap: glowAlphaMap }));
    sprite1.scale.set(2, 1, 1);
    sprite1.position.set(0, 0.65, 0.3);
    bodyGroup.add(sprite1);

    const chestTreasure = (await assetsLoader.loadAsync(chestTreasureModelFileName, modelFileExtensionName)).scene.children[0] as Mesh<BufferGeometry, MeshLambertMaterial>;
    chestTreasure.material = tertiaryMaterial;
    chestTreasure.receiveShadow = true;
    chestTreasure.castShadow = true;
    chestTreasure.position.set(0.5, 0.2, -0.3);
    bodyGroup.add(chestTreasure);

    const lidInnerGroup = new Group();
    const chestLidFirst = (await assetsLoader.loadAsync(chestLidFirstModelFileName, modelFileExtensionName)).scene.children[0] as Mesh<BufferGeometry, MeshLambertMaterial>;
    chestLidFirst.material = primaryMaterial;
    chestLidFirst.receiveShadow = true;
    chestLidFirst.castShadow = true;
    lidInnerGroup.add(chestLidFirst);

    const chestLidSecond = (await assetsLoader.loadAsync(chestLidSecondModelFileName, modelFileExtensionName)).scene.children[0] as Mesh<BufferGeometry, MeshLambertMaterial>;
    chestLidSecond.material = secondaryMaterial;
    chestLidSecond.receiveShadow = true;
    chestLidSecond.castShadow = true;
    lidInnerGroup.add(chestLidSecond);
    lidInnerGroup.position.set(0, 0, 0.15);
    lidInnerGroup.rotateX(-0.4);

    const lidOuterGroup = new Group();
    lidOuterGroup.add(lidInnerGroup);
    lidOuterGroup.rotateY((Math.PI / 180) * 30);


    const group = new Group();
    group.add(lidOuterGroup);
    group.add(bodyGroup);
    const light = await pointLightFactory.build({
      color: def.lightColor,
      intensity: 10,
      distance: 2,
      decay: 1,
      castShadow: true
    })
    light.position.setY(1);
    group.add(light);
    return group;
  }


  public getRequiredAssetDefinitions(): IAssetDefinition[] {
    return [
      { assetName: chestBodyFirstModelFileName, extensionName: modelFileExtensionName },
      { assetName: chestBodySecondModelFileName, extensionName: modelFileExtensionName },
      { assetName: chestLidFirstModelFileName, extensionName: modelFileExtensionName },
      { assetName: chestLidSecondModelFileName, extensionName: modelFileExtensionName },
      { assetName: chestLidSecondModelFileName, extensionName: modelFileExtensionName },
      { assetName: chestTreasureModelFileName, extensionName: modelFileExtensionName },
      { assetName: chestTreasureModelFileName, extensionName: modelFileExtensionName }
    ]
  }
}