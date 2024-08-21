// export class FloatingRockTerrainFactory extends ActorFactoryBase<IFloatingRockComposerDefinition, FloatingRockTerrainObject> {

//   constructor(
//     private readonly _assetsLoader: IAssetsProvider,
//     private readonly _actorsManager: ActorsManager,
//     private readonly _animationService: AnimationService
//   ) { 
//     super(floatingRockTerrainComposerDefinitionName)
//   }
  
//   public static async build(def: IFloatingRockDefinition, assetsLoader: IAssetsProvider): Promise<Mesh<BufferGeometry, MeshLambertMaterial>> {
//     const mesh = (await assetsLoader.loadAsync(floatingRockTerrainModelFileName, modelFileExtensionName)).scene.children[0];
//     mesh.material = new MeshLambertMaterial({ color: def.color });
//     mesh.receiveShadow = true
//     return mesh;
//   }

//   public async create(def: IFloatingRockComposerDefinition): Promise<FloatingRockTerrainObject> {
//     const floatingRock = await FloatingRockTerrainFactory.build(def, this._assetsLoader);
//     return new FloatingRockTerrainObject(floatingRock, this._animationService);
//   }

//   public async compose(def: IFloatingRockComposerDefinition) {
//     const terrain = await this.create(def);
//     this._actorsManager.initializeObject(terrain);
//     terrain.afterEnteringScene(def.position);
//     def.isHandled = true;
//   }

//   public getRequiredAssetDefinitions(): IAssetDefinition[] {
//     return [{
//       fileName: stoneFiledmodelFileName,
//       ext:modelFileExtensionName
//     }]
//   }
// }