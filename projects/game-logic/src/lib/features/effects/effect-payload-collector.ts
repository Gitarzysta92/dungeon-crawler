import { DungeonState } from '../../game/dungeon-state';

import { ICollectableData, ICollectedData, ICollectedDataStep, IPayloadDefinition } from './effect-payload.interface';
import { IActor } from '../actors/actors.interface';
import { getPaylodDefinition } from './payload-definition';
import { IEffectDefinition, IEffectPayload } from './payload-definition.interface';
import { IEffect } from './resolve-effect.interface';
import { GatheringStepDataName } from './effect-payload-collector.constants';

export class EffectPayloadCollector {

  public effect!: IEffect;
  public get payloadDefinitions() {
    return this._payloadDefinition ?
      [this._payloadDefinition, ...this._nestedPayloadDefinitions] :
      this._nestedPayloadDefinitions
  };
  public get dataToCollect() { return [...this._preparationData, ...this._collectingData] };
  public get isCompleted() { return this._checkIsCompleted() };
  public set isCompleted(v: boolean) { this._forcedCompletion = v }

  private _payloadDefinition: IPayloadDefinition | undefined;
  private _nestedPayloadDefinitions: IPayloadDefinition[] = [];
  private _preparationData: ICollectedData[] = [];
  private _collectingData: ICollectedData[] = [];

  private _forcedCompletion: boolean = false;

  constructor(
    private readonly _state: DungeonState
  ) { }

  public initializeData(effectDefinition: IEffectDefinition): void {
    //TODO combine caster with inventory
    const payloadDefinition = getPaylodDefinition(
      effectDefinition,
      this._state.board,
      this._state.heroInventory,
      this._state.getAllEffects()
    );

    payloadDefinition.caster = effectDefinition.caster;
    this._payloadDefinition = payloadDefinition;
    const { preparationData, collectingData } = this._initializeDefinition(payloadDefinition);
    this._preparationData = this._preparationData.concat(preparationData);
    this._collectingData = this._collectingData.concat(collectingData);
    this.effect = effectDefinition.effect;
  }


  public getDataTypeToCollect(): ICollectedDataStep & ICollectableData {
    const definition = this._getResolvablePayloadDefinition();
    const dataToCollect = this._collectingData.find(cd => !cd.isCompleted);
    const step = dataToCollect?.steps.find(s => s.payload == null);

    if (!step || !dataToCollect || !definition) {
      throw new Error("There is no data to collect, all required data is collected.");
    }

    if (definition.nestedDefinitionFactory && this._preparationData.every(pd => pd.isCompleted)) {
      this._initializeNestedDefinitions(definition);
    }

    return this._createCollectingDataType(dataToCollect, step, definition)
  }


  public collectData(data: ICollectableData, payload: ICollectedDataStep['payload']): void {
    const definition = this._getResolvablePayloadDefinition();
    if (!definition) {
      throw new Error(`There is no data to collect, all required data is collected.`)
    }

    const collectedData = this._collectingData
      .find(cd => cd.effect.id === definition.effect.id && !cd.isCompleted);
    if (!collectedData) {
      throw new Error("Cannot find collected data associated with given definition");
    }
    
    const step = collectedData.steps.find(s => s.dataName === data.dataName)!;
    step.payload = payload;
    step.attemptWasMade = true;
    
    this._tryCompleteCollectedData(collectedData);
  }


  public generatePayload(): IEffectPayload {
    return {
      effect: this.effect,
      effectName: this.effect.effectName,
      caster: this._payloadDefinition?.caster,
      payload: this._collectingData.map(d =>
        Object.fromEntries(Object.values(d.steps).map(g => [g.dataName, g.payload])))
    } as IEffectPayload
  }

  private _tryCompleteCollectedData(cd: ICollectedData): void {
    if (cd.steps.every(s => s.attemptWasMade)) {
      cd.isCompleted = true
    }
  }

  private _checkIsCompleted(): boolean {
    return !this._getResolvablePayloadDefinition() || this._forcedCompletion;
  }


  private _getResolvablePayloadDefinition(): IPayloadDefinition | undefined {
    return this.payloadDefinitions.find(d => {
      const targets = this._collectingData.filter(cd => cd.effect.id === d.effect.id && cd.isCompleted);
      return targets.length < (d.amountOfTargets ?? 1) || d.nestedDefinitionFactory;
    })
  }


  private _createCollectedData(effect: IEffect, steps: ICollectableData[]): ICollectedData {
    const collectedData = {
      index: this._collectingData.length,
      effect: effect,
      steps: steps.map(gs => Object.assign(gs, {
        collectedDataIndex: this._collectingData.length,
        effectId: effect.id,
        attemptWasMade: !!gs.payload
      })),
      isCompleted: false
    }
    return collectedData;
  }


