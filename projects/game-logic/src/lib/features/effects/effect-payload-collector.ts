import { DungeonState } from '../../game/dungeon-state';
import { getDealDamageByWeaponPayloadDefinitions, getDealdDamagePayloadDefinitions } from './deal-damage.effect';
import { IEffect, IEffectPayload } from './effect-commons.interface';
import { ICollectableData, ICollectedData, ICollectedDataStep, IPayloadDefinition } from './effect-payload.interface';
import { EffectName } from './effects.constants';
import { getSpawnActorPayloadDefinitions } from './spawn-actor.effect';
import { getModifyPositionPayloadDefinitions } from './modify-position.effect';
import { getModifyStatsPayloadDefinitions } from './modify-statistics.effect';


export class EffectPayloadCollector {

  public effect!: IEffect;
  public get payloadDefinitions() { return this._payloadDefinitions; };
  public get collectedData() { return this._collectedData };
  public get isCompleted() { return this._checkIsCompleted() };

  private _payloadDefinitions: IPayloadDefinition[] = [];
  private _collectedData: ICollectedData[] = []; 

  constructor(
    private readonly _state: DungeonState
  ) { }

  public initializeData(effect: IEffect): void {
    this.effect = effect;
    this._payloadDefinitions = this._getPaylodDefinitions(effect);
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

    const step = collectedData.gatheringSteps.find(s => !s.payload)!;
    step.prev = collectedData.gatheringSteps.filter(s => s.payload)
    return Object.assign({ ...step }, definition.gatheringSteps.find(s => s.dataName === step.dataName));
  }

  public collectData(data: ICollectableData, payload: unknown | undefined): void {
    const definition = this._getNotResolvedPayloadDefinition();
    if (!definition) {
      throw new Error(``)
    }

    const collectedData = this._collectedData
      .find(cd => cd.effectId === definition.effectId && !cd.isCompleted);
    if (!collectedData) {
      throw new Error("");
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
    return !this._getNotResolvedPayloadDefinition();
  }

  private _getNotResolvedPayloadDefinition(): IPayloadDefinition | undefined {
    return this.payloadDefinitions.find(d => {
      const targets = this._collectedData.filter(cd => cd.effectId === d.effectId && cd.isCompleted);
      return targets.length < d.amountOfTargets
    })
  }

  private _createCollectedData(definition: IPayloadDefinition): ICollectedData {
    const collectedData = {
      effectId: definition.effectId,
      gatheringSteps: definition.gatheringSteps,
      isCompleted: false
    }
    return collectedData 
  }

  private _getPaylodDefinitions(effect: IEffect): IPayloadDefinition[] {
    if (effect.effectName === EffectName.DealDamageByWeapon) {
      return getDealDamageByWeaponPayloadDefinitions(effect, this._state.heroInventory, this._state.board)
    }

    if (effect.effectName === EffectName.DealDamage) {
      return getDealdDamagePayloadDefinitions(effect, this._state.board);
    }

    if (effect.effectName === EffectName.SpawnActor) {
      return getSpawnActorPayloadDefinitions(effect, this._state.board);
    }

    if (effect.effectName === EffectName.ModifyPosition) {
      return getModifyPositionPayloadDefinitions(effect, this._state.board, this._state.hero)
    }

    if (effect.effectName === EffectName.ModifyStats) {
      return getModifyStatsPayloadDefinitions(effect, this._state.board);
    }

    return [];
  }

}