import { DungeonState } from '../../../../states/dungeon-state';
import { ICollectableDataDefinition, ICollectableData, ICollectableDataStep, IPayloadDefinition } from './effect-payload.interface';
import { getPaylodDefinition } from '../../payload-definition';
import { IEffectDefinition, IEffectPayload } from '../../payload-definition.interface';
import { IEffect } from '../../resolve-effect.interface';
import { GatheringStepDataName } from './effect-payload-collector.constants';
import { ActorCollectableDataStep } from './collectable-data-types/actor-collectable-data';
import { EffectCollectableDataStep } from './collectable-data-types/effect-collectable-data';
import { OriginCollectableDataStep } from './collectable-data-types/origin-collectable-data';
import { FieldCollectableDataStep } from './collectable-data-types/field-collectable-data';
import { SourceActorCollectableDataStep } from './collectable-data-types/source-actor-collectable-data';
import { RotationCollectableDataStep } from './collectable-data-types/rotation-collectable-data';

export class EffectPayloadCollector {

  public effect!: IEffect;
  public get payloadDefinitions() {
    return this._payloadDefinition ?
      [this._payloadDefinition, ...this._nestedPayloadDefinitions] :
      this._nestedPayloadDefinitions
  };
  public get notCollectedData() { return this.collectableData.filter(d => !d.isCompleted) };
  public get collectedData() { return this.collectableData.filter(d => d.isCompleted) };
  public get collectableData() { return this._preparationData.concat(this._collectingData) };
  public get isCompleted() { return this._checkIsCompleted() };

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


  public getDataTypeToCollect(): ICollectableDataStep & ICollectableDataDefinition {
    let definition = this._getResolvablePayloadDefinition();
    if (!definition) {
      throw new Error("There is no definition to collect, all required data is collected.");
    }

    if (definition.nestedDefinitionFactory && this._preparationData.every(pd => pd.isCompleted)) {
      this._initializeNestedDefinitions(definition);
      definition = this._getResolvablePayloadDefinition();
    }

    const dataToCollect = this.notCollectedData[0];
    const step = dataToCollect?.steps.find(s => s.payload == null);
    if (!step || !dataToCollect || !definition) {
      throw new Error("There is no data to collect, all required data is collected.");
    }

    return Object.assign(step, this._createCollectableDataStep(dataToCollect, step, definition));
  }


  public collectData(
    data: ICollectableDataDefinition,
    payload: ICollectableDataStep['payload'],
    isGathered: boolean
  ): {
    collectingTerminated: boolean
  } {
    const definition = this._getResolvablePayloadDefinition();
    if (!definition) {
      throw new Error(`There is no data to collect, all required data is collected.`)
    }

    const dataToCollect = this.notCollectedData
      .find(cd => cd.effect.id === definition.effect.id);
    if (!dataToCollect) {
      throw new Error("Cannot find collected data associated with given definition");
    }
    
    const step = dataToCollect.steps.find(s => s.dataName === data.dataName)!;
    step.payload = payload;
    step.attemptWasMade = true;
    
    this._tryCompleteCollectableData(dataToCollect);

    if (!isGathered) {
      this._preparationData = this._preparationData.filter(pd => pd !== dataToCollect);
      this._collectingData = this._collectingData.filter(pd => pd !== dataToCollect);
    }

    const remainingCollectables = this.collectableData.filter(cb => cb.payloadDefinition === definition).length;
    const allNestedCollectablesAreTerminated = this._nestedPayloadDefinitions.every(npd =>
      !this._collectingData.some(cd => cd.payloadDefinition === npd)) && this._nestedPayloadDefinitions.length > 0;

    return {
      collectingTerminated: !isGathered &&
        remainingCollectables === 0 &&
        (definition === this._payloadDefinition || allNestedCollectablesAreTerminated)
    };
  }


  public generatePayload(): IEffectPayload {
    return this._generatePayload(this._payloadDefinition);
  }

  public forceCompletion(): void {
    this._forcedCompletion = true;
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
      Object.assign(effectPayload, {
        nestedPayloads: this._nestedPayloadDefinitions
          .filter(npd => this.collectableData.some(cd => cd.payloadDefinition === npd))
          .map(npd => this._generatePayload(npd, true))
      })
    }
    // console.log(this.collectableData)

    // console.log(this._nestedPayloadDefinitions
    //   .filter(npd => this.collectableData.some(cd => cd.payloadDefinition === npd)));

