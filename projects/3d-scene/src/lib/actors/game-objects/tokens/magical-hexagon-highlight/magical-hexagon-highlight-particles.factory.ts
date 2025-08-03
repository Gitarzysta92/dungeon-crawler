import { AnimationService } from "../../../../animations/animation.service";
import { MagicalHexagonHighlightParticlesObject } from "./magical-hexagon-highlight-particles.game-object";

export class MagicalHexagonHighlightParticlesFactory {
  
  public static create(animationService: AnimationService): MagicalHexagonHighlightParticlesObject {
    return new MagicalHexagonHighlightParticlesObject(animationService);
  }

  public static async build(animationService: AnimationService): Promise<MagicalHexagonHighlightParticlesObject> {
    return MagicalHexagonHighlightParticlesFactory.create(animationService);
  }
} 