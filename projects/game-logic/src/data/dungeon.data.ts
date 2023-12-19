import { ActorType } from "../lib/features/actors/actors.constants";
import { ICardsDeck } from "../lib/features/cards-deck/cards-deck.interface";
import { IDungeonTemplate } from "../lib/features/dungeon/dungeon.interface";
import { dungeonExitActor, obstacleActor, ratActor, treasureActor } from "./actors.data";
import { computerGroupId, dungeonDeckId, dungeonGroupId, playerGroupId } from "./common-identifiers.data";
import { computerPlayer } from "./players.data";

export const dungeonDeck: ICardsDeck = {
  id: dungeonDeckId,
  drawPerTurn: 3,
  groupId: dungeonGroupId,
  cardsToUtilize: [],
  utilizedCards: [],
  revealedCardIds: [],
  actorType: ActorType.CardsDeck,
  lastingEffects: [],
  cardsInDeck: [],
  sourceActorId: dungeonDeckId
}

export const dungeon: IDungeonTemplate = {
  dungeonId: "6ACC198B-5951-4E52-BCFC-29C72CFF8004",
  predefinedPlayers: [computerPlayer],
  groups: [
    { id: computerGroupId, spawnPoints: [] },
    { id: playerGroupId, spawnPoints: [ { position: { r: 2, q: 0, s: -2 }, rotation: 0 } ] }
  ],
  boardDeclarations: [
    { r: -2, q: 0, s: 2, actorId: treasureActor.id, rotation: 2 },
    { r: -2, q: 1, s: 1 },
    { r: -2, q: 2, s: 0, actorId: ratActor.id, rotation: 3 },
    { r: -1, q: -1, s: 2 },
    { r: -1, q: 0, s: 1 },
    { r: -1, q: 1, s: 0 },
    { r: -1, q: 2, s: -1 },
    { r: 0, q: -2, s: 2 },
    { r: 0, q: -1, s: 1 },
    { r: 0, q: 0, s: 0, actorId: obstacleActor.id, rotation: 0 },
    { r: 0, q: 1, s: -1 },
    { r: 0, q: 2, s: -2 },
    { r: 1, q: -2, s: 1 },
    { r: 1, q: -1, s: 0 },
    { r: 1, q: 0, s: -1 },
    { r: 1, q: 1, s: -2 },
    { r: 2, q: -2, s: -0 },
    { r: 2, q: -1, s: -1, actorId: dungeonExitActor.id, rotation: 0 },
    { r: 2, q: 0, s: -2 }
  ],
  actorDeclarations: [
    { actorId: dungeonDeckId, associatedPlayerId: computerPlayer.id },
    { actorId: dungeonDeckId },
    { actorId: treasureActor.id },
    { actorId: ratActor.id },
    { actorId: obstacleActor.id },
    { actorId: dungeonExitActor.id }
  ]
}