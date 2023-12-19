import { ratActor } from "../data/actors.data";
import { heroSword } from "../data/hero.data";
import { dungeon } from "../data/dungeon.data";
import { dataFeed } from "../data/feed.data";
import { move, basicAttack } from "../data/skills-and-spells.data";
import { makeAttack } from "../lib/activities/player-activities/make-attack.directive";
import { makeMove } from "../lib/activities/player-activities/make-move.directive";
import { IBoardObjectRotation } from "../lib/features/board/board.interface";
import { AdventureGlobalState } from "../lib/gameplay/adventure/adventure-state";
import { DungeonGlobalState } from "../lib/gameplay/dungeon/dungeon-global-state";
import { StateFactory } from "../lib/states/state.factory";
import { createAdventureState, createStateDispatcher } from "./test-helpers";

describe('effects', () => {
  const stateDispatcher = createStateDispatcher();
  
  let adventureState: AdventureGlobalState;
  let dungeonState: DungeonGlobalState;

  beforeEach(() => {
    adventureState = createAdventureState();
    dungeonState = StateFactory.createDungeonState(adventureState, dataFeed, dungeon);
  });

  it('should utilize all hero resources and finish turn successfully', () => {
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

    // Act
    dungeonState = stateDispatcher.next(makeMove({ setup: move, to: moveTargetField }), dungeonState);
    dungeonState = stateDispatcher.next(makeAttack({ attack: basicAttack, weaponIds: meleeWeapon.id, targets: [targetEnemy] }), dungeonState)

    // Assert
    expect(dungeonState.board.getObjectById(dungeonState.hero.id)?.position).toStrictEqual(moveTargetField);
  })


  

});