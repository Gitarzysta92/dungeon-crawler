import { IState } from "@game-logic/lib/base/state/state.interface";
import { IGameBuilderState } from "../interfaces/builder-state.interface";
import IBuilderStep from "../interfaces/builder-step.interface";
import { IVisualUiData } from "../../game-ui/entities/visual-medium/visual-medium.interface";
import { IHero } from "@game-logic/gameplay/modules/heroes/entities/hero/hero.interface";
import { IAdventureTemplate } from "@game-logic/gameplay/modules/adventure/adventure.interface";
import { EntityService } from "@game-logic/lib/base/entity/entity.service";

export class GameBuilderState implements IState, IGameBuilderState {
  prevState: object;
  currentStepIndex: number = 0;
  get currentStep() { return this.steps[this.currentStepIndex] };
  get isFinished() { return this.steps.every(s => s.isFulfilled) };

  constructor(
    public readonly hero: IHero,
    public readonly steps: IBuilderStep[],
    public readonly adventure: IAdventureTemplate,
    public readonly entityService: EntityService
  ) { }
}

export class PickerStep implements IBuilderStep {
  stepName: string;
  stepIndex: number;
  items: Array<{ isSelected: boolean, isDefault: boolean } & unknown>;
  segmentName: string;
  narrative: { name: string; description: string; };
  isNarrationMedium: true;
  isMixin: true;
  visual: { ui?: IVisualUiData; scene?: null; };
  isVisualMedium: true;
  isSelected: boolean = false;

  get isFulfilled() { return this.items.some(i => i.isSelected) };
  get selectedItem() { return this.items.find(i => i.isSelected || i.isDefault) }

  constructor(data: Omit<IBuilderStep, 'isFulfilled'>) {
    Object.assign(this, data);
  }

  public fulfill(pickedItem: { isSelected: boolean } & unknown): void {
    for (let item of this.items) {
      item.isSelected = false;
      if (item === pickedItem) {
        item.isSelected = true;
      }
    }
  }
}

export class FormStep implements IBuilderStep {
  stepIndex: number;
  data: { [key: string]: unknown }
  segmentName: string;
  narrative: { name: string; description: string; };
  isNarrationMedium: true;
  isMixin: true;
  visual: { ui?: IVisualUiData; scene?: null; };
  isVisualMedium: true;
  stepName: string;
  
  get isFulfilled() { return Object.values(this.data).every(v => !!v)};
  selectedItem = false;

   constructor(data: Omit<IBuilderStep, 'items' | 'isFulfilled'> & { data: { [key: string]: unknown } }) {
    Object.assign(this, data);
  }
  items: { isSelected: boolean; }[];


  public fulfill(pickedItem: { isSelected: boolean } & unknown): void {
    for (let item of this.items) {
      item.isSelected = false;
      if (item === pickedItem) {
        item.isSelected = true;
      }
    }
  }
}