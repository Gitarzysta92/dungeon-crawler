import { INarrativeMedium } from "../../game-ui/mixins/narrative-medium/narrative-medium.interface";


export default interface IBuilderStep extends INarrativeMedium {
  stepId: number;
  isFirstStep?: boolean;
  isLastStep?: boolean;
  isSelected?: boolean;
  fulfill(d: unknown): IBuilderStep;
  items: Array<{ isSelected: boolean }>;
  isFulfilled: boolean;
  stepName: string;
}
