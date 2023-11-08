import { IDungeon } from "@game-logic/lib/features/dungeon/dungeon.interface";
import { IDataFeedEntityBase } from "./data-feed-entity.interface";
import { ITerrainDeclaration } from "@3d-scene/scene/interfaces/declarations/terrain-declaration";
import { IBoardDeclaration } from "@3d-scene/scene/interfaces/declarations/board-declaration";
import { ILightDeclaration } from "@3d-scene/index";

export interface IDungeonDataFeedEntity extends IDataFeedEntityBase, IDungeon {
  //entityType: DataFeedEntityType.Dungeon,
  informative: { name: string, description: string }
  visualScene: {
    terrain: ITerrainDeclaration,
    board: IBoardDeclaration,
    lights: ILightDeclaration[];
  }
}