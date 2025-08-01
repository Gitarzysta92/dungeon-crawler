import { Camera, Mesh, MeshBasicMaterial, PlaneGeometry, Renderer, Vector3 } from "three";
import { ActorsManager } from "../../actors/actors-manager";

export class SceneScaleComponent {
  private _measurementPlane!: Mesh<PlaneGeometry, MeshBasicMaterial>;
  private _v = new Vector3(1, 1, 0);
  private _b = new Vector3(-1, 1, 0);
  
  constructor(
    private readonly _actorsManager: ActorsManager
  ) {}

  public initialize() {
    this._measurementPlane = new Mesh(new PlaneGeometry(2, 2), new MeshBasicMaterial());
    this._measurementPlane.visible = false;
    this._actorsManager.addObject(this._measurementPlane);
  }

  public getSceneScale(camera: Camera, renderer: Renderer): number {
    this._v.set(1, 1, 0);
    this._b.set(-1, 1, 0);
    camera.updateMatrixWorld();
    this._measurementPlane.lookAt(camera.position);
    this._measurementPlane.localToWorld(this._v);
    this._measurementPlane.localToWorld(this._b);
    this._v.project(camera);
    this._b.project(camera);
    return Math.abs(
      Math.round((this._b.x + 1) * renderer.domElement.offsetWidth / 2) -
        Math.round((this._v.x + 1) * renderer.domElement.offsetWidth / 2)
    );
  };
  
}




// const update = () => {
    
// }

// return this.initialized$
//   .pipe(
//     switchMap(() =>
//       merge(
//         fromEvent(this._scene.controls, 'change'),
//         this.viewportChanged$,
//         of(null)
//       ), 
//     ),
//     map(() => update())
//   )