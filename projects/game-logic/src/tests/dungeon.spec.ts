import { ratActor } from "../data/actors.data";
import { firstAreaTavernId } from "../data/common-identifiers.data";
import { hero, heroInventory, heroSword } from "../data/commons.data";
import { dungeon } from "../data/dungeon.data";
import { dataFeed } from "../data/feed.data";
import { meleeAttack, move } from "../data/skills-and-spells.data";
import { makeMove } from "../lib/activities/player-activities/make-move.directive";
import { IBoardObjectRotation } from "../lib/features/board/board.interface";
import { AdventureState } from "../lib/game/adventure-state";
import { DungeonState } from "../lib/game/dungeon-state";
import { StateFactory } from "../lib/game/state.factory";
import { StateDispatcher } from "../lib/utils/state-dispatcher/state-dispatcher";
import { makeAttack } from "../lib/activities/player-activities/make-attack.directive";

describe('dungeon', () => {
  const stateDispatcher = new StateDispatcher({ context: dataFeed });
  
  let adventureState: AdventureState;
  let dungeonState: DungeonState;

  beforeEach(() => {
    adventureState = StateFactory.createAdventureState({
      hero: hero,
      occupiedAreaId: firstAreaTavernId,
      heroInventory: heroInventory,
      ...dataFeed
    });
    dungeonState = StateFactory.createDungeonState(adventureState, dataFeed, dungeon);
  });

  it('should utilize all hero resources and finish turn successfully', () => {
    // Arrange

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
    dungeonState = stateDispatcher.next(makeAttack({ attack: meleeAttack, weaponId: meleeWeapon.id, targets: [targetEnemy] }), dungeonState)

    // Assert
    expect(dungeonState.board.getObjectById(dungeonState.hero.id)?.position).toStrictEqual(enemyField);
  })

  // it('should go through dungeon and gain rewards', () => {
  //   expect(dungeonState.turn).toEqual(1); 

  //   const charactersInArea = adventureState.getAllCharactersFromOccupiedArea();
  //   expect(charactersInArea.length).toEqual(1);

  //   const vendor = charactersInArea[0];
  //   expect(vendor.assignedAreaId).toEqual(firstAreaTavern.id);

  //   const itemToPurchase = vendor.inventory.getItem(magicPoo)!;
  //   expect(itemToPurchase).toBeTruthy();
  // });

});