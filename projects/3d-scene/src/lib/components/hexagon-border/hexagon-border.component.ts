import { ActorsManager } from "../../actors/actors-manager";
import { HoveringService } from "../../behaviors/hoverable/hovering.service";
import { SceneComposer } from "../../helpers/scene-composer/scene-composer";
import { ISceneComposerHandler } from "../../helpers/scene-composer/scene-composer.interface";
import { PointerHandler } from "../../interactions/pointer/pointer-handler";
import { boardComposerDefinitionName } from "../board/board.constants";
import { IBoardComposerDefinition } from "../board/board.interface";
import { hexagonalPlainsFieldComposerDefinitionName } from "../../actors/game-objects/terrains/hexagonal-plains/hexagonal-plains.constants";
import { BufferGeometry, Mesh, PointsMaterial, Points, Shape, MeshPhongMaterial, ShapeGeometry, Path, DataTexture, Vector2, RepeatWrapping, RGFormat} from "three";
import { AnimationService } from "../../animations/animation.service";
import { Observable} from "rxjs";
import { OffscreenCanvasWrapper } from "../../utils/offscreen-canvas";
import { IRawVector2 } from "../../extensions/types/raw-vector2";
import { scaleVectorPath } from "../../utils/utils";


export class HexagonBordersComponent implements
  ISceneComposerHandler<typeof boardComposerDefinitionName | typeof hexagonalPlainsFieldComposerDefinitionName, IBoardComposerDefinition> {
  
  public definitionName = boardComposerDefinitionName;

  private readonly _fieldSpanMultiplayerX = 1.5;
  private readonly _fieldSpanMultiplayerZ = 1.75;

  private _canvasWidth = 100;
  private _canvasHeight = 100;
  private _scale = 10;
  private _offscreenCanvas!: OffscreenCanvasWrapper;
  
  constructor(
    private readonly _actorsManager: ActorsManager,
    private readonly _pointerHandler: PointerHandler,
    private readonly _hoverDispatcher: HoveringService,
    private readonly _sceneComposer: SceneComposer,
    private readonly _animationService: AnimationService,
    private readonly _inputs: Observable<PointerEvent>
  ) {  

  }

  public validateComposer(defName: string): boolean {
    return defName === "xyxz";
  }

  public async compose(def: any): Promise<void> {
    if (!this._offscreenCanvas) {
      this._offscreenCanvas = new OffscreenCanvasWrapper(this._canvasWidth, this._canvasHeight, this._scale);
      this._offscreenCanvas.initialize();
    }

    const map = new Map<string, IRawVector2>();
    let offsetX = 0;
    const r = 1;
    for (let d of def.fields) {
      offsetX = 0
      if (d.gridCoords.x % 2) {
        offsetX = 0.85
      }
      const cx = d.position.x = d.position.x * this._fieldSpanMultiplayerX;
      const cy = d.position.z = d.position.z * this._fieldSpanMultiplayerZ + offsetX;
      // d.points = createHexagonPoints(cx, cy, r);
    }

    // this._aggregateOuterSide(def.fields[0], map);
    const items = Array.from(map.values());
    this._createBorders(def, items);
    this._createFulfillment(items);

    def.isHandled = true;
  }

  private _createBorders(def: any, items: IRawVector2[]) {
    const innerItems = scaleVectorPath(items);

    const n = new Shape(items as Vector2[]);
    n.holes = [new Path(innerItems as Vector2[])]
    const geometry = new ShapeGeometry(n)
    const mesh = new Mesh(geometry, new MeshPhongMaterial({ color: 0xff00e4 }));
    this._actorsManager.addObject(mesh);
  }


  public _createFulfillment(items: IRawVector2[]) {
    const shapeData = this._drawAlphaMapShape(items);
    const textureData = new Uint8Array(this._canvasWidth * this._canvasHeight * 2)
    let j = 0;
    for (let i = 0; i < (this._canvasWidth * this._canvasHeight * 4); i += 4) {
      textureData[j] = 255 -shapeData[i+3]
      textureData[j+1] = 255 - shapeData[i+3]
      j += 2;
    }
    const texture = new DataTexture(textureData, this._canvasWidth, this._canvasHeight, RGFormat);
    texture.wrapS = RepeatWrapping;
    texture.wrapT = RepeatWrapping;
    texture.repeat = new Vector2(0.1,0.1)
    texture.needsUpdate = true


    const n = new Shape(items as any);
    const geometry = new ShapeGeometry(n)
    const mesh = new Mesh(geometry, new MeshPhongMaterial({
      color: 0xff00e4, 
      alphaMap: texture, opacity: 1, transparent: true,
    }));
    this._actorsManager.addObject(mesh);
  }

  private _drawAlphaMapShape(items: IRawVector2[]) {
    this._offscreenCanvas.clear();
    const ctx = this._offscreenCanvas.ctx;
    ctx.filter = "blur(6px)"; 
    ctx.beginPath();
    const startPoint = this._offscreenCanvas.convertToCanvasCoordinates(items[0]);
    ctx.moveTo(startPoint.x, startPoint.y);
    for (let i = 1; i < items.length; i++) {
        const canvasPoint = this._offscreenCanvas.convertToCanvasCoordinates(items[i]);
        ctx.lineTo(canvasPoint.x, canvasPoint.y);
    }
    ctx.lineTo(startPoint.x, startPoint.y);
    ctx.closePath();
    ctx.fillStyle = "white";
    ctx.fill();
    return this._offscreenCanvas.getImageData()
  }


  private _displayDevelopmentHelpers(items: IRawVector2[], innerItems: IRawVector2[],  def: any, ) {
    const js = new BufferGeometry().setFromPoints(def.fields.reduce((acc: any, f: any) => acc.concat(f.points) ,[]).map((p: any) => ({ x: p.x, y: 0, z: p.y  })))
    this._actorsManager.addObject(new Points(js, new PointsMaterial({ color: 0x00ff0c, size: 0.30 })));

    const b = new BufferGeometry().setFromPoints(def.fields.map((f: any) => f.position))
    this._actorsManager.addObject(new Points(b, new PointsMaterial({ color: 0xffff00, size: 0.25 })));

    const jh = new BufferGeometry().setFromPoints(items.map((p: any) => ({ x: p.x, y: 0, z: p.y  })) as any)
    this._actorsManager.addObject(new Points(jh, new PointsMaterial({ color: 0x2020cb, size: 0.45 })));

    const j = new BufferGeometry().setFromPoints(innerItems.map((p: any) => ({ x: p.x, y: 0, z: p.y  })) as any)
    this._actorsManager.addObject(new Points(j, new PointsMaterial({ color: 0xff00e4, size: 0.45 })));
  }

}