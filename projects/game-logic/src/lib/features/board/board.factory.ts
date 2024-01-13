import { IAassignedBoardObject, IBoardState, IBoardAssignment, IBoardConfiguration, IBoardCoordinates, IBoardObject, IField } from "./board.interface";
import { CoordsHelper } from "./coords.helper";
import { ActorType } from "../actors/actors.constants";
import { BoardService } from "./board.service";

export class BoardFactory {

  public initializeBoardState(initialData: IBoardState<IField, IAassignedBoardObject>): BoardService<any, any> {
    return {} as BoardService<any, any>;
  }
  
  public async build<T>(
    config: IBoardConfiguration,
    abo: (T & IAassignedBoardObject)[]
  ): Promise<IBoardState<IField, T & IAassignedBoardObject>> {
    return {
      fields: Object.fromEntries(config.coords
        .map(bc => [CoordsHelper.createKeyFromCoordinates(bc), this.buildBoardField(bc)])),
      objects: Object.fromEntries(abo.map(o => [CoordsHelper.createKeyFromCoordinates(o.position!), o]))
    }
  } 

  public buildBoardField(coords: IBoardCoordinates): IField {
    return {
      id: CoordsHelper.createKeyFromCoordinates(coords),
      position: coords,
      actorType: ActorType.Field,
      lastingEffects: [],
      sourceActorId: ""
    }
  }

  public createAssignedBoardObject<T>(bas: IBoardAssignment, bo: T & IBoardObject): T & IAassignedBoardObject {
    return Object.assign(bo, bas);
  }
}