    return effectPayload as IEffectPayload;
  }


  private _tryCompleteCollectableData(cd: ICollectableData): void {
    if (cd.steps.every(s => s.attemptWasMade)) {
      cd.isCompleted = true
    }
  }

  private _checkIsCompleted(): boolean {
    return !this._getResolvablePayloadDefinition() || this._forcedCompletion;
  }


  private _getResolvablePayloadDefinition(): IPayloadDefinition | undefined {
    return this.payloadDefinitions.find(d => {
      if (!this.notCollectedData.some(cd => cd.effect.id === d.effect.id) && !d.nestedDefinitionFactory) {
        return false;
      }
      const targets = this.collectedData.filter(cd => cd.effect.id === d.effect.id);
      return targets.length < (d.amountOfTargets ?? 1) || d.nestedDefinitionFactory;
    })
  }


  private _initializeDefinition(payloadDefinition: IPayloadDefinition): { preparationData: ICollectableData[], collectingData: ICollectableData[] } {
    const { preparationSteps, amountOfTargets, gatheringSteps, effect } = payloadDefinition;
    let preparationData: ICollectableData[] = [];

    if (Array.isArray(preparationSteps)) {
      if (!!amountOfTargets) {
        preparationData = Array.from({ length: amountOfTargets }, () => this._createCollectableData(effect, preparationSteps, payloadDefinition));
      } else {
        preparationData = [this._createCollectableData(effect, preparationSteps, payloadDefinition)];
      }
      this._tryAutoCollect(preparationData, preparationSteps);
      preparationData.forEach(pd => this._tryCompleteCollectableData(pd));
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
        collectingData = Array.from({ length: preparationData.length }, () => this._createCollectableData(effect, gatheringSteps, payloadDefinition));
      } else if(!!amountOfTargets) {
        collectingData = Array.from({ length: amountOfTargets }, () => this._createCollectableData(effect, gatheringSteps, payloadDefinition));
      } else {
        collectingData = [this._createCollectableData(effect, gatheringSteps, payloadDefinition)];
      }
      this._tryAutoCollect(collectingData, gatheringSteps);
      collectingData.forEach(cd => this._tryCompleteCollectableData(cd));
    }

    return { preparationData, collectingData }
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



  private _createCollectableData(
    effect: IEffect,
    steps: ICollectableDataDefinition[],
    payloadDefinition: IPayloadDefinition
  ): ICollectableData {
    const collectedData = {
      index: this._collectingData.length,
      effect: effect,
      steps: steps.map(gs => Object.assign({ ...gs }, {
        collectedDataIndex: this._collectingData.length,
        effectId: effect.id,
        attemptWasMade: !!gs.payload,
      })),
      isCompleted: false,
      payloadDefinition
    }

    return collectedData;
  }


  private _createCollectableDataStep(
    collectableData: ICollectableData,
    step: ICollectableDataStep,
    definition: IPayloadDefinition
  ): ICollectableDataStep & ICollectableDataDefinition {

    if (collectableData.effect.id !== definition.effect.id) {
      throw new Error("Collectable data is not associated with given definition")
    }

    const preparationStepDefinition = definition?.preparationSteps?.find(d => d.dataName === step.dataName);
    const gatheringStepsDefinition = definition?.gatheringSteps?.find(d => d.dataName === step.dataName);
       
    if (preparationStepDefinition && gatheringStepsDefinition) {
      throw new Error("Gathering same data type in preparation and gathering steps simultaneously is not supported");
    }

    if (!preparationStepDefinition && !gatheringStepsDefinition) {
      throw new Error("Cannot find step definition")
    }

    const stepDefinition = preparationStepDefinition ?? gatheringStepsDefinition;
    const prevSteps = collectableData.steps.slice(0, collectableData.steps.indexOf(step));
    let tempStep;

    if (step.dataName !== stepDefinition.dataName) {
      throw new Error("Step and stepDefinition are not sharing same data type")
    }

    if (step.dataName === GatheringStepDataName.Actor && stepDefinition.dataName === GatheringStepDataName.Actor) {
      tempStep = new ActorCollectableDataStep(step, stepDefinition, prevSteps)    
    }

    if (step.dataName === GatheringStepDataName.Effect && stepDefinition.dataName === GatheringStepDataName.Effect) {
      tempStep = new EffectCollectableDataStep(step, stepDefinition, prevSteps)    
    }

    if (step.dataName === GatheringStepDataName.Origin && stepDefinition.dataName === GatheringStepDataName.Origin) {
      tempStep = new OriginCollectableDataStep(step, stepDefinition, prevSteps)    
    }

    if (step.dataName === GatheringStepDataName.Field && stepDefinition.dataName === GatheringStepDataName.Field) {
      tempStep = new FieldCollectableDataStep(step, stepDefinition, prevSteps)    
    }

    if (step.dataName === GatheringStepDataName.SourceActor && stepDefinition.dataName === GatheringStepDataName.SourceActor) {
      tempStep = new SourceActorCollectableDataStep(step, stepDefinition, prevSteps)    
    }

    if (step.dataName === GatheringStepDataName.Rotation && stepDefinition.dataName === GatheringStepDataName.Rotation) {
      tempStep = new RotationCollectableDataStep(step, stepDefinition, prevSteps)    
    }

    let data: ICollectableData[];
    if (preparationStepDefinition) {
      data = this._preparationData.filter(pd => pd.effect.id === definition.effect.id);
    } else if (gatheringStepsDefinition) {
      data = this._collectingData.filter(pd => pd.effect.id === definition.effect.id);
    }
    tempStep.initialize(data);

    return tempStep;
  }


  private _tryAutoCollect(cds: ICollectableData[], sds: ICollectableDataDefinition[]): void {
    const groupedSteps: { [key: string]: ICollectableDataStep[] } = {}
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

}