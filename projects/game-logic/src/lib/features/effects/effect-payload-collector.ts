import { DungeonState } from '../../states/dungeon-state';

import { ICollectableDataDefinition, ICollectableData, ICollectedDataStep, IPayloadDefinition } from './effect-payload.interface';
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
  public get dataToCollect() { return this.collectableData.filter(d => !d.isCompleted) };
  public get collectedData() { return this.collectableData.filter(d => d.isCompleted) };
  public get collectableData() { return this._preparationData.concat(this._collectingData) };
  public get isCompleted() { return this._checkIsCompleted() };
  public set isCompleted(v: boolean) { this._forcedCompletion = v }

  private _payloadDefinition: IPayloadDefinition | undefined;
  private _nestedPayloadDefinitions: IPayloadDefinition[] = [];
  private _preparationData: ICollectableData[] = [];
  private _collectingData: ICollectableData[] = [];

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


  public getDataTypeToCollect(): ICollectedDataStep & ICollectableDataDefinition {
    const definition = this._getResolvablePayloadDefinition();
    if (!definition) {
      throw new Error("There is no definition to collect, all required data is collected.");
    }

    if (definition.nestedDefinitionFactory && this._preparationData.every(pd => pd.isCompleted)) {
      this._initializeNestedDefinitions(definition);
    }

    const dataToCollect = this.dataToCollect[0];
    const step = dataToCollect?.steps.find(s => s.payload == null);
    if (!step || !dataToCollect || !definition) {
      throw new Error("There is no data to collect, all required data is collected.");
    }

    return this._createCollectingDataType(dataToCollect, step, definition)
  }


  public collectData(data: ICollectableDataDefinition, payload: ICollectedDataStep['payload']): void {
    const definition = this._getResolvablePayloadDefinition();
    if (!definition) {
      throw new Error(`There is no data to collect, all required data is collected.`)
    }

    const collectedData = this.dataToCollect
      .find(cd => cd.effect.id === definition.effect.id);
    if (!collectedData) {
      throw new Error("Cannot find collected data associated with given definition");
    }
    
    const step = collectedData.steps.find(s => s.dataName === data.dataName)!;
    step.payload = payload;
    step.attemptWasMade = true;
    
    this._tryCompleteCollectedData(collectedData);
  }


  public generatePayload(): IEffectPayload {
    return this._generatePayload(this._payloadDefinition);
  }


  private _generatePayload(payloadDefinition: IPayloadDefinition, isNested: boolean = false): IEffectPayload {
    const effectPayload = {
      effect: payloadDefinition.effect,
      effectName: payloadDefinition.effect.effectName,
      caster: payloadDefinition.caster,
      payload: this._collectingData
        .filter(cd => cd.effect.id === payloadDefinition.effect.id)
        .map(d => Object.fromEntries(Object.values(d.steps).map(g => [g.dataName, g.payload])))
    }
    if (!isNested) {
      Object.assign(effectPayload, { nestedPayloads: this._nestedPayloadDefinitions.map(npd => this._generatePayload(npd, true)) })
    }
    return effectPayload as IEffectPayload;
  }


  private _tryCompleteCollectedData(cd: ICollectableData): void {
    if (cd.steps.every(s => s.attemptWasMade)) {
      cd.isCompleted = true
    }
  }

  private _checkIsCompleted(): boolean {
    return !this._getResolvablePayloadDefinition() || this._forcedCompletion;
  }


  private _getResolvablePayloadDefinition(): IPayloadDefinition | undefined {
    return this.payloadDefinitions.find(d => {
      if (!this.dataToCollect.some(cd => cd.effect.id === d.effect.id) && !d.nestedDefinitionFactory) {
        return false;
      }
      const targets = this.collectedData.filter(cd => cd.effect.id === d.effect.id);
      return targets.length < (d.amountOfTargets ?? 1) || d.nestedDefinitionFactory;
    })
  }


  private _createCollectedData(effect: IEffect, steps: ICollectableDataDefinition[]): ICollectableData {
    const collectedData = {
      index: this._collectingData.length,
      effect: effect,
      steps: steps.map(gs => Object.assign(gs, {
        collectedDataIndex: this._collectingData.length,
        effectId: effect.id,
        attemptWasMade: !!gs.payload,
      })),
      isCompleted: false
    }

    return collectedData;
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
    }
    delete definition.nestedDefinitionFactory;
  }


  private _initializeDefinition(payloadDefinition: IPayloadDefinition): { preparationData: ICollectableData[], collectingData: ICollectableData[] } {
    const { preparationSteps, amountOfTargets, gatheringSteps, effect } = payloadDefinition;
    let preparationData: ICollectableData[] = [];

    if (Array.isArray(preparationSteps)) {
      if (!!amountOfTargets) {
        preparationData = Array.from({ length: amountOfTargets }, () => this._createCollectedData(effect, preparationSteps));
      } else {
        preparationData = [this._createCollectedData(effect, preparationSteps)];
      }
      this._tryAutoCollect(preparationData, preparationSteps);
      preparationData.forEach(pd => this._tryCompleteCollectedData(pd));
    }

    if (!Array.isArray(gatheringSteps) && !payloadDefinition.nestedDefinitionFactory) {
      throw new Error("GatheringSteps or nestedDefinitionFactory must be provided");
    }

    if (Array.isArray(gatheringSteps) && payloadDefinition.nestedDefinitionFactory) {
      throw new Error('Using gatheringSteps together with nested definition is not supported');
    }

    let collectingData: ICollectableData[]  = [];
    if (Array.isArray(gatheringSteps)) {
     
      if (preparationData.length > 0) {
        collectingData = Array.from({ length: preparationData.length }, () => this._createCollectedData(effect, gatheringSteps));
      } else if(!!amountOfTargets) {
        collectingData = Array.from({ length: amountOfTargets }, () => this._createCollectedData(effect, gatheringSteps));
      } else {
        collectingData = [this._createCollectedData(effect, gatheringSteps)];
      }
      this._tryAutoCollect(collectingData, gatheringSteps);
      collectingData.forEach(cd => this._tryCompleteCollectedData(cd));
    }


    return { preparationData, collectingData }
  }

  private _tryAutoCollect(cds: ICollectableData[], sds: ICollectableDataDefinition[]): void {
    const groupedSteps: { [key: string]: ICollectedDataStep[] } = {}
    for (let cd of cds) {
      for (let step of cd.steps) {
        if (!(step.dataName in groupedSteps)) {
          groupedSteps[step.dataName] = [];
        }
        groupedSteps[step.dataName].push(step);
      }
    }

    for (let [dataName, steps] of Object.entries(groupedSteps)) {
      const definition = sds.find(sd => sd.dataName === dataName);
      if (!definition) {
        throw new Error("Cannot find associated definition during autocollecting")
      }
      if (!definition.autoCollect) {
        continue;
      }

      for (let step of steps) {
        if (step.dataName === GatheringStepDataName.Effect && definition.dataName === GatheringStepDataName.Effect && definition.possibleEffects) {
          if (definition.requireUniqueness) {
            step.payload = definition.possibleEffects[steps.indexOf(step)]
          } else {
            step.payload = definition.possibleEffects[0];
          }
          step.attemptWasMade = true;
        } else {
          throw new Error(`AutoCollect not availble for ${step.dataName.toUpperCase()} step`)
        }
      }
    }
  }

  private _createCollectingDataType(
    collectedData: ICollectableData,
    step: ICollectedDataStep,
    definition: IPayloadDefinition
  ): ICollectedDataStep & ICollectableDataDefinition {
    
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
        .filter(a => !gatheredFieldIds.includes(a.id));
    }

    if (tempStep.dataName === GatheringStepDataName.Effect && !tempStep?.possibleEffects && tempStep?.possibleEffectsResolver) {
      tempStep.possibleEffects = tempStep.possibleEffectsResolver(tempStep.prev);
    }

    if (tempStep.initialPayloadResolver) {
      tempStep.initialPayload = tempStep.initialPayloadResolver(tempStep.prev as any)
    }
    
    return tempStep;
  }

}