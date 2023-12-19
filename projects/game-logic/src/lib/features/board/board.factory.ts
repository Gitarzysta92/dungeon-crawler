import { IAassignedBoardObject, IBoardState, IBoardAssignmentSlot, IBoardConfiguration, IBoardCoordinates, IBoardObject, IField } from "./board.interface";
import { CoordsHelper } from "./coords.helper";
import { ActorType } from "../actors/actors.constants";
import { BoardStateHandler } from "./board.state-handler";

export class BoardFactory {

  public static initializeBoardState(initialData: IBoardState<IField, IAassignedBoardObject>): BoardStateHandler<any, any> {
    return {} as BoardStateHandler<any, any>;
  }
  
  public static async buildDungeonBoard<T>(
    config: IBoardConfiguration<T>,
    abo: (T & IAassignedBoardObject)[]
  ): Promise<IBoardState<IField, T & IAassignedBoardObject>> {
    return {
      fields: Object.fromEntries(config.coords
        .map(bc => [CoordsHelper.createKeyFromCoordinates(bc), this.buildBoardField(bc)])),
      objects: Object.fromEntries([...abo, ...config.boardObjects].map(o => [CoordsHelper.createKeyFromCoordinates(o.position!), o]))
    }
  } 

  public static buildBoardField(coords: IBoardCoordinates): IField {
    return {
      id: CoordsHelper.createKeyFromCoordinates(coords),
      position: coords,
      actorType: ActorType.Field,
      lastingEffects: [],
      sourceActorId: ""
    }
  }

  public static createAssignedBoardObject<T>(bas: IBoardAssignmentSlot, bo: T & IBoardObject): T & IAassignedBoardObject {
    return Object.assign(bo, bas);
  }
}