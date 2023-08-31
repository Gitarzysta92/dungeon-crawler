import { ActorType } from "../lib/features/actors/actors.constants";
import { IBoardObjectRotation } from "../lib/features/board/board.interface";
import { IDungeonDeck } from "../lib/features/dungeon/dungeon-deck.interface";
import { IDungeon } from "../lib/features/dungeon/dungeon.interface";
import { dungeonExitActor, obstacleActor, ratActor, treasureActor } from "./actors.data";
import { dungeonAreaId } from "./common-identifiers.data";
import { groupId } from "./commons.data";
import { emptyCard, increaseEnemyAttackPower, moveEnemy, spawnEnemy } from "./dungeon-cards.data";

export const dungeonDeck: IDungeonDeck = {
  id: "86FA22F6-5425-4FC6-BB41-657F53A73B1B",
  drawPerTurn: 3,
  groupId: groupId,
  cardsToUtilize: [],
  utilizedCards: [],
  actorType: ActorType.DungeonDeck,
  effects: [],
  cardsInDeck: []
}


export const dungeon: IDungeon = {
  id: "6ACC198B-5951-4E52-BCFC-29C72CFF8004",
  playerSpawnPoint: {
    position: { r: 2, q: 0, s: -2 },
    rotation: 0
  },
  boardConfiguration: {
    coords: [
      { r: -2, q: 0, s: 2 },
      { r: -2, q: 1, s: 1 },
      { r: -2, q: 2, s: -0 },
      { r: -1, q: -1, s: 2 },
      { r: -1, q: 0, s: 1 },
      { r: -1, q: 1, s: -0 },
      { r: -1, q: 2, s: -1 },
      { r: 0, q: -2, s: 2 },
      { r: 0, q: -1, s: 1 },
      { r: 0, q: 0, s: -0 },
      { r: 0, q: 1, s: -1 },
      { r: 0, q: 2, s: -2 },
      { r: 1, q: -2, s: 1 },
      { r: 1, q: -1, s: -0 },
      { r: 1, q: 0, s: -1 },
      { r: 1, q: 1, s: -2 },
      { r: 2, q: -2, s: -0 },
      { r: 2, q: -1, s: -1 },
      { r: 2, q: 0, s: -2 }
    ],
    boardObjects: [
      Object.assign({ ...obstacleActor }, {
        id: obstacleActor.id,
        rotation: 0 as IBoardObjectRotation,
        position: { r: 0, q: 0, s: 0 }
      }),
      Object.assign({ ...treasureActor }, {
        id: treasureActor.id,
        rotation: 2 as IBoardObjectRotation,
        position: { r: -2, q: 0, s: 2 },
      }),
      Object.assign({ ...ratActor }, {
        id: ratActor.id,
        rotation: 3 as IBoardObjectRotation,
        position: { r: -2, q: 2, s: 0 },
      }),
      Object.assign({ ...dungeonExitActor }, {
        id: dungeonExitActor.id,
        rotation: 0 as IBoardObjectRotation,
        position: { r: 2, q: -1, s: -1 },
        applyExitPenalty: false
      }),
      Object.assign({ ...dungeonExitActor }, {
        id: dungeonExitActor.id,
        rotation: 0 as IBoardObjectRotation,
        position: { r: 2, q: -1, s: -1 },
        applyExitBonus: true
      })
    ]
  },
  dungeonDeckConfiguration: {
    initialCardsAmount: 10,
    drawPerTurn: 3,
    emptyCardsAmount: 1,
    revealedCardIds: [],
    possibleCardIds:[
      emptyCard,
      increaseEnemyAttackPower,
      moveEnemy,
      spawnEnemy,
    ].map(c => c.id),
  },
  assignedAreaId: dungeonAreaId
}


  // { r: 0, q: 0, s: 0 },
  // { r: -2, q: 0, s: 2 },
  // { r: -1, q: -1, s: 2 },
  // { r: 0, q: -2, s: 2 },
  // { r: 1, q: -2, s: 1 },
  // { r: 2, q: -2, s: 0 },
  // { r: 2, q: -1, s: -1 },
  // { r: 2, q: 0, s: -2 },
  // { r: 1, q: 1, s: -2 },
  // { r: 0, q: 2, s: -2 },
  // { r: -1, q: 2, s: -1 },
  // { r: -2, q: 2, s: 0 },
  // { r: -2, q: 1, s: 1 }