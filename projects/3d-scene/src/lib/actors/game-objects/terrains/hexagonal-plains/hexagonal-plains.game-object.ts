import { InstancedMesh, Vector3, BufferGeometry, MeshLambertMaterial, Matrix4, Mesh, Shape, Vector2, ShapeGeometry, MeshBasicMaterial, DoubleSide, PointsMaterial, Points, BufferAttribute, Camera, Color } from "three";
import { ActorBase } from "../../../actor-base";
import { IAfterEnteredScene } from "../../../actor-lifecycle.interface";
import { IAnimatable } from "../../../../animations/animations.interface";
import { AnimationService } from "../../../../animations/animation.service";
import * as TWEEN from '@tweenjs/tween.js'
import { TweenAnimation } from "../../../../animations/tween-animation.task";
import { IRawVector3 } from "../../../../extensions/types/raw-vector3";
import { IHexagonalPlainsFieldDefinition } from "./hexagonal-plains.interface";
import { IActor } from "../../../actor.interface";
import { IAssignable } from "../../fields/common/field.interface";
import { IHighlightable } from "../../../../behaviors/highlightable/highlightable.interface";
import { ISelectable } from "../../../../behaviors/selectable/selectable.interface";
import { StrategyStackV2 } from "../../../../utils/strategy-stack/strategy-stack";
import { IHoverable } from "../../../../behaviors/hoverable/hoverable.interface";

export class HexagonalPlainsObject extends ActorBase implements IAfterEnteredScene, IAnimatable, IHighlightable, ISelectable, IHoverable {

  
  protected _object!: InstancedMesh<BufferGeometry, MeshLambertMaterial>;
  public get object() { return this._object };
  public get animationSubject() { return this._object };

  private _defs: (IHexagonalPlainsFieldDefinition & IActor & { interactionStack: StrategyStackV2 })[] = [];
  private _matrix = new Matrix4();
  private _initialYOffset: number = -5;

  constructor(
    public readonly mesh: InstancedMesh<BufferGeometry, MeshLambertMaterial>,
    private readonly _animationService: AnimationService
  ) {
    super({ auxId: "", auxCoords: "" });
    this._object = mesh;
  }

  isHoverable = true;
  isHovered = false;
  hoverDelegate = ({ auxId, hover }: any) => {
    this.mesh.setColorAt(this._defs.findIndex(d => d.auxId === auxId), hover);
    this.mesh.instanceColor && (this.mesh.instanceColor.needsUpdate = true);
  };
  public hover(auxId: string): void {
    const def = this._defs.find(d => d.auxId === auxId);
    def?.interactionStack.addItem(this.hoverDelegate);
  };

  public settle(auxId: string): void {
    const def = this._defs.find(d => d.auxId === auxId);
    def?.interactionStack.removeItem(this.hoverDelegate);
  };


  isHighlightable = true as const;
  isHighlighted = false;
  highlightDelegate = ({ auxId, highlight }: any) => {
    this.mesh.setColorAt(this._defs.findIndex(d => d.auxId === auxId), highlight);
    this.mesh.instanceColor && (this.mesh.instanceColor.needsUpdate = true);
  };
  public highlight(auxId: string): void {
    const def = this._defs.find(d => d.auxId === auxId);
    def?.interactionStack.addItem(this.highlightDelegate);
  };

  public unHighlight(auxId: string): void {
    const def = this._defs.find(d => d.auxId === auxId);
    def?.interactionStack.removeItem(this.highlightDelegate);
  };


  isSelectable = true as const;
  isSelected = false;
  selectDelegate = ({ auxId, select }: any) => {
    this.mesh.setColorAt(this._defs.findIndex(d => d.auxId === auxId), select);
    this.mesh.instanceColor && (this.mesh.instanceColor.needsUpdate = true);
  }
  public select(auxId: string): void {
    const def = this._defs.find(d => d.auxId === auxId);
    def?.interactionStack.removeItem(this.selectDelegate);
  }

  public deselect(auxId: string): void {
    const def = this._defs.find(d => d.auxId === auxId);
    def?.interactionStack.removeItem(this.selectDelegate);
  }

  defaultColorDelegate = ({ auxId, defaultC }: any) => {
    this.mesh.setColorAt(this._defs.findIndex(d => d.auxId === auxId), defaultC);
    this.mesh.instanceColor && (this.mesh.instanceColor.needsUpdate = true);
  }

  public init(): InstancedMesh<BufferGeometry, MeshLambertMaterial> {
    //this._object.castShadow = true;
    this._object.receiveShadow = true;

    const mesh = super.init();
    return mesh as InstancedMesh<BufferGeometry, MeshLambertMaterial>;
  }

  public registerDefs(defs: Array<IHexagonalPlainsFieldDefinition & IActor>): void {
    for (let def of defs) {
      if (this._defs.includes(def as any)) {
        continue;
      }

      Object.assign(def, {
        interactionStack: new StrategyStackV2(this.defaultColorDelegate, {
          auxId: def.auxId,
          defaultC: new Color(def.defaultColor),
          highlight: new Color(def.highlightColor),
          select: new Color(def.selectColor),
          hover: new Color(def.hoverColor)
        })
      })

      this._defs.push(def as any);
    }
  }

  public matchId(id: string): boolean {
    return this._defs.some(d => d.auxId === id) || super.matchId(id);  
  }

  public matchAuxCoords(coords: string): boolean {
    return this._defs.some(d => d.auxCoords === coords); 
  }

  public takeBy(o: IAssignable, id: string): { coords: Vector3 } | undefined {
    const def = this._defs.find(d => d.auxCoords === id)
    if (def) {
      o.takenFieldId = id;
      this.mesh.getMatrixAt(this._defs.indexOf(def), this._matrix)
      const coords = new Vector3().setFromMatrixPosition(this._matrix);
      if (this.mesh.geometry.boundingBox?.max) {
        coords.y = this.mesh.geometry.boundingBox.max.y;
      } else {
        coords.y = this.mesh.position.y;
      }
      return { coords };
    }
  }

  public getViewportCoords(camera: Camera, offsetY: number, auxCoords: string): Vector3 {
    const d = this._defs.findIndex(d => d.auxCoords === auxCoords);
    this.mesh.getMatrixAt(d, this._matrix);
    const v = new Vector3().setFromMatrixPosition(this._matrix);
    return v.setY(v.y + offsetY).project(camera)
  }

  public afterEnteringScene(targetPosition: Vector3): Promise<void> {
    const initialPosition = new Vector3(targetPosition.x, targetPosition.y + 0.3, targetPosition.z);
    this.setPosition(initialPosition, true);
    const animation = this._setupInitialAnimation(initialPosition, targetPosition);
    return this._animationService.animate(animation);
  }

  public getUserData<T = unknown>(index: number): T {
    return this._defs[index].userData as T
  }

  private _setupInitialAnimation(ip: IRawVector3, tp: IRawVector3): TweenAnimation<typeof this, IRawVector3 & { opacity: number }> {
    //this.object.material.opacity = 0;
    //this.object.material.transparent = true;
    const animation = new TweenAnimation<typeof this, IRawVector3 & { opacity: number }>(
      this,
      { from: Object.assign({ opacity: 0 }, ip), to: Object.assign({ opacity: 1 }, tp), animationTime: 1000 },
      TWEEN.Easing.Exponential.Out,
      p => {
        this.object.position.setY(p.y);
        //this.object.material.opacity = p.opacity;
      }, 
      true
    );
    //animation.onFinish(() => this.object.material.transparent = false);
    return animation;
  }

  public clone() {
    return this;
  }
}