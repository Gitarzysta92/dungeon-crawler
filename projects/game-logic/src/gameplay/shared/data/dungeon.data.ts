
import { IDungeonTemplate } from "../../dungeon/dungeons.interface";
import { commonField, dungeonExitActor, obstacleActor, ratActor, treasureActor } from "./actors.data";
import { COMPUTER_GROUP_ID, DUNGEON_DECK_ID } from "./common-identifiers.data";
import { computerPlayer } from "./players.data";

export const dungeonTemplate: IDungeonTemplate = {
  id: "6ACC198B-5951-4E52-BCFC-29C72CFF8004",
  playersNumber: 2,
  predefinedPlayers: [computerPlayer],
  spawnPoints: [{ position: { r: 2, q: 0, s: -2 }, rotation: 0 }],
  actors: [
    { sourceActorId: commonField.id, position: { r: -2, q: 0, s: 2 } },
    { sourceActorId: commonField.id, position: { r: -2, q: 1, s: 1 } },
    { sourceActorId: commonField.id, position: { r: -2, q: 2, s: 0 } },
    { sourceActorId: commonField.id, position: { r: -1, q: -1, s: 2 } },
    { sourceActorId: commonField.id, position: { r: -1, q: 0, s: 1 } },
    { sourceActorId: commonField.id, position: { r: -1, q: 1, s: 0 } },
    { sourceActorId: commonField.id, position: { r: -1, q: 2, s: -1 } },
    { sourceActorId: commonField.id, position: { r: 0, q: -2, s: 2 } },
    { sourceActorId: commonField.id, position: { r: 0, q: -1, s: 1 } },
    { sourceActorId: commonField.id, position: { r: 0, q: 0, s: 0 } },
    { sourceActorId: commonField.id, position: { r: 0, q: 1, s: -1 } },
    { sourceActorId: commonField.id, position: { r: 0, q: 2, s: -2 } },
    { sourceActorId: commonField.id, position: { r: 1, q: -2, s: 1 } },
    { sourceActorId: commonField.id, position: { r: 1, q: -1, s: 0 } },
    { sourceActorId: commonField.id, position: { r: 1, q: 0, s: -1 } },
    { sourceActorId: commonField.id, position: { r: 1, q: 1, s: -2 } },
    { sourceActorId: commonField.id, position: { r: 2, q: -2, s: -0 } },
    { sourceActorId: commonField.id, position: { r: 2, q: -1, s: -1 } },
    { sourceActorId: commonField.id, position: { r: 2, q: 0, s: -2 } },
    { sourceActorId: DUNGEON_DECK_ID, groupId: COMPUTER_GROUP_ID },
    { sourceActorId: ratActor.id, groupId: COMPUTER_GROUP_ID, position: { r: -2, q: 0, s: 2 }, rotation: 0 },
    { sourceActorId: treasureActor.id },
    { sourceActorId: obstacleActor.id },
    { sourceActorId: dungeonExitActor.id }
  ]
}