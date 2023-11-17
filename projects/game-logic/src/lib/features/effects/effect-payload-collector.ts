import { DungeonState } from '../../game/dungeon-state';
import { IEffect, IEffectPayload } from './effects-commons.interface';
import { ICollectableData, ICollectedData, ICollectedDataStep, IPayloadDefinition } from './effect-payload.interface';
import { IActor, IBasicStats } from '../actors/actors.interface';
import { Outlet } from '../actors/actors.constants';
import { getPaylodDefinitions } from './payload-definitions';

export class EffectPayloadCollector {

  public effect!: IEffect;
  public get payloadDefinitions() { return this._payloadDefinitions; };
  public get collectedData() { return this._collectedData };
  public get isCompleted() { return this._checkIsCompleted() };

  public set isCompleted(v: boolean) { this._forcedCompletion = v }

  private _payloadDefinitions: IPayloadDefinition[] = [];
  private _collectedData: ICollectedData[] = [];

  private _forcedCompletion: boolean = false;

  constructor(
    private readonly _state: DungeonState
  ) { }

  public initializeData(effect: IEffect, caster: IActor & IBasicStats): void {
    this.effect = effect;
    //TODO combine caster with inventory
    this._payloadDefinitions = getPaylodDefinitions(effect, caster, this._state.heroInventory, this._state.board, this._state.getAllEffects());
  }

  public getDataTypeToCollect(): ICollectedDataStep & ICollectableData {
    const definition = this._getNotResolvedPayloadDefinition();
    if (!definition) {
      throw new Error("There is no data to collect, all required data is collected.")
    }
    
    let collectedData = this._collectedData.find(cd => !cd.isCompleted);
    if (!collectedData) {
      collectedData = this._createCollectedData(definition);
      this._collectedData.push(collectedData);
    }
    return this._createCollectingDataType(collectedData, definition)
  }

  public collectData(data: ICollectableData, payload: unknown | undefined): void {
    const definition = this._getNotResolvedPayloadDefinition();
    if (!definition) {
      throw new Error(`There is no data to collect, all required data is collected.`)
    }

    const collectedData = this._collectedData
      .find(cd => cd.effectId === definition.effectId && !cd.isCompleted);
    if (!collectedData) {
      throw new Error("Cannot find collected data associated with given definition");
    }
    
    const step = collectedData.gatheringSteps.find(s => s.dataName === data.dataName)!;
    step.payload = payload;

    if (collectedData.gatheringSteps.every(s => s.payload != null)) {
      collectedData.isCompleted = true
    }
  }

  public generatePayload(): IEffectPayload {
    if (!!this._getNotResolvedPayloadDefinition()) {
      throw new Error('Not all data was collected');
    }
    return {
      effectId: this.effect.id,
      effectName: this.effect.effectName,
      payload: this._collectedData.map(d =>
        Object.fromEntries(Object.values(d.gatheringSteps).map(g => [g.dataName, g.payload])))
    } as unknown as IEffectPayload
  }

  private _checkIsCompleted(): boolean {
    return !this._getNotResolvedPayloadDefinition() || this._forcedCompletion;
  }

  private _getNotResolvedPayloadDefinition(): IPayloadDefinition | undefined {
    return this.payloadDefinitions.find(d => {
      const targets = this._collectedData.filter(cd => cd.effectId === d.effectId && cd.isCompleted);
      return targets.length < d.amountOfTargets
    })
  }

  private _createCollectedData(definition: IPayloadDefinition): ICollectedData {
    const collectedData = {
      index: this._collectedData.length,
      effectId: definition.effectId,
      gatheringSteps: definition.gatheringSteps.map(gs => Object.assign(gs, { collectedDataIndex: this._collectedData.length })),
      isCompleted: false
    }
    return collectedData;
  }

  private _createCollectingDataType(
    collectedData: ICollectedData,
    definition: IPayloadDefinition
  ): ICollectedDataStep & ICollectableData {

    const gatheredActorIds = this._collectedData.reduce((acc, curr) => {
      return acc.concat(curr.gatheringSteps
        .filter(gs => gs.dataName === 'actor' && !!gs.payload)
        .map(gs => (gs.payload as IActor).id))
    }, [] as string[]);


    const gatheredFieldIds = this._collectedData.reduce((acc, curr) => {
      return acc.concat(curr.gatheringSteps
        .filter(gs => gs.dataName === 'field' && !!gs.payload)
        .map(gs => (gs.payload as IActor).id))
    }, [] as string[]);

    const step: ICollectedDataStep & ICollectableData = Object.assign({ ...collectedData.gatheringSteps.find(s => !s.payload)! },
      definition.gatheringSteps.find(s => s.dataName === step.dataName));
    step?.possibleActors?.filter(a => !gatheredActorIds.includes(a.id));
    step?.possibleFields?.filter(a => !gatheredFieldIds.includes(a.id))
    step.prev = collectedData.gatheringSteps.filter(s => s.payload);

    return Object.assign({ ...step }, definition.gatheringSteps.find(s => s.dataName === step.dataName));
  }

}