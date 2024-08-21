import { ActorsManager } from "../../actors/actors-manager";
import { Mesh, Shape, ShapeGeometry, Vector2, Path, Texture, sRGBEncoding, MeshPhongMaterial, NearestFilter } from "three";
import { OffscreenCanvasWrapper } from "../../utils/offscreen-canvas";
import { IRawVector2 } from "../../extensions/types/raw-vector2";
import { IAssetsProvider } from "../../assets/assets.interface";



export class HexagonTerrainComponent {
  
  private readonly _fieldSpanMultiplayerX = 1.5;
  private readonly _fieldSpanMultiplayerZ = 1.7;

  private _canvasWidth = 100;
  private _canvasHeight = 100;
  private _scale = 10;
  private _offscreenCanvas!: OffscreenCanvasWrapper;
  
  constructor(
    private readonly _actorsManager: ActorsManager,
    private readonly _assetsLoader: IAssetsProvider,
  ) { }

  public validateComposer(defName: string): boolean {
    return defName === "xyz";
  }

  public async compose(def: any): Promise<void> {
    this._createWorkingCanvas();

    let offsetX = 0;
    const r = 5;
    for (let d of def.fields) {
      offsetX = 0
      if (d.gridCoords.x % 2) {
        offsetX = 4.1
      }
      const cx = d.position.x = d.position.x * this._fieldSpanMultiplayerX * 5;
      const cy = d.position.z = d.position.z * this._fieldSpanMultiplayerZ * 5 + offsetX;
      //d.points = createHexagonPoints(cx, cy, r);
    }

    const waterMap = new Map<string, IRawVector2>(def.fields.map((f: any) => [f.key, f]));
    const waterOuterMap = new Map<string, IRawVector2>();
    const waterItems = Array.from(waterMap.values())
    //this._aggregateOuterSide(waterItems[0], waterMap, waterOuterMap);

    const groundMap = new Map<string, IRawVector2>(def.fields.filter((f: any) => f.height >= 0).map((f: any) => [f.key, f]));
    const groundOuterMap = new Map<string, IRawVector2>();
    const groundItems = Array.from(groundMap.values())
    //this._aggregateOuterSide(groundItems[0], groundMap, groundOuterMap);

    this._createWater(Array.from(groundOuterMap.values()), 0x101739);
    await this._createGround(Array.from(groundOuterMap.values()), 0x00ff0c);

    def.isHandled = true;
  }


  private _createWorkingCanvas() {
    if (!this._offscreenCanvas) {
      this._offscreenCanvas = new OffscreenCanvasWrapper(this._canvasWidth, this._canvasHeight, this._scale);
      this._offscreenCanvas.initialize();
    }
  }


  private async _createGround(items: IRawVector2[], color: any, innerItems?: IRawVector2[]) {
    const shape = new Shape();
    shape.moveTo(items[0].x, items[0].y)
    shape.splineThru(items as Vector2[])
    const geometry = new ShapeGeometry(shape);
    //this._recalculateUv(geometry);
    geometry.rotateX(-Math.PI / 2);


    const mapTexture = (await this._assetsLoader.loadAsync({ fileName: "map", ext: "jpg"})) as Texture;
    mapTexture.encoding = sRGBEncoding
    mapTexture.magFilter = NearestFilter;

    const heightMaptexture = (await this._assetsLoader.loadAsync({ fileName: "heigh-map", ext: "jpg"})) as Texture;
    heightMaptexture.magFilter = NearestFilter
    heightMaptexture.encoding = sRGBEncoding;
    const material = new MeshPhongMaterial({
      color: 0xffffff,
      map: mapTexture,
      normalMap: heightMaptexture,
      normalScale: new Vector2(1,1),
      transparent: true,
      specular: 0x000000
      //opacity: 1,
    });
    const mesh = new Mesh(geometry, material);
    mesh.receiveShadow = true;
    mesh.geometry.center()
    this._actorsManager.addObject(mesh);
  }

 
  private _createWater(innerItems: IRawVector2[], color: any) {
    const n = new Shape();
    n.ellipse(33.7,39.6, 50,50, 0, 2 * Math.PI, false, 0)
    const path = new Path();
    path.moveTo(innerItems[0].x, innerItems[0].y)
    path.splineThru(innerItems as Vector2[]);
    n.holes = [path];
    const geometry = new ShapeGeometry(n);
    geometry.rotateX(-Math.PI / 2);
    const mesh = new Mesh(geometry, new MeshPhongMaterial({ color: color }));
    mesh.geometry.center()
    mesh.receiveShadow = true;
    mesh.castShadow = true;
    this._actorsManager.addObject(mesh);
  }

}



// private async _createClouds() {
//   const x = new PlaneGeometry(20, 20, 1)
//   x.center()
//   x.rotateX(Math.PI / 2);
//   const mapTexture = (await this._assetsLoader.loadAsync("test-map", "jpg")) as Texture;
//   const material = new MeshBasicMaterial({
//     side: DoubleSide, alphaTest: 0.1,
//     alphaMap: mapTexture,
//     transparent: true,
//     opacity: 0
//   });
//   material.shadowSide = DoubleSide;
//   const mesh = new Mesh(x, material);
//   mesh.position.setY(10);
//   mesh.castShadow = true;
  
//   this._actorsManager.addObject(mesh);
// }