  private _createCollectingDataType(
    collectedData: ICollectedData,
    step: ICollectedDataStep,
    definition: IPayloadDefinition
  ): ICollectedDataStep & ICollectableData {
    
    const stepDefinition = [
      ...(definition.preparationSteps || []),
      ...(definition.gatheringSteps || [])
    ].find(d => d.dataName === step.dataName && d.effectId === collectedData.effect.id);

    const tempStep = Object.assign(step, stepDefinition);

    tempStep.prev = collectedData.steps.slice(0, collectedData.steps.indexOf(step));

    if (tempStep.dataName === GatheringStepDataName.Actor && !tempStep?.possibleActors && tempStep?.possibleActorsResolver) {
      const gatheredActorIds = this._collectingData.reduce((acc, curr) => {
        return acc.concat(curr.steps
          .filter(gs => gs.dataName === GatheringStepDataName.Actor&& !!gs.payload)
          .map(gs => (gs.payload as IActor).id))
      }, [] as string[]);
      tempStep.possibleActors = tempStep.possibleActorsResolver(tempStep.prev)
        .filter(a => !gatheredActorIds.includes(a.id));;
    }

    if (tempStep.dataName === GatheringStepDataName.Origin && !tempStep?.possibleOrigins && tempStep?.possibleOriginsResolver) {
      tempStep.possibleOrigins = tempStep.possibleOriginsResolver(tempStep.prev);
    }

    if (tempStep.dataName === GatheringStepDataName.Field && !tempStep?.possibleFields && tempStep?.possibleFieldsResolver) {
      const gatheredFieldIds = this._collectingData.reduce((acc, curr) => {
        return acc.concat(curr.steps
          .filter(gs => gs.dataName === GatheringStepDataName.Field && !!gs.payload)
          .map(gs => (gs.payload as IActor).id))
      }, [] as string[]);
      tempStep.possibleFields = tempStep.possibleFieldsResolver(tempStep.prev)
        .filter(a => !gatheredFieldIds.includes(a.id))
    }

    if (tempStep.dataName === GatheringStepDataName.Effect && !tempStep?.possibleEffects && tempStep?.possibleEffectsResolver) {
      tempStep.possibleEffects = tempStep.possibleEffectsResolver(tempStep.prev);
    }

    return tempStep;
  }


  private _initializeNestedDefinitions(definition: IPayloadDefinition): void {
    for (let pd of this._preparationData) {
      if (!definition.nestedDefinitionFactory) {
        continue;
      }
      const nestedDefinition = definition.nestedDefinitionFactory(pd);
      const { preparationData, collectingData } = this._initializeDefinition(nestedDefinition);
      this._preparationData = this._preparationData.concat(preparationData);
      this._collectingData = this._collectingData.concat(collectingData);
      this._nestedPayloadDefinitions.push(nestedDefinition);
      delete definition.nestedDefinitionFactory;
    }
  }


  private _initializeDefinition(payloadDefinition: IPayloadDefinition): { preparationData: ICollectedData[], collectingData: ICollectedData[] } {
    const { preparationSteps, amountOfTargets, gatheringSteps, effect } = payloadDefinition;

    let preparationData: ICollectedData[] = [];
    if (Array.isArray(preparationSteps)) {
      if (!!amountOfTargets) {
        preparationData = Array.from({ length: amountOfTargets }, () => this._createCollectedData(effect, preparationSteps));
      } else {
        preparationData = [this._createCollectedData(effect, preparationSteps)];
      }
      preparationData.forEach(pd => this._tryCompleteCollectedData(pd));
    }

    if (!Array.isArray(gatheringSteps) && !payloadDefinition.nestedDefinitionFactory) {
      throw new Error("GatheringSteps or nestedDefinitionFactory must be provided");
    }

    if (Array.isArray(gatheringSteps) && payloadDefinition.nestedDefinitionFactory) {
      throw new Error('Using gatheringSteps together with nested definition is not supported');
    }

    let collectingData: ICollectedData[]  = [];
    if (Array.isArray(gatheringSteps)) {
     
      if (preparationData.length > 0) {
        collectingData = Array.from({ length: preparationData.length }, () => this._createCollectedData(effect, gatheringSteps));
      } else if(!!amountOfTargets) {
        collectingData = Array.from({ length: amountOfTargets }, () => this._createCollectedData(effect, gatheringSteps));
      } else {
        collectingData = [this._createCollectedData(effect, gatheringSteps)];
      }
      collectingData.forEach(cd => this._tryCompleteCollectedData(cd));
    }
    return { preparationData, collectingData }
  }

}