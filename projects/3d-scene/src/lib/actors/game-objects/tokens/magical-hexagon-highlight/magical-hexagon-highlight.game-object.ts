import { Group, Mesh, Material, ShaderMaterial } from "three";
import { AnimationService } from "../../../../animations/animation.service";
import { TokenBase } from "../common/token-base.game-object";
import { IMagicalHexagonHighlightCreationDefinition } from "./magical-hexagon-highlight.interfaces";

export class MagicalHexagonHighlightObject extends TokenBase {
  public def: IMagicalHexagonHighlightCreationDefinition;
  private _objectGroup: Group;
  
  constructor(
    def: IMagicalHexagonHighlightCreationDefinition,
    object: Group,
    private readonly _animationService: AnimationService
  ) {
    super(def);
    this.def = def;
    this._objectGroup = object;
  }

  public afterEnteringScene(position: { x: number, y: number, z: number }, delay: number = 0): void {
    // Start shader animation
    this.startShaderAnimation();
  }

  private startShaderAnimation(): void {
    const mesh = this._objectGroup.children[0] as Mesh;
    const material = mesh?.material as ShaderMaterial;
    if (material && material.uniforms) {
      const startTime = Date.now() * 0.001;
      
      const animate = () => {
        const time = Date.now() * 0.001 - startTime;
        material.uniforms.time.value = time;
        requestAnimationFrame(animate);
      };
      
      animate();
    }
  }

  protected get _object(): Mesh & Partial<{ material: Material | Material[] }> {
    return this._objectGroup.children[0] as Mesh;
  }

  public dispose(): void {
    super.dispose();
  }

  public clone(): any {
    return new MagicalHexagonHighlightObject(this.def, this._objectGroup, this._animationService);
  }
} 