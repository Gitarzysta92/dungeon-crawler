import { IHeroBuilderStep } from "@game-logic/gameplay/modules/heroes/builder/hero-builder.interface";
import { INarrationMedium } from "../../game-ui/entities/narrative-medium/narrative-medium.interface";
import { IVisualMedium } from "../../game-ui/entities/visual-medium/visual-medium.interface";


export default interface IBuilderStep extends INarrationMedium, IVisualMedium, IHeroBuilderStep<unknown> {
  stepIndex: number;
  isFirstStep?: boolean;
  isLastStep?: boolean;
}
