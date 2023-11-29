import { ActorType } from "../lib/features/actors/actors.constants";
import { IBoardObjectRotation } from "../lib/features/board/board.interface";
import { IDungeonDeck } from "../lib/features/dungeon/dungeon-deck.interface";
import { IDungeon } from "../lib/features/dungeon/dungeon.interface";
import { EffectName } from "../lib/features/effects/effects.constants";
import { dungeonExitActor, obstacleActor, ratActor, treasureActor } from "./actors.data";
import { dungeonAreaId, dungeonGroupId } from "./common-identifiers.data";
import { emptyCard, increaseEnemyAttackPowerCard, moveEnemyCard, spawnEnemyCard } from "./dungeon-cards.data";
import { increaseEnemyAttackPower, moveEnemy, spawnEnemy } from "./skills-and-spells.data";

export const dungeonDeck: IDungeonDeck = {
  id: "86FA22F6-5425-4FC6-BB41-657F53A73B1B",
  drawPerTurn: 3,
  groupId: dungeonGroupId,
  cardsToUtilize: [],
  utilizedCards: [],
  revealedCardIds: [],
  actorType: ActorType.DungeonDeck,
  lastingEffects: [],
  cardsInDeck: []
}

const obstacle = Object.assign({ ...obstacleActor }, {
  id: obstacleActor.id,
  rotation: 0 as IBoardObjectRotation,
  position: { r: 0, q: 0, s: 0 }
});

const treasure = Object.assign({ ...treasureActor }, {
  id: treasureActor.id,
  rotation: 2 as IBoardObjectRotation,
  position: { r: -2, q: 0, s: 2 },
});

const rat = Object.assign({ ...ratActor }, {
  id: ratActor.id,
  rotation: 3 as IBoardObjectRotation,
  position: { r: -2, q: 2, s: 0 },
})

const firstDungeonExit = Object.assign({ ...dungeonExitActor }, {
  id: dungeonExitActor.id,
  rotation: 0 as IBoardObjectRotation,
  position: { r: 2, q: -1, s: -1 },
  applyExitPenalty: false
})

const secondDungeonExit = Object.assign({ ...dungeonExitActor }, {
  id: dungeonExitActor.id,
  rotation: 0 as IBoardObjectRotation,
  position: { r: 2, q: -1, s: -1 },
  applyExitBonus: true
})


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
      obstacle,
      treasure,
      rat,
      firstDungeonExit,
      secondDungeonExit
    ]
  },
  dungeonDeckConfiguration: {
    initialCardsAmount: 10,
    drawPerTurn: 3,
    emptyCardsAmount: 1,
    revealedCardIds: [],
    possibleCardIds:[
      emptyCard,
      increaseEnemyAttackPowerCard,
      moveEnemyCard,
      spawnEnemyCard,
    ].map(c => c.id),
  },
  assignedAreaId: dungeonAreaId
}


export const dungeonScenario = [
  {
    dungeonCardEffects: [
      {
        effectData: {
          effectId: increaseEnemyAttackPower.id,
          effectName: EffectName.ModifyStats,
          payload: [rat]
        }
      },
      {
        effectData: {
          effectId: moveEnemy.id,
          effectName: EffectName.ModifyPosition,
          payload: [
            {
              coords: { r: -1, q: 1, s: 0 },
              actorId: rat.id,
              rotation: 0
            }
          ]
        },
      },
      {
        effectData: {
          effectId: spawnEnemy.id,
          effectName: EffectName.SpawnActor,
          payload: [
            {
              coords: { r: -2, q: 2, s: 0 },
              sourceActorId: ratActor.id
            }
          ]
        }
      }
    ]
  }
]
