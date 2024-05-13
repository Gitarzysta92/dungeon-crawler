import { IBoardObjectRotation } from "../../lib/modules/board/board.interface";
import { IDungeonAreaDeclaration } from "../modules/dungeon/mixins/dungeon-area/dungeon-area.interface";
import { commonField, dungeonExitActor, obstacleActor, ratActor, treasureActor } from "./actors.data";
import { COMPUTER_GROUP_ID, DUNGEON_DECK_ID } from "./common-identifiers.data";
import { computerPlayer } from "./players.data";

export const dungeonTemplate: IDungeonAreaDeclaration = {
  id: "6ACC198B-5951-4E52-BCFC-29C72CFF8004",
  playersNumber: 2,
  predefinedPlayers: [computerPlayer],
  spawnPoints: [{ position: { r: 2, q: 0, s: -2 }, rotation: 0 }],
  activities: [

  ],
  entities: [
    Object.assign({ sourceActorId: commonField.id, position: { r: -2, q: 0, s: 2 } }, commonField),
    Object.assign({ sourceActorId: commonField.id, position: { r: -2, q: 1, s: 1 } }, commonField),
    Object.assign({ sourceActorId: commonField.id, position: { r: -2, q: 2, s: 0 } }, commonField),
    Object.assign({ sourceActorId: commonField.id, position: { r: -1, q: -1, s: 2 } }, commonField),
    Object.assign({ sourceActorId: commonField.id, position: { r: -1, q: 0, s: 1 } }, commonField),
    Object.assign({ sourceActorId: commonField.id, position: { r: -1, q: 1, s: 0 } }, commonField),
    Object.assign({ sourceActorId: commonField.id, position: { r: -1, q: 2, s: -1 } }, commonField),
    Object.assign({ sourceActorId: commonField.id, position: { r: 0, q: -2, s: 2 } }, commonField),
    Object.assign({ sourceActorId: commonField.id, position: { r: 0, q: -1, s: 1 } }, commonField),
    Object.assign({ sourceActorId: commonField.id, position: { r: 0, q: 0, s: 0 } }, commonField),
    Object.assign({ sourceActorId: commonField.id, position: { r: 0, q: 1, s: -1 } }, commonField),
    Object.assign({ sourceActorId: commonField.id, position: { r: 0, q: 2, s: -2 } }, commonField),
    Object.assign({ sourceActorId: commonField.id, position: { r: 1, q: -2, s: 1 } }, commonField),
    Object.assign({ sourceActorId: commonField.id, position: { r: 1, q: -1, s: 0 } }, commonField),
    Object.assign({ sourceActorId: commonField.id, position: { r: 1, q: 0, s: -1 } }, commonField),
    Object.assign({ sourceActorId: commonField.id, position: { r: 1, q: 1, s: -2 } }, commonField),
    Object.assign({ sourceActorId: commonField.id, position: { r: 2, q: -2, s: -0 } }, commonField),
    Object.assign({ sourceActorId: commonField.id, position: { r: 2, q: -1, s: -1 } }, commonField),
    Object.assign({ sourceActorId: commonField.id, position: { r: 2, q: 0, s: -2 } }, commonField),
    Object.assign({ sourceActorId: DUNGEON_DECK_ID, groupId: COMPUTER_GROUP_ID }, commonField),
    Object.assign({ sourceActorId: ratActor.id, groupId: COMPUTER_GROUP_ID, position: { r: -2, q: 0, s: 2 }, rotation: 0 as IBoardObjectRotation }, commonField),
    Object.assign({ sourceActorId: treasureActor.id }, commonField),
    Object.assign({ sourceActorId: obstacleActor.id }, commonField),
    Object.assign({ sourceActorId: dungeonExitActor.id }, commonField),
  ],
  isDungeonArea: true,
  isEntity: true,
  isMixin: true,
  isActivitySubject: true
}