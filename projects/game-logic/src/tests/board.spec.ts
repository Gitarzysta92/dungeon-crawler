import { obstacleActor } from "../gameplay/data/actors.data";
import { dungeonTemplate } from "../gameplay/data/dungeon.data";
import { dataFeed } from "../gameplay/data/feed.data";
import { move } from "../gameplay/data/abilities.data";
import { makeMove } from "../framework/activities/player-activities/make-move.directive";
import { IBoardObjectRotation } from "../framework/modules/board/board.interface";
import { AdventureGameplay } from "../lib/gameplay/adventure/adventure-gameplay";
import { DungeonGameplay } from "../lib/gameplay/dungeon/dungeon-gameplay";
import { StateFactory } from "../framework/states/state.factory";
import { createAdventureState, createStateDispatcher } from "./test-helpers";

describe('board', () => {

  const stateDispatcher = createStateDispatcher();
  
  let adventureState: AdventureGameplay;
  let dungeonState: DungeonGameplay;

  beforeEach(() => {
    adventureState = createAdventureState();
    dungeonState = StateFactory.createDungeonState(adventureState, dataFeed, dungeonTemplate);
  });

  it('Should move hero to given field', () => {
    // Arrange
    const targetField = { r: 1, q: 0, s: -1 };
    const heroInitialMoveActions = dungeonState.hero.moveAction;
    const moveUtilizationCost = move.utilizationCost[0];
    dungeonState.hero.speed = 1;

    // Act
    dungeonState = stateDispatcher.next(makeMove({ setup: move, to: targetField }), dungeonState);

    // Assert
    expect(dungeonState.board.getObjectById(dungeonState.hero.id)?.position).toStrictEqual(targetField);
    expect(dungeonState.hero.moveAction).toEqual(heroInitialMoveActions - moveUtilizationCost.costValue)
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