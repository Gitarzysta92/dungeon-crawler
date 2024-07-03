import { AxesHelper, Color, ColorRepresentation, Fog, PerspectiveCamera, Scene as ThreeJsScene, Vector3 } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { ISceneConfig } from "../components/scene/scene.interface";


export class SceneWrapper {
  
  constructor(
    public readonly scene: ThreeJsScene,
    public readonly camera: PerspectiveCamera,
    public readonly controls: OrbitControls,
    public readonly canvasRef: HTMLElement,
    public readonly width: number,
    public readonly height: number
  ) { }

  public initialize(cfg?: Partial<ISceneConfig>): void {
    this._setupScene(cfg?.bgColor ?? 0x000000, cfg?.fogColor ?? 0x000000);
    this._setupCamera(cfg?.initialCameraPosition || new Vector3(25, 20, 0), this.width, this.height);
    this._setupControls(this.canvasRef);
    //this._setupHelpers();
  }

  public adjustToViewportChange(width: number, height: number) {
    this.camera.aspect = this._calculateAspect(width, height);
    this.camera.updateProjectionMatrix();
  }

  public disableFloatingCamera(): void {
    this.controls.enableRotate = false;
    this.controls.enableZoom = false;
  }

  public enableFloatingCamera(): void {
    this.controls.enableRotate = true;
    this.controls.enableZoom = true;
  }

  private _setupScene(
    bgColor: ColorRepresentation,
    fogColor?: ColorRepresentation
  ): void {
    this.scene.background = new Color(bgColor);
		fogColor && (this.scene.fog = new Fog(fogColor, 100, 200)); 
  }

  private _setupCamera(
    cameraPosition: Vector3,
    width: number, 
    height: number
  ): void {
    this.camera.fov = 20;
    this.camera.aspect = this._calculateAspect(width, height);
    this.camera.near = 1;
    this.camera.far = 400;
    const { x, y, z } = cameraPosition;
    this.camera.position.set(x, y, z);
    this.camera.lookAt(new Vector3(0,0,0))
    this.scene.add(this.camera);
    this.adjustToViewportChange(width, height);
  }

  private _setupControls(canvasRef: HTMLElement): void {
    //this.controls.maxPolarAngle = Math.PI / 180 * 60;
    //this.controls.minPolarAngle = Math.PI / 180 * 30;
    this.controls.minDistance = 2;
    this.controls.maxDistance = 1135;
    this.controls.dampingFactor = 0.05;
    this.controls.screenSpacePanning = true;
    this.controls.enablePan = true;
  }

  private _setupHelpers(): void {
    const axesHelper = new AxesHelper(10);
    this.scene.add(axesHelper);
    this.camera.add(axesHelper);
  }

  private _calculateAspect(width: number, height: number): number {
    return width / height;
  }
}