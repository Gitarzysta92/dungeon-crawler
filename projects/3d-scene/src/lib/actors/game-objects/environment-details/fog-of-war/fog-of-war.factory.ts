import { ClampToEdgeWrapping, Color, CylinderGeometry, DataTexture, DoubleSide, LinearFilter, LuminanceFormat, Mesh, MeshBasicMaterial, MeshStandardMaterial, NearestFilter, PlaneGeometry, RGFormat, ShaderMaterial, UnsignedByteType } from "three";
import { FogOfWarObject } from "./fog-of-war.game-object";
import { ActorsManager } from "../../../actors-manager";
import { ActorFactoryBase } from "../../../actor-factory-base.factory";
import { fogOfWarComposerDefinitionName } from "./fog-of-war.constants";
import { IAssetDeclaration, IAssetsProvider } from "../../../../assets/assets.interface";
import { IFogOfWarComposerDefinition, IFogOfWarDefinition } from "./fog-of-war.interface";

export class FogOfWarFactory extends ActorFactoryBase<IFogOfWarComposerDefinition, FogOfWarObject> {
 
  constructor(
    private readonly _actorsManager: ActorsManager,
    private readonly _assetsLoader: IAssetsProvider,
  ) { 
    super(fogOfWarComposerDefinitionName)
  }

  public static async build(t: any): Promise<Mesh<PlaneGeometry, MeshBasicMaterial>> {
    const width = 50;
    const height = 50;
    const mask = (new Array(width * height)).fill(1)
    const data = new Uint8Array(mask.length * 2);
    data.set(mask.reduce((acc, v) => { return acc.concat([v * 255,v * 255] as any) }, []));
    const texture = new DataTexture(data, width, height, RGFormat, UnsignedByteType);

    texture.flipY = true;
    texture.wrapS = ClampToEdgeWrapping;
    texture.wrapT = ClampToEdgeWrapping;
    texture.generateMipmaps = false;

    texture.magFilter = LinearFilter;
    texture.minFilter = LinearFilter;

    texture.needsUpdate = true


    const material = new MeshBasicMaterial( {color: 0x000000, alphaMap: texture, side: DoubleSide, transparent: true, opacity:1} );
    const plane = new PlaneGeometry(50, 50, 10, 10);
    plane.rotateX((Math.PI/180) * 90)
    const mesh = new Mesh(plane, material);


    return mesh;  
  }

  public async create(def: IFogOfWarComposerDefinition): Promise<FogOfWarObject> {
    const texture = await this._assetsLoader.loadAsync({ fileName: "radial-alpha-map",ext: "jpg" })
    const object = await FogOfWarFactory.build(texture);
    return new FogOfWarObject(object);
  }

  public async compose(def: IFogOfWarComposerDefinition): Promise<void> {
    const fog = await this.create(def);
    fog.setPosition(def.position)
    this._actorsManager.initializeObject(fog);
    def.isHandled = true;
  }

  public getRequiredAssetDefinitions(): IAssetDeclaration[] {
    return [];
  }

}