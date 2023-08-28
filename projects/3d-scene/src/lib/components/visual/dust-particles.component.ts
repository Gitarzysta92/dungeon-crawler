import { filter, Observable } from "rxjs";
import { Vector3, InstancedMesh, Matrix4, Quaternion, Vector2, Sprite, Texture } from "three";
import { ActorsManager } from "../../actors/actors-manager";
import { GameObjectFactory } from "../../actors/game-objects.factory";
import { DustObject } from "../../actors/game-objects/dust.game-object";
import { FieldObject } from "../../actors/game-objects/field.game-object";
import { ParticlesObject } from "../../actors/game-objects/particles.game-object";
import { TileObject } from "../../actors/game-objects/tile.game-object";
import { AnimationDispatcher } from "../../behaviours/animations/animation.dispatcher";
import { PointerHandler } from "../../interactions/pointer/pointer-handler";
import { getNormalizedMouseCoordinates2 } from "../../utils/utils";


export class DustParticlesComponent { 
  private _count: number = 10;
  private _position: Vector3;
  private _quaternion: Quaternion;
  private _scale: Vector3;
  private _matrix: Matrix4;

  private _animating: boolean = false; 
  private _mc: Vector2 = new Vector2();
  private _particles!: ParticlesObject;
  private _dust!: DustObject;

  constructor(
    private readonly _actorsManager: ActorsManager,
    private readonly _animationDispatcher: AnimationDispatcher,
    private readonly _pointerHandler: PointerHandler,
    private readonly _pointerEvent$: Observable<PointerEvent>
  ) { 
    this._position = new Vector3();
    this._quaternion = new Quaternion();  
    this._scale = new Vector3();
    this._matrix = new Matrix4();
  }

  public async emitDust(x: number, y: number): Promise<void> {
    if (this._animating === true)
      return;
    
    y = y + (this._pointerHandler.getAngleAdjencedLength() / 3 );
    const intersections = this._pointerHandler.intersect(getNormalizedMouseCoordinates2(x - 20, y, this._mc));
    if (intersections.some(i => i.object instanceof FieldObject || i.object instanceof TileObject))
      return;
    
    const terrainPlain = this._actorsManager.getTerrain();
    const groundClick = intersections.find((i: any) => i.object === terrainPlain);
    if (!groundClick)
      return;
  
    this._animating = true;  

    this._particles.object.position.setX(groundClick.point.x);
    this._particles.object.position.setZ(groundClick.point.z);
    this._dust.object.position.setX(groundClick.point.x);
    this._dust.object.position.setZ(groundClick.point.z);

    this._dust.object.geometry.center();

    this._dust.object.visible = true;
    this._particles.object.visible = true;
    await this._animationDispatcher.animateDust(this._generateTargetCoords(), this._particles,  this._dust);
    this._particles.object.visible = false;
    this._dust.object.visible = false;
    this._particles.randomizePositions();
    this._animating = false;
  } 

  public initialize(texture: Texture, coords: Vector3, count?: number): void {
    this._particles = GameObjectFactory.createDisortedParticles({
      coords,
      count: count ?? this._count, 
    });
    this._actorsManager.initializeObject(this._particles) as InstancedMesh;
    this._particles.object.visible = false;

    this._dust = GameObjectFactory.createDust({ coords, texture });
    this._actorsManager.initializeObject(this._dust) as Sprite;

    this._pointerEvent$
      .pipe(filter(e => e.type === "click"))
      .subscribe(p => this.emitDust(p.clientX, p.clientY));
  }


  private _generateTargetCoords(): Vector3[] {
    const targetCoords = [];
    for (let i = 0; i <= this._count; i++) {
      this._particles.object.getMatrixAt(i, this._matrix);
      this._matrix.decompose(this._position, this._quaternion, this._scale);
      const v = new Vector3(
        Math.random() * 5 + this._position.x,
        this._position.y,
        Math.random() * 5 + this._position.z
      );

      targetCoords.push(v.clone())
    }
    return targetCoords;
  }

}