import { CircleGeometry, InstancedMesh, MeshLambertMaterial, Vector2 } from "three";
import { ActorsManager } from "../../actors/actors-manager";
import { Observable, filter, map } from "rxjs";
import { PointerHandler } from "../../interactions/pointer/pointer-handler";
import { getNormalizedCoordinates } from "../../utils/utils";
import { hexagonGridDefinitionName } from "./hexagon-grid.constants";
import { HaxagonGridObject } from "../../actors/game-objects/terrains/hexagon-grid/hexagon-grid.game-object";
import { AnimationService } from "../../animations/animation.service";
import { IHexagonGridFieldDeclaration } from "../../actors/game-objects/terrains/hexagon-grid/hexagon-grid.interface";
import { IRawVector3 } from "../../extensions/types/raw-vector3";
import { ISceneComposerHandler } from "../../helpers/scene-composer/scene-composer.interface";


export class HexagonGridComponent implements ISceneComposerHandler<typeof hexagonGridDefinitionName, any> {
  
  private _grid: HaxagonGridObject | undefined;

  constructor(
    private readonly _actorsManager: ActorsManager,
    private readonly _pointerHandler: PointerHandler,
    private readonly _animationService: AnimationService
  ) { }


  public validateComposer(defName: string): boolean {
    return defName === hexagonGridDefinitionName;
  }


  public async compose(dec: IHexagonGridFieldDeclaration & any): Promise<void> {
    if (!this._grid) {
      this._grid = this._createGrid(dec.radius);
      this._actorsManager.initializeObject(this._grid);
    }

    Object.assign(dec, { defaultColor: dec.color });
    Object.assign(dec, { highlightColor: 0x6699cc });
    Object.assign(dec, { selectColor: 0x6699cc });
    Object.assign(dec, { hoverColor: 0xca4926 });

    this._grid.createField(dec);

    dec.isHandled = true
  }


  public initializeFieldHovering(inputs: Observable<PointerEvent>) {
    let prevInstanceId: number | null = null;
    const v = new Vector2()
    inputs.pipe(filter(e => e.type === 'mousemove'))
      .pipe(
        map(e => this._pointerHandler.intersect(getNormalizedCoordinates(e.clientX, e.clientY, v))
          .find(i => i.object === this._grid as any)),
      )
      .subscribe(i => {
        this._handleHovering(i?.instanceId, prevInstanceId);
        prevInstanceId = i?.instanceId ?? null
      })
  }


  public settleHovering() {
    this._grid?.settle()
  }


  private _createGrid(r: number) {
    const g = new CircleGeometry(r, 6);
    g.rotateX(-Math.PI / 2);
    g.rotateY(0.525)
    const m = new MeshLambertMaterial();
    const mesh = new InstancedMesh(g, m, 100);
    return new HaxagonGridObject(mesh, this._animationService)
  }


  private _handleHovering(instanceId: number | undefined, prevInstanceId: number | null): void {
    if (instanceId == null) {
      document.body.style.cursor = "auto";
    }
    if (instanceId === prevInstanceId) {
      return
    }
    if (prevInstanceId != null && this._grid && this._grid.defs[prevInstanceId]) {
      const mediumRef = this._grid.defs[prevInstanceId].userData.getMediumRef();
      mediumRef.isHovered = false;
    }
    if (instanceId != null && this._grid && this._grid.defs[instanceId]) {
      document.body.style.cursor = "pointer";
      const mediumRef = this._grid.defs[instanceId].userData.getMediumRef();
      mediumRef.isHovered = true;
    }
  }

  
  public getFieldPosition(auxCoords: string): IRawVector3 | undefined { 
    return this._grid?.getField(auxCoords)?.position;
  }


  initializeTokenHovering(allowedActorIds: string[]) {
    throw new Error("Method not implemented.");
  }

  getTargetedToken(x: number, y: number): any {
    throw new Error("Method not implemented.");
  }

  getToken(id: string): any {
    throw new Error("Method not implemented.");
  }

  disableHovering() {
    throw new Error("Method not implemented.");
  }

  getField(id: string): any {
    throw new Error("Method not implemented.");
  }

  getTargetedField(x: number, y: number): any {
    throw new Error("Method not implemented.");
  }

}



// const matrix = new Matrix4();
// fields.forEach((f, i) => {
//   matrix.setPosition(f.position.x, 0.1, f.position.z);
//   mesh.setMatrixAt(i, matrix);
//   mesh.setColorAt(i, new Color("white"))
// })
// mesh.position.setY(0.1);
// mesh.instanceMatrix.needsUpdate = true;
// mesh.material.needsUpdate = true;
// this._actorsManager.addObject(mesh);


// public getIndex(position: IRawVector3) {
//   return this.defs.findIndex(d => {
//     return new Vector3(position.x, position.y, position.z).equals(d.position)
//   })
// }

// public getFieldByScreenCoords(x: number, y: number): any | undefined {
//   const mc = new Vector2();
//   const instanceId = this._pointerHandler.intersect(getNormalizedMouseCoordinates2(x, y, mc))
//   .find(i => i.object instanceof HexagonalPlainsObject)?.instanceId as any;
//   return   { instanceId, ...this.defs[instanceId] };
// }


// public getFieldPosition(p: IRawVector3): IRawVector3 { 
//   let offsetX = 0
//   offsetX = 0;
//   if (p.z % 2) {
//     offsetX += 0.5
//   }
//   return Object.assign(p, {
//     x: (p.x + offsetX) * this._fieldSpanMultiplayerX,
//     y: p.y,
//     z: p.z * this._fieldSpanMultiplayerZ
//   })
// }