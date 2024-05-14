import { IHeroBuilderStep } from "@game-logic/gameplay/modules/heroes/builder/hero-builder.interface";
import { INarrationMedium } from "../../game-ui/mixins/narrative-medium/narrative-medium.interface";


export default interface IBuilderStep extends INarrationMedium, IHeroBuilderStep<unknown> {
  stepId: number;
  isFirstStep?: boolean;
  isLastStep?: boolean;
  isSelected?: boolean;
  fulfill(d: unknown): IBuilderStep;
}
