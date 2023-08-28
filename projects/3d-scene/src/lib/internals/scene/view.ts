import { AxesHelper, Color, ColorRepresentation, Fog, PerspectiveCamera, Scene, Vector3 } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export interface ViewConfig {
  bgColor: ColorRepresentation,
  fogColor: ColorRepresentation,
  initialCameraPosition?: Vector3,
  canvasRef: HTMLElement,
  width: number,
  height: number
}

export class View {

  public scene!: Scene;
  public camera!: PerspectiveCamera;
  public controls!: OrbitControls;

  constructor() { }

  public initialize(cfg: ViewConfig): void {
    this._setupScene(cfg.bgColor, cfg.fogColor);
    this._setupCamera(cfg.initialCameraPosition || new Vector3(-130, 130, 0), cfg.width, cfg.height);
    this._setupControls(cfg.canvasRef);
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
    fogColor: ColorRepresentation
  ): void {
    this.scene = new Scene();
    this.scene.background = new Color(bgColor);
		this.scene.fog = new Fog(fogColor, 100, 200); 
  }

  private _setupCamera(
    cameraPosition: Vector3,
    width: number, 
    height: number
  ): void {
    this.camera = new PerspectiveCamera();
    this.camera.fov = 20;
    this.camera.aspect = this._calculateAspect(width, height);
    this.camera.near = 0.1;
    this.camera.far = 500;
    const { x, y, z } = cameraPosition;
    this.camera.position.set(x, y, z);
    this.scene.add(this.camera);
    this.adjustToViewportChange(width, height);
  }

  private _setupControls(canvasRef: HTMLElement): void {
    this.controls = new OrbitControls(this.camera, canvasRef);
    this.controls.maxPolarAngle = Math.PI / 180 * 60;
    //this.controls.minPolarAngle = Math.PI / 180 * 30;
    this.controls.minDistance = 120;
    this.controls.maxDistance = 190;
    this.controls.dampingFactor = 0.05;
    this.controls.screenSpacePanning = false;
    this.controls.enablePan = false;
  }

  private _setupHelpers(): void {
    const axesHelper = new AxesHelper(10);
    //this.scene.add(axesHelper);
    this.camera.add(axesHelper);
  }

  private _calculateAspect(width: number, height: number): number {
    return width / height;
  }
}