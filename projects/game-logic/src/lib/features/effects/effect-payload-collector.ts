import { DungeonState } from '../../game/dungeon-state';

import { ICollectableData, ICollectedData, ICollectedDataStep, IPayloadDefinition } from './effect-payload.interface';
import { IActor, IBasicStats } from '../actors/actors.interface';
import { getPaylodDefinition } from './payload-definition';
import { IEffectDefinition, IEffectPayload } from './payload-definition.interface';
import { IEffect } from './resolve-effect.interface';

export class EffectPayloadCollector {

  public effect!: IEffect;
  public get payloadDefinitions() { return this._payloadDefinitions; };
  public get dataToCollect() { return [...this._preparationData, ...this._collectingData] };
  public get isCompleted() { return this._checkIsCompleted() };
  public set isCompleted(v: boolean) { this._forcedCompletion = v }

  private _payloadDefinitions: IPayloadDefinition[] = [];
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
    this._initializeDefinition(payloadDefinition);
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


  public collectData(data: ICollectableData, payload: unknown | undefined): void {
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
    
    this._tryCompleteCollectedData(collectedData);
  }


  public generatePayload(): IEffectPayload {
    if (!!this._getResolvablePayloadDefinition()) {
      throw new Error('Not all data was collected');
    }
    return {
      effectId: this.effect.id,
      effectName: this.effect.effectName,
      payload: this._collectingData.map(d =>
        Object.fromEntries(Object.values(d.steps).map(g => [g.dataName, g.payload])))
    } as unknown as IEffectPayload
  }

  private _tryCompleteCollectedData(cd: ICollectedData): void {
    if (cd.steps.every(s => s.payload != null)) {
      cd.isCompleted = true
    }
  }

  private _checkIsCompleted(): boolean {
    return !this._getResolvablePayloadDefinition() || this._forcedCompletion;
  }


  private _getResolvablePayloadDefinition(): IPayloadDefinition | undefined {
    return this._payloadDefinitions.find(d => {
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
        effectId: effect.id
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

    const tempStep = Object.assign({ ...step }, stepDefinition);

    if (!tempStep?.possibleActors && tempStep?.possibleActorsResolver) {
      const gatheredActorIds = this._collectingData.reduce((acc, curr) => {
        return acc.concat(curr.steps
          .filter(gs => gs.dataName === 'actor' && !!gs.payload)
          .map(gs => (gs.payload as IActor).id))
      }, [] as string[]);
      tempStep.possibleActors = tempStep.possibleActorsResolver(step.prev).filter(a => !gatheredActorIds.includes(a.id));;
    }

    if (!tempStep?.possibleCasters && tempStep?.possibleCastersResolver) {
      tempStep.possibleActors = tempStep.possibleCastersResolver(step.prev);
    }

    if (!tempStep?.possibleFields && tempStep?.possibleFieldsResolver) {
      const gatheredFieldIds = this._collectingData.reduce((acc, curr) => {
        return acc.concat(curr.steps
          .filter(gs => gs.dataName === 'field' && !!gs.payload)
          .map(gs => (gs.payload as IActor).id))
      }, [] as string[]);
      tempStep.possibleFields = tempStep.possibleFieldsResolver(step.prev).filter(a => !gatheredFieldIds.includes(a.id))
    }

    if (!tempStep?.possibleFields && tempStep?.possibleEffectsResolver) {
      tempStep.possibleEffects = tempStep.possibleEffectsResolver(step.prev);
    }

    return tempStep;
  }


  private _initializeNestedDefinitions(definition: IPayloadDefinition): void {
    for (let pd of this._preparationData) {
      if (!definition.nestedDefinitionFactory) {
        continue;
      }
      const nestedDefinition = definition.nestedDefinitionFactory(pd);
      this._initializeDefinition(nestedDefinition)
    }
  }


  private _initializeDefinition(payloadDefinition: IPayloadDefinition): void {
    const { preparationSteps, amountOfTargets, gatheringSteps, effect } = payloadDefinition;

    if (Array.isArray(preparationSteps)) {
      let preparationData;
      if (!!amountOfTargets) {
        preparationData = new Array(amountOfTargets).map(() => this._createCollectedData(effect, preparationSteps))
      } else {
        preparationData = [this._createCollectedData(effect, preparationSteps)];
      }
      preparationData.forEach(pd => this._tryCompleteCollectedData(pd));
      this._preparationData = this._preparationData.concat(preparationData);
    }

    if (!Array.isArray(gatheringSteps) && !payloadDefinition.nestedDefinitionFactory) {
      throw new Error("GatheringSteps or nestedDefinitionFactory must be provided");
    }

    if (Array.isArray(gatheringSteps) && payloadDefinition.nestedDefinitionFactory) {
      throw new Error('Using gatheringSteps together with nested definition is not supported');
    }

    if (Array.isArray(gatheringSteps)) {
      let collectingData;
      if (this._preparationData.length > 0) {
        collectingData = new Array(this._preparationData.length).map(() => this._createCollectedData(effect, gatheringSteps))
      } else if(!!amountOfTargets) {
        collectingData = new Array(amountOfTargets).map(() => this._createCollectedData(effect, gatheringSteps))
      } else {
        collectingData = [this._createCollectedData(effect, gatheringSteps)]
      }
      collectingData.forEach(cd => this._tryCompleteCollectedData(cd));
      this._collectingData.concat(collectingData);
    }
    this._payloadDefinitions.push(payloadDefinition);
  }

}