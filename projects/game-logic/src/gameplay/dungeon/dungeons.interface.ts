import { IPlayer } from "../../lib/base/player/players.interface";
import { Guid } from "../../lib/extensions/types";
import { IAassignedBoardObject } from "../../lib/modules/board/entities/board-object/board-object.interface";
import { IBoardAssignment } from "../../lib/modules/board/entities/board-object/board-object.interface";


export type IDungeonTemplate =
  {
    id: Guid;
    predefinedPlayers: IPlayer[];
    playersNumber: number;
    spawnPoints: IBoardAssignment[];
    actors: ({ id?: Guid, sourceActorId?: Guid, groupId?: Guid } & Partial<IAassignedBoardObject>)[];
  };


export interface IDungeonDataFeed {
  getDungeonGameplayTemplates: (ids?: Guid[]) => Promise<IDungeonTemplate[]>;
  getDungeonGameplayTemplate: (id: Guid) => Promise<IDungeonTemplate>;
}

export interface IDungeonExit {
  isDungeonExit: true;
  applyExitBonus: boolean;
}
