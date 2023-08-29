import { ratActor } from "../data/actors.data";
import { heroSword } from "../data/commons.data";
import { dungeon } from "../data/dungeon.data";
import { dataFeed } from "../data/feed.data";
import { meleeAttack, move } from "../data/skills-and-spells.data";
import { makeMove } from "../lib/activities/player-activities/make-move.directive";
import { IBoardObjectRotation, IBoardSelector } from "../lib/features/board/board.interface";
import { AdventureState } from "../lib/game/adventure-state";
import { DungeonState } from "../lib/game/dungeon-state";
import { StateFactory } from "../lib/game/state.factory";
import { makeAttack } from "../lib/activities/player-activities/make-attack.directive";
import { createAdventureState, createStateDispatcher } from "./test-helpers";
import { ActorType } from "../lib/features/actors/actors.constants";
import { EffectName, EffectLifeTime, EffectTargetingResolveTime } from "../lib/features/effects/effects.constants";
import { castEffect } from "../lib/activities/player-activities/cast-effect.directive";
import { INoopEffect } from "../lib/features/effects/effects.interface";
import { IDisposable, InteractionType } from "../lib/features/interactions/interactions.interface";

describe('dungeon', () => {
  const stateDispatcher = createStateDispatcher();
  
  let adventureState: AdventureState;
  let dungeonState: DungeonState;

  beforeEach(() => {
    adventureState = createAdventureState();
    dungeonState = StateFactory.createDungeonState(adventureState, dataFeed, dungeon);
  });

  it('should utilize all hero actions and finish turn successfully', () => {
    // Arrange
    Object.assign(dungeonState.hero, { rotation: 5 })
    const meleeWeapon = dungeonState.heroInventory.getItem(heroSword)!;
    const enemyField = { r: 0, q: 1, s: -1 };
    const targetEnemy = Object.assign({ ...ratActor }, {
      id: "4DCB089A-1F57-4B8E-BD4A-973EDBBA0DD6",
      position: null,
      rotation: 0 as IBoardObjectRotation
    });
    dungeonState.board.assignObject(targetEnemy, enemyField);
    const moveTargetField = { r: 1, q: 0, s: -1 };
    const ratInitialHealth = ratActor.health;
    const emptyEffectCost = 2;
    const emptyEffect: INoopEffect & IDisposable & IBoardSelector = {
      id: "6759CDA2-2960-4C46-BF61-D5F72F1F4EF7",
      effectName: EffectName.Noop,
      effectLifeTime: EffectLifeTime.Instantaneous,
      interactionType: [ InteractionType.Disposable ],
      effectTargetingSelector: {
        resolveTime: EffectTargetingResolveTime.Immediate,
        targetingActors: [ActorType.Enemy],
        selectorTargets: "single",
      },
      utilizationCost: [{ costType: 'minorAction', costValue: emptyEffectCost }],
      selectorType: 'line'
    }
    dungeonState.preparedSpellAndAbilityIds.push(emptyEffect.id)
    const heroInitialMajorActions = dungeonState.hero.majorActions;
    const heroInitialMinorActions = dungeonState.hero.minorActions;

    // Act
    dungeonState = stateDispatcher.next(makeMove({ setup: move, to: moveTargetField }), dungeonState);
    dungeonState = stateDispatcher.next(makeAttack({ attack: meleeAttack, weaponId: meleeWeapon.id, targets: [targetEnemy] }), dungeonState);
    dungeonState = stateDispatcher.next(castEffect({ effect: emptyEffect, targets: [] }), dungeonState);
    
    // Assert
    expect(dungeonState.board.getObjectById(dungeonState.hero.id)?.position).toStrictEqual(moveTargetField);
    expect(targetEnemy.health).not.toEqual(ratInitialHealth);
    expect(dungeonState.hero.majorActions).toEqual(heroInitialMajorActions - meleeAttack.utilizationCost.find(u => u.costType === 'majorAction')?.costValue!);
    expect(dungeonState.hero.minorActions).toEqual(heroInitialMinorActions - emptyEffectCost);
  })


});