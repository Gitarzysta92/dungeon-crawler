import { Board } from "./board";
import { IBoardConfiguration } from "./board.interface";
import { CoordsHelper } from "./coords.helper";
import { IActor } from "../actors/actors.interface";
import { ActorType } from "../actors/actors.constants";

export function createDungeonBoard<T extends IActor>(config: IBoardConfiguration): Board<T> {
  // TODO: remove any assertion
  return new Board<any>({
    fields: Object.fromEntries(config.coords.map(bc => [CoordsHelper.createKeyFromCoordinates(bc), {
      id: CoordsHelper.createKeyFromCoordinates(bc),
      position: bc,
      positionId: CoordsHelper.createKeyFromCoordinates(bc),
      actorType: ActorType.Field,
      lastingEffects: [],
      sourceActorId: ""
    }])),
    objects: Object.fromEntries(config.boardObjects.map(o => [CoordsHelper.createKeyFromCoordinates(o.position!), o]))
  });
}