import { IBoardAssignmentSlot, IBoardConfiguration } from "../board/board.interface";
import { IDungeonDeckConfiguration } from "./dungeon-deck.interface";
import { IDungeon } from "./dungeon.interface";

export class Dungeon implements IDungeon {
  id: string;
  playerSpawnPoint: IBoardAssignmentSlot;
  boardConfiguration: IBoardConfiguration;
  dungeonDeckConfiguration: IDungeonDeckConfiguration;
  assignedAreaId: string;

  constructor(data: IDungeon) {
    this.id = data.id;
    this.playerSpawnPoint = data.playerSpawnPoint;
    this.boardConfiguration = data.boardConfiguration;
    this.dungeonDeckConfiguration = data.dungeonDeckConfiguration;
    this.assignedAreaId = data.assignedAreaId;
  }

}