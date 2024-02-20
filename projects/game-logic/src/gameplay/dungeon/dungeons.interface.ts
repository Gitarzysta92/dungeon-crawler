import { IPlayer } from "../../lib/base/player/players.interface";
import { Guid } from "../../lib/extensions/types";
import { IBoardAssignment, IAassignedBoardObject } from "../../lib/modules/board/board.interface";


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
