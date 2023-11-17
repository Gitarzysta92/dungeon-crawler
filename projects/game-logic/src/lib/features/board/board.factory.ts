import { v4 } from "uuid";
import { ActorType } from "../actors/actors.constants";
import { Board } from "./board";
import { IBoardConfiguration } from "./board.interface";
import { CoordsHelper } from "./coords.helper";

export function createDungeonBoard(config: IBoardConfiguration): Board {
  return new Board({  
    actorType: ActorType.Board,
    fields: Object.fromEntries(config.coords.map(bc => [CoordsHelper.createKeyFromCoordinates(bc), { id: CoordsHelper.createKeyFromCoordinates(bc), coords: bc }])),
    objects: Object.fromEntries(config.boardObjects.map(o => [CoordsHelper.createKeyFromCoordinates(o.position!), o])),
    id: v4(),
    lastingEffects: []
  });
}