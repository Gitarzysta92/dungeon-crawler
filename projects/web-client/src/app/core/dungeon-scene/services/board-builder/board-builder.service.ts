import { Injectable } from "@angular/core";
import { IBoardDeclaration } from "@3d-scene/scene/interfaces/declarations/board-declaration";
import { ISceneFieldDeclaration } from "@3d-scene/scene/interfaces/declarations/field-declaration";
import { MapVectorToRawVector } from "@3d-scene/scene/types/map-vector-to-raw-vector";
import { IBoardApperance } from "../../interfaces/board-apperance.interface";

@Injectable()
export class BoardBuilderService {

  public buildBoardDefinition(
    apperance: IBoardApperance,
    fields: MapVectorToRawVector<ISceneFieldDeclaration>[]
  ): IBoardDeclaration {
    return {
      type: "hexagonal-game-board",
      coords: { x: 0, y: 0, z: 0 },
      apperance: apperance,
      fields: fields
    }
  }
}