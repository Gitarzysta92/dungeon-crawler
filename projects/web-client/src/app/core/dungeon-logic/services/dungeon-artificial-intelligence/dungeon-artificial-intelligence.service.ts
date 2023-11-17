import { Injectable } from '@angular/core';
import { IActor } from '@game-logic/lib/features/actors/actors.interface';
import { IBoardCoordinates, IBoardObjectRotation, IField } from '@game-logic/lib/features/board/board.interface';
import { DungeonStateStore } from '../../stores/dungeon-state.store';
import { IDungeonCard } from '@game-logic/lib/features/dungeon/dungeon-deck.interface';
import { EffectName } from '@game-logic/lib/features/effects/effects.constants';
import { CoordsHelper } from '@game-logic/lib/features/board/coords.helper';
import { IEffectPayloadProvider, IEffectPayloadProviderResult } from '../../interfaces/effect-payload-provider';
import { ICollectableData } from '@game-logic/lib/features/effects/effect-payload.interface';
import { IEffect } from '@game-logic/lib/features/effects/effects-commons.interface';

@Injectable()
export class DungeonArtificialIntelligenceService implements IEffectPayloadProvider  {

  constructor(
    private readonly _dungeonStateStore: DungeonStateStore
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
  
  public async collectActorTypeData(dataType: ICollectableData, effect: IEffect): Promise<IEffectPayloadProviderResult<IActor>> {
    const boardActors = dataType.possibleActors.map(a => this._dungeonStateStore.currentState.board.getObjectById(a.id));
    const heroPosition = this._dungeonStateStore.currentState.hero.position;

    if (boardActors.find(ba => CoordsHelper.isCoordsEqual(ba.position, heroPosition))) {
      //return this._dungeonStateStore.currentState.hero;
    }

    const context: any = {};
    const targetPosition = this._getClosestCoords(heroPosition, boardActors.map(ba => ba.position));
    if (context.activity === 'moving') {
      // find actor that is not able to attack
    } else if (context.activity === 'healing') {
      // find actor that has lowest hp
    } else {
      //const targetPosition = this._getClosestCoords(heroPosition, boardActors.map(ba => ba.position));
    }

    return {
      data: boardActors.find(ba => CoordsHelper.isCoordsEqual(targetPosition, ba.position)),
      dataType: dataType,
      revertCallback: () => null
    }
  }
  
  public async collectRotationTypeData(dataType: ICollectableData, effect: IEffect): Promise<IEffectPayloadProviderResult<IBoardObjectRotation>> {
    // const boardActor = this._dungeonStateStore.currentState.board.getObjectById(actor.id);
    // const heroPosition = this._dungeonStateStore.currentState.hero.position;
    // if actor has possibility to attack, if not, rotate it to provide such possibility.
    return {
      data: {} as any,
      dataType: dataType,
      revertCallback: () => null
    }
  }

  public async collectEffectTypeData(dataType: ICollectableData, effect: IEffect): Promise<IEffectPayloadProviderResult<IEffect>> {
    return {
      data: {} as any,
      dataType: dataType,
      revertCallback: () => null
    }
  }

  public async collectFieldTypeData(dataType: ICollectableData, effect: IEffect): Promise<IEffectPayloadProviderResult<IField>> {
    const heroPosition = this._dungeonStateStore.currentState.hero.position;
    const targetPosition = this._getClosestCoords(heroPosition, dataType.possibleFields.map(f => f.coords));
    return {
      data: dataType.possibleFields.find(pf => pf.coords === targetPosition),
      dataType: dataType,
      revertCallback: () => null
    }
  }

  private _getClosestCoords(
    refCoords: IBoardCoordinates,
    possibleCoords: IBoardCoordinates[]
  ): IBoardCoordinates | undefined {
    let target = { distance: null, coords: null }

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
