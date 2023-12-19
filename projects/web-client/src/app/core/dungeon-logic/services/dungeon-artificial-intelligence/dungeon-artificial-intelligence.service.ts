import { Injectable } from '@angular/core';
import { IActor } from '@game-logic/lib/features/actors/actors.interface';
import { IAassignedBoardObject, IBoardObjectRotation, IBoardSelector, IBoardSelectorOrigin, IField, IVectorAndDistanceEntry } from '@game-logic/lib/features/board/board.interface';
import { DungeonStateStore } from '../../stores/dungeon-state.store';
import { IDungeonCard } from '@game-logic/lib/features/dungeon/dungeon-deck.interface';
import { CoordsHelper } from '@game-logic/lib/features/board/coords.helper';
import { IEffect } from '@game-logic/lib/features/effects/resolve-effect.interface';
import { IEffectDefinition } from '@game-logic/lib/features/effects/payload-definition.interface';
import { DataFeedService } from 'src/app/core/data-feed/services/data-feed.service';
import { EffectName } from '@game-logic/lib/features/effects/commons/effects-commons.constants';
import { GatheringStepDataName } from '@game-logic/lib/features/effects/commons/effect-payload-collector/effect-payload-collector.constants';
import { IEffectPayloadProvider, IEffectPayloadProviderResult } from '@game-logic/lib/features/effects/commons/effect-resolver/effect-resolver.interface';
import { IActorCollectableDataDefinition, IRotationCollectableDataDefinition, IFieldCollectableDataDefinition, IEffectCollectableDataDefinition, IOriginCollectableDataDefinition, ISourceActorCollectableDataDefinition, IRotationCollectableDataStep } from '@game-logic/lib/features/effects/commons/effect-payload-collector/effect-payload.interface';



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
    dataType: IActorCollectableDataDefinition,
    effectDefinition: IEffectDefinition
  ): Promise<IEffectPayloadProviderResult<IActor, IActorCollectableDataDefinition>> {

    let actor: IActor;
    if (effectDefinition.effectName === EffectName.ModifyPosition) {
      actor = dataType.prev.find(dt => dt.dataName === GatheringStepDataName.Origin).payload as IActor;
    } else if (effectDefinition.effectName === EffectName.DealDamage) {
      actor = this._dungeonStateStore.currentState.hero;
    } else {
      actor = dataType.possibleActors[0]
    }

    if (actor && dataType.possibleActors.every(pa => pa.id !== actor.id)) {
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
    dataType: IRotationCollectableDataDefinition & IRotationCollectableDataStep,
  ): Promise<IEffectPayloadProviderResult<IBoardObjectRotation, IRotationCollectableDataDefinition>> {
    // const boardActor = this._dungeonStateStore.currentState.board.getObjectById(actor.id);
    const heroPosition = this._dungeonStateStore.currentState.hero.position;
    let fromPosition = (dataType.prev.find(p => p.dataName === GatheringStepDataName.Field).payload as IField).position;

    if (!fromPosition) {
      fromPosition = (dataType.prev.find(p => p.dataName === GatheringStepDataName.Actor).payload as IAassignedBoardObject).position;
    }

    let rotation: IBoardObjectRotation;
    if (CoordsHelper.areAdjanced(fromPosition, heroPosition)) {
      rotation = CoordsHelper.getAdjancedSide(fromPosition, heroPosition);
    } else {
      const boardVectorMap = this._dungeonStateStore.currentState.board.generateBoardCoordinatesVectorMap(heroPosition);
      rotation = CoordsHelper.findShortestPathBetweenCoordinates(fromPosition, heroPosition, boardVectorMap)[0]?.vector;
    }

    if (!rotation) {
      const vectorMap = this._dungeonStateStore.currentState.board.generateBoardCoordinatesVectorMap(heroPosition, []);
      const entry = vectorMap.get(CoordsHelper.createKeyFromCoordinates(fromPosition));
      rotation = entry.vector;
    }

    return {
      data: rotation,
      dataType: dataType,
      revertCallback: () => null,
      isDataGathered: true
    }
  }


  public async collectFieldTypeData(
    dataType: IFieldCollectableDataDefinition,
    effect: IEffectDefinition
  ): Promise<IEffectPayloadProviderResult<IField, IFieldCollectableDataDefinition>> {
    const heroPosition = this._dungeonStateStore.currentState.hero.position;
    const boardVectorMap = this._dungeonStateStore.currentState.board.generateBoardCoordinatesVectorMap(heroPosition);
    let choosenVector: IVectorAndDistanceEntry
    for (let field of dataType.possibleFields) {
      const vector = boardVectorMap.get(field.id);
      if (!vector) {
        continue;
      }
      if (!choosenVector) {
        choosenVector = vector;
      } else {
        choosenVector = vector.distanceToOrigin < choosenVector.distanceToOrigin ? vector : choosenVector;
      } 
    }

    const choosenField = choosenVector ?
      dataType.possibleFields.find(f => CoordsHelper.isCoordsEqual(f.position, choosenVector?.coords)) :
      dataType.possibleFields[0]
    return {
      data: choosenField,
      dataType: dataType,
      revertCallback: () => null,
      isDataGathered: !!choosenField
    }
  }


  public async collectEffectTypeData(
    dataType: IEffectCollectableDataDefinition,
  ): Promise<IEffectPayloadProviderResult<IEffect, IEffectCollectableDataDefinition>> {
    const selectedEffect = dataType.possibleEffects[0];
    return {
      data: selectedEffect,
      dataType: dataType,
      revertCallback: () => null,
      isDataGathered: !!selectedEffect
    }
  }


  public async collectOriginTypeData(
    dataType: IOriginCollectableDataDefinition,
    effectDefinition: IEffectDefinition
  ): Promise<IEffectPayloadProviderResult<IBoardSelectorOrigin, IOriginCollectableDataDefinition>> {
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
    dataType: ISourceActorCollectableDataDefinition,
  ): Promise<IEffectPayloadProviderResult<IActor, ISourceActorCollectableDataDefinition>> {
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
}
