import { IBoardObject } from "../board/board.interface";
import { IDungeonDeckConfiguration } from "./dungeon-deck.interface";
import { IDungeonConfiguration } from "./dungeon.interface";

export class DungeonConfigration implements IDungeonConfiguration {
  id: string;
  playerSpawnPoint: Omit<IBoardObject, "id">;
  assignedAreaId: string;
  dungeonDeckConfiguration: Partial<IDungeonDeckConfiguration>;

  constructor(data: IDungeonConfiguration) {
    this.id = data.id;
    this.playerSpawnPoint = data.playerSpawnPoint;
    this.assignedAreaId = data.assignedAreaId;
    this.dungeonDeckConfiguration = data.dungeonDeckConfiguration;
  }

}