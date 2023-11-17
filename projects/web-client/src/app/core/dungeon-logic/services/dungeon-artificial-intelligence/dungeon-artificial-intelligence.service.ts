import { Injectable } from '@angular/core';
import { IActor } from '@game-logic/lib/features/actors/actors.interface';
import { IBoardCoordinates, IBoardObjectRotation, IField } from '@game-logic/lib/features/board/board.interface';
import { IEffect } from '@game-logic/lib/features/effects/effect-commons.interface';
import { DungeonStateStore } from '../../stores/dungeon-state.store';
import { IDungeonCard } from '@game-logic/lib/features/dungeon/dungeon-deck.interface';
import { EffectName } from '@game-logic/lib/features/effects/effects.constants';
import { CoordsHelper } from '@game-logic/lib/features/board/coords.helper';
import { IDungeonAIContext } from '../../interfaces/dungeon-ai-context';
import { IEffectPayloadProvider, IEffectPayloadProviderResult } from '../../interfaces/effect-payload-provider';
import { ICollectableData } from '@game-logic/lib/features/effects/effect-payload.interface';

@Injectable()
export class DungeonArtificialIntelligenceService implements IEffectPayloadProvider  {

  constructor(
    private readonly _dungeonStateStore: DungeonStateStore
  ) { }
  
  collectFieldTypeData: (dataType: ICollectableData, effect: IEffect) => Promise<IEffectPayloadProviderResult<IField>>;
  collectEffectTypeData: (dataType: ICollectableData, effect: IEffect) => Promise<IEffectPayloadProviderResult<IEffect>>;
  collectRotationTypeData: (dataType: ICollectableData, effect: IEffect) => Promise<IEffectPayloadProviderResult<IBoardObjectRotation>>;
  collectActorTypeData: (dataType: ICollectableData, effect: IEffect) => Promise<IEffectPayloadProviderResult<IActor>>;

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
  
  public findAvailableActor(possibleActors: IActor[], context: IDungeonAIContext): IActor {
    const boardActors = possibleActors.map(a => this._dungeonStateStore.currentState.board.getObjectById(a.id));
    const heroPosition = this._dungeonStateStore.currentState.hero.position;

    if (boardActors.find(ba => CoordsHelper.isCoordsEqual(ba.position, heroPosition))) {
      return this._dungeonStateStore.currentState.hero;
    }

    if (context.activity === 'moving') {
      // find actor that is not able to attack
    } else if (context.activity === 'healing') {
      // find actor that has lowest hp
    } else {
      const targetPosition = this._getClosestCoords(heroPosition, boardActors.map(ba => ba.position));
      return boardActors.find(ba => CoordsHelper.isCoordsEqual(targetPosition, ba.position));
    }
  }
  
  public findAvailableRotation(actor: IActor, context: IDungeonAIContext): IBoardObjectRotation {
    const boardActor = this._dungeonStateStore.currentState.board.getObjectById(actor.id);
    const heroPosition = this._dungeonStateStore.currentState.hero.position;
    // if actor has possibility to attack, if not rotate to provide such possibility.
    return CoordsHelper.getRotationTowardsGivenCoordinates(heroPosition, boardActor.position);
  }

  public findAvailableEffect(): IEffect {
    throw new Error('Method not implemented.');
  }

  public findAvailableField(possibleFields: IField[]): IField {
    const heroPosition = this._dungeonStateStore.currentState.hero.position;
    const targetPosition = this._getClosestCoords(heroPosition, possibleFields.map(f => f.coords));
    return possibleFields.find(pf => pf.coords === targetPosition);
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
