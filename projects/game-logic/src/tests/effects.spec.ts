import { ratActor } from "../gameplay/data/actors.data";
import { heroSword } from "../gameplay/data/hero.data";
import { dungeonTemplate } from "../gameplay/data/dungeon.data";
import { dataFeed } from "../gameplay/data/feed.data";
import { move, basicAttack } from "../gameplay/data/abilities.data";
import { makeAttack } from "../framework/activities/player-activities/make-attack.directive";
import { makeMove } from "../framework/activities/player-activities/make-move.directive";
import { IBoardObjectRotation } from "../framework/modules/board/board.interface";
import { AdventureGameplay } from "../lib/gameplay/adventure/adventure-gameplay";
import { DungeonGameplay } from "../lib/gameplay/dungeon/dungeon-gameplay";
import { StateFactory } from "../framework/states/state.factory";
import { createAdventureState, createStateDispatcher } from "./test-helpers";

describe('effects', () => {
  const stateDispatcher = createStateDispatcher();
  
  let adventureState: AdventureGameplay;
  let dungeonState: DungeonGameplay;

  beforeEach(() => {
    adventureState = createAdventureState();
    dungeonState = StateFactory.createDungeonState(adventureState, dataFeed, dungeonTemplate);
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