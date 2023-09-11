import { Injectable } from "@angular/core";
import { IBoardDeclaration } from "@3d-scene/scene/interfaces/declarations/board-declaration";
import { ISceneFieldDeclaration } from "@3d-scene/scene/interfaces/declarations/field-declaration";
import { IBoardApperance } from "../../models/board-apperance";
import { MapVectorToRawVector } from "@3d-scene/scene/types/map-vector-to-raw-vector";

@Injectable()
export class BoardBuilderService {

  public buildBoardDefinition(apperance: IBoardApperance, fields: MapVectorToRawVector<ISceneFieldDeclaration>[]): IBoardDeclaration {
    return {
      type: "hexagonal-game-board",
      coords: { x: 0, y: 0, z: 0 },
      apperance: {
        primaryColor: 0x000,
        secondaryColor: 0x000
      },
      fields: fields
    }
  }
}