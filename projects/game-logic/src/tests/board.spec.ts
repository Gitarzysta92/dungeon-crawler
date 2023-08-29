import { obstacleActor } from "../data/actors.data";
import { dungeon } from "../data/dungeon.data";
import { dataFeed } from "../data/feed.data";
import { move } from "../data/skills-and-spells.data";
import { makeMove } from "../lib/activities/player-activities/make-move.directive";
import { IBoardObjectRotation } from "../lib/features/board/board.interface";
import { AdventureState } from "../lib/game/adventure-state";
import { DungeonState } from "../lib/game/dungeon-state";
import { StateFactory } from "../lib/game/state.factory";
import { createAdventureState, createStateDispatcher } from "./test-helpers";

describe('board', () => {

  const stateDispatcher = createStateDispatcher();
  
  let adventureState: AdventureState;
  let dungeonState: DungeonState;

  beforeEach(() => {
    adventureState = createAdventureState();
    dungeonState = StateFactory.createDungeonState(adventureState, dataFeed, dungeon);
  });

  it('Should move hero to given field', () => {
    // Arrange
    const targetField = { r: 1, q: 0, s: -1 };
    const heroInitialMoveActions = dungeonState.hero.moveActions;
    const moveUtilizationCost = move.utilizationCost[0];
    dungeonState.hero.speed = 1;

    // Act
    dungeonState = stateDispatcher.next(makeMove({ setup: move, to: targetField }), dungeonState);

    // Assert
    expect(dungeonState.board.getObjectById(dungeonState.hero.id)?.position).toStrictEqual(targetField);
    expect(dungeonState.hero.moveActions).toEqual(heroInitialMoveActions - moveUtilizationCost.costValue)
  });

  it('Should not move hero to given occupied field', () => {
    // Arrange
    const targetField = { r: 1, q: 0, s: -1 };
    const obstacle = Object.assign({ ...obstacleActor }, {
      id: "87968211-950E-4C42-9574-CD66485CA90D",
      position: null,
      rotation: 1 as IBoardObjectRotation
    })
    dungeonState.board.assignObject(obstacle, targetField);

    // Act
    const act = () => stateDispatcher.next(makeMove({ setup: move, to: targetField }), dungeonState);

    // Assert
    expect(act).toThrowError();
  });

  it('Should not move hero to given field for not enough hero speed', () => {
    // Arrange
    const targetField = { r: 1, q: 0, s: -1 };
    dungeonState.hero.speed = 0;

    // Act
    const act = () => dungeonState = stateDispatcher.next(makeMove({ setup: move, to: targetField }), dungeonState);

    // Assert
    expect(act).toThrowError();
  });

});