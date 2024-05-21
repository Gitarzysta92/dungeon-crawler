import { IHeroBuilderStep } from "@game-logic/gameplay/modules/heroes/builder/hero-builder.interface";
import { INarrativeMedium } from "../../game-ui/mixins/narrative-medium/narrative-medium.interface";


export default interface IBuilderStep extends INarrativeMedium, IHeroBuilderStep<unknown> {
  stepId: number;
  isFirstStep?: boolean;
  isLastStep?: boolean;
  isSelected?: boolean;
  fulfill(d: unknown): IBuilderStep;
}
