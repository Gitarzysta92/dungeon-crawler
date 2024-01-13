import { IDungeonGameplayTemplate } from "../lib/gameplay/dungeon/dungeon-global-state.interface";
import { dungeonExitActor, obstacleActor, ratActor, treasureActor } from "./actors.data";
import { computerGroupId, dungeonDeckId, playerGroupId } from "./common-identifiers.data";
import { computerPlayer } from "./players.data";

export const dungeon: IDungeonGameplayTemplate = {
  dungeonId: "6ACC198B-5951-4E52-BCFC-29C72CFF8004",
  playersNumber: 2,
  predefinedPlayers: [computerPlayer],
  groups: [
    { id: computerGroupId, spawnPoints: [] },
    { id: playerGroupId, spawnPoints: [ { position: { r: 2, q: 0, s: -2 }, rotation: 0 } ] }
  ],
  fields: [
    { position: { r: -2, q: 0, s: 2 }}, { position: { r: -2, q: 1, s: 1 }}, { position: { r: -2, q: 2, s: 0 }},
    { position: { r: -1, q: -1, s: 2 }}, { position: { r: -1, q: 0, s: 1 }}, { position: { r: -1, q: 1, s: 0 }},
    { position: { r: -1, q: 2, s: -1 }}, { position: { r: 0, q: -2, s: 2 }}, { position: { r: 0, q: -1, s: 1 }},
    { position: { r: 0, q: 0, s: 0 }}, { position: { r: 0, q: 1, s: -1 }}, { position: { r: 0, q: 2, s: -2 }},
    { position: { r: 1, q: -2, s: 1 }}, { position: { r: 1, q: -1, s: 0 }}, { position: { r: 1, q: 0, s: -1 }},
    { position: { r: 1, q: 1, s: -2 }}, { position: { r: 2, q: -2, s: -0 }}, { position: { r: 2, q: -1, s: -1 }},
    { position: { r: 2, q: 0, s: -2 }}
  ],
  actors: [
    { id: dungeonDeckId, playerId: computerPlayer.id },
    { id: treasureActor.id },
    { id: ratActor.id },
    { id: obstacleActor.id },
    { id: dungeonExitActor.id }
  ]
}