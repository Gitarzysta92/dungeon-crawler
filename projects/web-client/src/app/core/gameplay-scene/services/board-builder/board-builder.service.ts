import { Injectable } from "@angular/core";
import { IBoardDeclaration } from "@3d-scene/scene/interfaces/declarations/board-declaration";
import { ISceneFieldDeclaration } from "@3d-scene/scene/interfaces/declarations/field-declaration";
import { IBoardApperance } from "../../models/board-apperance";
import { IBoardField } from "../../models/board-field";

@Injectable()
export class BoardBuilderService {

  public buildBoardDefinition(apperance: IBoardApperance, fields: IBoardField[]): IBoardDeclaration {
    return {
      type: "hexagonal-game-board",
      coords: { x: 0, y: 0, z: 0 },
      apperance: {
        primaryColor: 0x000,
        secondaryColor: 0x000
      },
      fields: this._buildFieldDeclarations(fields)
    }
  }

  private _buildFieldDeclarations(fields: IBoardField[]): ISceneFieldDeclaration[] {
    return fields.map(f => ({
      auxCoords: "1",
      auxId: "1",
      coords: { x: 2, y: 3, z: 0 },
      disabled: true,
      highlighted: {
        color: 0
      }
    }));
  }
}