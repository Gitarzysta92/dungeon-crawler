import { Group, LineBasicMaterial, Vector3, BufferGeometry, Line } from "three";
import { ActorsManager } from "../../actors/actors-manager";
import { AnimationService } from "../../animations/animation.service";
import { IRawVector3 } from "../../extensions/types/raw-vector3";

export class PathIndicatorComponent {
  line: Line<BufferGeometry, LineBasicMaterial> | undefined;
  
  constructor(
    private readonly _actorsManager: ActorsManager,
    private readonly _animationService: AnimationService,
  ) {  }

  public showPathIndicators(segments: Array<{ position: IRawVector3, isDestination?: boolean, isOrigin?: boolean }>) {
    const group = new Group();
    const material = new LineBasicMaterial({ color: 0xffffff, linewidth: 10 });
    const points = segments.map(s => s.position as Vector3);
    const geometry = new BufferGeometry().setFromPoints(points);

    const line = new Line(geometry, material);
    this.line = line;
    line.position.setY(1);
    this._actorsManager.addObject(line);
  }

  public hidePathIndicators(from?: IRawVector3, to?: IRawVector3): void {
    this.line && this._actorsManager.removeObject(this.line)
  }
}