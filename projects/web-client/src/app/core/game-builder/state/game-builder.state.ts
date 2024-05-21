import { IState } from "@game-logic/lib/base/state/state.interface";
import { IGameBuilderState } from "../interfaces/builder-state.interface";
import IBuilderStep from "../interfaces/builder-step.interface";
import { IUiData } from "../../game-ui/mixins/ui-medium/ui-medium.interface";
import { IHero } from "@game-logic/gameplay/modules/heroes/mixins/hero/hero.interface";
import { EntityService } from "@game-logic/lib/base/entity/entity.service";
import { INarrativeMedium } from "../../game-ui/mixins/narrative-medium/narrative-medium.interface";
import { IAdventureMap } from "@game-logic/gameplay/modules/adventure/mixins/adventure-map/adventure-map.interface";

export class GameBuilderState implements IState, IGameBuilderState {

  get currentStepId() { return this.currentStep.stepId }
  get currentStep() { return this.steps.find(s => s.isSelected) };
  get isFinished() { return this.steps.every(s => s.isFulfilled) };
  get isLastStep() { return this.currentStep.isLastStep };
  get nextStep() { return this.steps[this.steps.indexOf(this.currentStep) + 1] };
  get prevStep() { return this.steps[this.steps.indexOf(this.currentStep) - 1] }

  constructor(
    public readonly hero: IHero,
    public readonly steps: IBuilderStep[],
    public readonly adventure: IAdventureMap,
    public readonly entityService: EntityService
  ) { 
    steps.forEach((s, i) => {
      s.isSelected = s.isFirstStep = i === 0;
      s.isLastStep = i === steps.length - 1;
    })
  }

  public getStep(index: number): IBuilderStep {
    return this.steps.find(s => s.stepId == index);
  }
}

export class PickerStep implements IBuilderStep {
  stepName: string;
  stepId: number;
  items: Array<{ isSelected: boolean } & INarrativeMedium & unknown>;
  segmentName: string;
  narrative: { name: string; description: string; };
  isNarrationMedium: true;
  isMixin: true;
  uiData: IUiData;
  isUiMedium: true;
  isSelected: boolean = false;
  isFirstStep?: boolean;
  isLastStep?: boolean;

  get isFulfilled() { return this.items.some(i => i.isSelected) };
  get selectedItem() { return this.items.find(i => i.isSelected) };
  get selectionName() { return this.items.find(i => i.isSelected)?.narrative?.name }

  constructor(data: Omit<IBuilderStep, 'isFulfilled' | 'fulfill'>) {
    Object.assign(this, data);
  }

  public fulfill(pickedItem: { isSelected: boolean } & unknown): IBuilderStep {
    for (let item of this.items) {
      item.isSelected = false;
      if (item === pickedItem) {
        item.isSelected = true;
      }
    }
    return this;
  }
}

export class FormStep<T extends object = {}> implements IBuilderStep {
  stepId: number;
  data: T = {} as T
  items: { isSelected: boolean; }[];
  segmentName: string;
  narrative: { name: string; description: string; };
  isNarrationMedium: true;
  isMixin: true;
  uiData: IUiData;
  visual: { ui?: IUiData; scene?: null; };
  isUiMedium: true;
  stepName: string;
  isFirstStep?: boolean;
  isLastStep?: boolean;
  selectionPropertyName: string;

  get selectionName() { return this.data[this.selectionPropertyName] }
  
  get isFulfilled() { return Object.values(this.data).every(v => !!v)};
  selectedItem = false;

   constructor(data: Omit<IBuilderStep, 'items' | 'isFulfilled' | 'fulfill'> & { data: { [key: string]: unknown }, selectionPropertyName: string }) {
    Object.assign(this, data);
  }


  public fulfill(data: unknown): IBuilderStep {
    Object.assign(this.data, data);
    return this;
  }
}