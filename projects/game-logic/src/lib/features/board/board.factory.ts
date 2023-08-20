import { v4 } from "uuid";
import { Board } from "./board";
import { IBoardConfiguration } from "./board.interface";
import { CoordsHelper } from "./coords.helper";

export function createDungeonBoard(config: IBoardConfiguration): Board {
  return new Board({
    fields: Object.fromEntries(config.coords.map(bc => [CoordsHelper.createKeyFromCoordinates(bc), { id: v4(), coords: bc }])),
    objects: Object.fromEntries(config.boardObjects.map(o => [CoordsHelper.createKeyFromCoordinates(o.position!), o]))
  });
}