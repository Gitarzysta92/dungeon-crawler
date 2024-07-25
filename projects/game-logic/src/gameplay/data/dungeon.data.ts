import { IBoardObjectRotation } from "../../lib/modules/board/board.interface";
import { IDungeonGameplayDeclaration } from "../modules/dungeon/dungeon.interface";
import { commonField, dungeonExitActor, obstacleActor, ratActor, treasureActor } from "./actors.data";
import { COMPUTER_GROUP_ID, DUNGEON_MASTER_ID } from "./common-identifiers.data";


export const dungeonDeclaration: IDungeonGameplayDeclaration = {
  id: "6ACC198B-5951-4E52-BCFC-29C72CFF8004",
  isDungeonGameplay: true,
  spawnPoints: [{ position: { r: -2, q: 1, s: 1 }, rotation: 0 as IBoardObjectRotation }],
  entities: [
    Object.assign({ ...commonField}, { id: "9CE384C6-BF3B-4EA7-9792-447A0B9ADA50", sourceActorId: commonField.id, position: { r: -2, q: 0, s: 2 } }),
    Object.assign({ ...commonField}, { id: "B2947C50-0D0B-4F7F-AD97-44626C3A547A", sourceActorId: commonField.id, position: { r: -2, q: 1, s: 1 } }),
    Object.assign({ ...commonField}, { id: "C5922710-134B-450B-BEC7-B69EDED19A64", sourceActorId: commonField.id, position: { r: -2, q: 2, s: 0 } }),
    Object.assign({ ...commonField}, { id: "F6744C06-833F-4145-B0DF-160AF56E900F", sourceActorId: commonField.id, position: { r: -1, q: -1, s: 2 } }),
    Object.assign({ ...commonField}, { id: "CF4A4FE6-4800-4D83-BC99-BF8238EF4178", sourceActorId: commonField.id, position: { r: -1, q: 0, s: 1 } }),
    Object.assign({ ...commonField}, { id: "FE9F1844-8450-448B-92FB-037065062E07", sourceActorId: commonField.id, position: { r: -1, q: 1, s: 0 } }),
    Object.assign({ ...commonField}, { id: "34B7EA19-0F3F-4344-B2AB-6E3AF5B8136F", sourceActorId: commonField.id, position: { r: -1, q: 2, s: -1 } }),
    Object.assign({ ...commonField}, { id: "B12888E3-A3DC-4D8B-8E73-32EFE73F84DF", sourceActorId: commonField.id, position: { r: 0, q: -2, s: 2 } }),
    Object.assign({ ...commonField}, { id: "7985C41A-49AC-487F-8496-775427BFB972", sourceActorId: commonField.id, position: { r: 0, q: -1, s: 1 } }),
    Object.assign({ ...commonField}, { id: "AA62F595-EE91-47CF-9A00-209287AFDA67", sourceActorId: commonField.id, position: { r: 0, q: 0, s: 0 } }),
    Object.assign({ ...commonField}, { id: "E0D6A15A-3FDC-4072-AD20-AB2B17F09946", sourceActorId: commonField.id, position: { r: 0, q: 1, s: -1 } }),
    Object.assign({ ...commonField}, { id: "466055B1-EA84-44FF-ACD8-9A9DA6985853", sourceActorId: commonField.id, position: { r: 0, q: 2, s: -2 } }),
    Object.assign({ ...commonField}, { id: "11E2515C-A4C2-4BE5-B8F7-2DAEEF7BD830", sourceActorId: commonField.id, position: { r: 1, q: -2, s: 1 } }),
    Object.assign({ ...commonField}, { id: "AEC52B49-AF75-4ED9-B6C3-1A6DA3EAB1CF", sourceActorId: commonField.id, position: { r: 1, q: -1, s: 0 } }),
    Object.assign({ ...commonField}, { id: "7154DF78-65D9-4BA9-986F-CF91E678E057", sourceActorId: commonField.id, position: { r: 1, q: 0, s: -1 } }),
    Object.assign({ ...commonField}, { id: "C684C6C2-D184-4111-B6C0-0786CD44C897", sourceActorId: commonField.id, position: { r: 1, q: 1, s: -2 } }),
    Object.assign({ ...commonField}, { id: "9B9353D1-9864-4693-BCD9-DCEC68F6F65B", sourceActorId: commonField.id, position: { r: 2, q: -2, s: -0 } }),
    Object.assign({ ...commonField}, { id: "AAF73FE2-6863-4AAA-B18B-5CE057FCFCC6", sourceActorId: commonField.id, position: { r: 2, q: -1, s: -1 } }),
    Object.assign({ ...commonField}, { id: "927BE5BF-162B-4793-9874-7544FEAC2A72", sourceActorId: commonField.id, position: { r: 2, q: 0, s: -2 } }),
    Object.assign({ sourceActorId: DUNGEON_MASTER_ID, groupId: COMPUTER_GROUP_ID }, commonField),
    Object.assign({ sourceActorId: ratActor.id, groupId: COMPUTER_GROUP_ID, position: { r: -2, q: 0, s: 2 }, rotation: 0 as IBoardObjectRotation }, commonField),
    Object.assign({ sourceActorId: treasureActor.id }, commonField),
    Object.assign({ sourceActorId: obstacleActor.id }, commonField),
    Object.assign({ sourceActorId: dungeonExitActor.id }, commonField),
  ]
}