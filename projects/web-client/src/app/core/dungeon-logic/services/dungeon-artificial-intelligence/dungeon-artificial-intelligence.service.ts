import { Injectable } from '@angular/core';
import { IActor } from '@game-logic/lib/features/actors/actors.interface';
import { IBoardCoordinates, IBoardObject, IBoardObjectRotation, IBoardSelector, IBoardSelectorOrigin, IField } from '@game-logic/lib/features/board/board.interface';
import { DungeonStateStore } from '../../stores/dungeon-state.store';
import { IDungeonCard } from '@game-logic/lib/features/dungeon/dungeon-deck.interface';
import { EffectName } from '@game-logic/lib/features/effects/effects.constants';
import { CoordsHelper } from '@game-logic/lib/features/board/coords.helper';
import { IEffectPayloadProvider, IEffectPayloadProviderResult } from '../../interfaces/effect-payload-provider';
import { IActorCollectableData, IOriginCollectableData, IEffectCollectableData, IFieldCollectableData, IRotationCollectableData, ISourceActorCollectableData, IRotationCollectedDataStep } from '@game-logic/lib/features/effects/effect-payload.interface';
import { IEffect } from '@game-logic/lib/features/effects/resolve-effect.interface';
import { IEffectDefinition } from '@game-logic/lib/features/effects/payload-definition.interface';
import { DataFeedService } from 'src/app/core/data-feed/services/data-feed.service';
import { GatheringStepDataName } from '@game-logic/lib/features/effects/effect-payload-collector.constants';


@Injectable()
export class DungeonArtificialIntelligenceService implements IEffectPayloadProvider  {

  constructor(
    private readonly _dungeonStateStore: DungeonStateStore,
    private readonly _dataFeed: DataFeedService
  ) { }

  public determineCardsOrder(cards: IDungeonCard<IEffect>[]): IDungeonCard<IEffect>[] {
    const effectsOrder = [
      EffectName.SpawnActor,
      EffectName.ModifyPosition,
      EffectName.ModifyStats,
      EffectName.DealDamage,
    ];

    const orderedCards = []  
    for (let effectName of effectsOrder) {
      cards.filter(c => c.effect.effectName === effectName)
        .forEach(c => orderedCards.push(c));
    }

    return orderedCards.concat(cards.filter(c => !effectsOrder.includes(c.effect.effectName)));
  }
  

  public async collectActorTypeData(
    dataType: IActorCollectableData,
    effectDefinition: IEffectDefinition
  ): Promise<IEffectPayloadProviderResult<IActor, IActorCollectableData>> {

    let actor: IActor;
    if (effectDefinition.effectName === EffectName.ModifyPosition) {
      actor = dataType.prev.find(dt => dt.dataName === GatheringStepDataName.Origin).payload as IActor;
    } else if (effectDefinition.effectName === EffectName.DealDamage) {
      actor = this._dungeonStateStore.currentState.hero;
    } else {
      actor = dataType.possibleActors[0]
    }

    if (dataType.possibleActors.find(pa => pa.id !== actor.id)) {
      throw new Error("Dungeon AI: Selected not allowed actor type data.");
    }

    return {
      data: actor,
      dataType: dataType,
      revertCallback: () => null,
      isDataGathered: !!actor
    }
  }
  

  public async collectRotationTypeData(
    dataType: IRotationCollectableData & IRotationCollectedDataStep,
    effect: IEffectDefinition
  ): Promise<IEffectPayloadProviderResult<IBoardObjectRotation, IRotationCollectableData>> {
    // const boardActor = this._dungeonStateStore.currentState.board.getObjectById(actor.id);
    const heroPosition = this._dungeonStateStore.currentState.hero.position;
    let fromPosition = (dataType.prev.find(p => p.dataName === GatheringStepDataName.Field).payload as IField).position;

    if (!fromPosition) {
      fromPosition = (dataType.prev.find(p => p.dataName === GatheringStepDataName.Actor).payload as IBoardObject).position;
    }
    const path = this._dungeonStateStore.currentState.board.findShortestPathBetweenCoordinates(fromPosition, heroPosition);

    return {
      data: path[0].vector as IBoardObjectRotation,
      dataType: dataType,
      revertCallback: () => null,
      isDataGathered: true
    }
  }


  public async collectFieldTypeData(
    dataType: IFieldCollectableData,
    effect: IEffectDefinition
  ): Promise<IEffectPayloadProviderResult<IField, IFieldCollectableData>> {
    const heroPosition = this._dungeonStateStore.currentState.hero.position;
    const targetPosition = this._getClosestCoords(heroPosition, dataType.possibleFields.map(f => f.position));
    return {
      data: dataType.possibleFields.find(pf => pf.position === targetPosition),
      dataType: dataType,
      revertCallback: () => null,
      isDataGathered: !!dataType
    }
  }


  public async collectEffectTypeData(
    dataType: IEffectCollectableData,
    effect: IEffectDefinition
  ): Promise<IEffectPayloadProviderResult<IEffect, IEffectCollectableData>> {
    return {
      data: {} as any,
      dataType: dataType,
      revertCallback: () => null,
      isDataGathered: false
    }
  }


  public async collectOriginTypeData(
    dataType: IOriginCollectableData,
    effectDefinition: IEffectDefinition
  ): Promise<IEffectPayloadProviderResult<IBoardSelectorOrigin, IOriginCollectableData>> {
    let data: IBoardSelectorOrigin | undefined;
    if (effectDefinition.effectName === EffectName.ModifyPosition) {
      const actors = dataType.possibleOrigins
        .map(o => this._dungeonStateStore.currentState.board.getObjectByPosition(o.position))
        .filter(a => effectDefinition.effect.effectTargetingSelector.targetingActors.includes(a?.actorType))
        .filter(a => {
          const selectorOrigin = { ...a } as unknown as IBoardSelector;
          selectorOrigin.selectorOrigin = a;
          const isNotInAttackRange = this._dungeonStateStore.currentState.board
            .getObjectsBySelector(selectorOrigin)
            .every(o => o !== this._dungeonStateStore.currentState.hero);
          return isNotInAttackRange;
        })    
      data = actors[0];
    } else {
      data = effectDefinition.caster as unknown as IBoardSelectorOrigin;
    }

    return {
      data: data,
      dataType: dataType,
      revertCallback: () => null,
      isDataGathered: !!data
    }
  }


  public async collectSourceActorTypeData(
    dataType: ISourceActorCollectableData,
    effectDefinition: IEffectDefinition
  ): Promise<IEffectPayloadProviderResult<IActor, ISourceActorCollectableData>> {
    let actor: IActor;

    if (dataType.possibleSourceActorIds.length >= 1) {
      actor = await this._dataFeed.getActor(dataType.possibleSourceActorIds[0]);
    }

    if (!actor) {
      throw new Error("Cannot find source actor");
    }

    return {
      data: actor,
      dataType: dataType,
      revertCallback: () => null,
      isDataGathered: !!actor
    }
  }


  private _getClosestCoords(
    refCoords: IBoardCoordinates,
    possibleCoords: IBoardCoordinates[]
  ): IBoardCoordinates | undefined {
    let target = { distance: null, coords: null };

    for (let pc of possibleCoords) {
      const distance = CoordsHelper.getDistanceBetweenBoardCoordinates(refCoords, pc);
      if (target.distance === null || target.distance > distance) {
        target.distance = distance
        target.coords = pc;
      }
    }
    return target.coords;
  }
}
