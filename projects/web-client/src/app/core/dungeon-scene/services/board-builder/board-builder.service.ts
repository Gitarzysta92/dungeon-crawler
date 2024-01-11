import { Injectable } from "@angular/core";

@Injectable()
export class BoardBuilderService {

  // public buildBoardDefinition(
  //   apperance: IBoardApperance,
  //   fields: MapVectorToRawVector<ISceneFieldDeclaration>[]
  // ): IBoardDeclaration {
  //   return {
  //     type: "hexagonal-game-board",
  //     coords: { x: 0, y: 0, z: 0 },
  //     apperance: apperance,
  //     fields: fields
  //   }
  // }

  // public initialize(os: IBoardAppearanceSetup, mesh: any): void {
  //   os.fields.forEach((f, i) => {
  //     let { coords } = f;
  //     coords.x = coords.x * 2;
  //     coords.z = coords.z * 1.7;
  //     coords.y = 0;
  //     const field = GameObjectFactory.createHexField2(mesh, f.auxId, f.auxCoords, coords);
  //     //const field = GameObjectFactory.createHexField(f);

  //     // if (f.highlighted && f.highlighted.color) {
  //     //   field.highlight();
  //     // }

  //     const x = this._actorsManager.initializeObject(field);
  //     x.rotateY((Math.PI / 180) * (i * 60))
  //     this._actorsManager.referenceField = field;
  //   });
  // }

  // private async _handleBoardCreation(setup: IBoardDeclaration): Promise<void> {
  //   const gltb = await this._loader.loadAsync("assets/images/field.glb");
  //   const mesh = gltb.scene.children[0];
  //   if (setup.coords) {
  //     setup.coords = new Vector2(setup.coords.x, setup.coords.y);
  //   }
  //   setup.fields.forEach(f => f.coords = new Vector3(f.coords.x, f.coords.y, f.coords.z));  
  //   switch (setup.type) {        
  //     case "hexagonal-game-board":
  //       const board = new HexagonalBoardComponent(this._actorsManager);
  //       board.initialize(setup as unknown as IBoardAppearanceSetup, mesh);
  //       break;
      
  //     default:
  //       break;
  //   }
  // }

  // private async _handleTerrainCreation(terrainSetup: ITerrainDeclaration): Promise<void> {
  //   // const mapTexture = await this._textureHelper.preloadTexture(terrainSetup.mapTexture as any);
  //   // const normalMapTexture = await this._textureHelper.preloadTexture(terrainSetup.normalMapTexture as any);
  //   // const displacementMapTexture = await this._textureHelper.preloadTexture(terrainSetup.displacementMapTexture as any);
  //   let gltb = await this._loader.loadAsync("assets/images/terrain.glb");
  //   let mesh = gltb.scene.children[0];

  //   // terrain
  //   const dtf = new FloatingRockTerrainFactory();
  //   mesh = this._actorsManager.initializeObject(await dtf.createTerrain());
  //   mesh.position.setY(-1.3);
  //   mesh.position.setX(1);
  //   mesh.position.setZ(-1.5);

  //   // gate
  //   const mgf = new MagicGateFactory(this._actorsManager);
  //   const magicGate = await mgf.create()
  //   let n = 0.01;
  //   setInterval(() => magicGate.updateTime(n += 0.01),10)
  //   mesh = this._actorsManager.initializeObject(magicGate);
  //   mesh.position.setY(-0.05);
  //   mesh.position.setX(2.5);
  //   mesh.position.setZ(-3);

  //   // campfire
  //   const cff = new CampFireFactory(this._actorsManager);
  //   mesh = this._actorsManager.initializeObject(await cff.createCampFire())
  //   mesh.position.setY(0);
  //   mesh.position.setX(-3);
  //   mesh.position.setZ(-2);

  //   // const box = new BoxHelper( mesh, 0xffff00 );
  //   // this._actorsManager.integrate( box );
  // }

  
  // private async _createGlobalParticles(cs: IGlobalParticlesDeclaration): Promise<void> {
  //   const particles = new GlobalParticlesComponent(this._actorsManager);
  //   const texture = await this._textureHelper.preloadTexture(cs.mapTexture)
  //   particles.initialize(texture);
  //   this._cb.push(() => particles.recalculate());
  // }
}