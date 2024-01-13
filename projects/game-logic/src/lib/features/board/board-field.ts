import { ActorType } from "../actors/actors.constants";
import { Size } from "./board.constants";
import { IEffect } from "../effects/resolve-effect.interface";
import { IBoardCoordinates, IBoardField} from "./board.interface";
import { CoordsHelper } from "./coords.helper";

export class BoardField implements IBoardField {
  id: string;
  actorType: ActorType.Field = ActorType.Field;
  lastingEffects: IEffect[] = [];
  position: IBoardCoordinates;
  sourceActorId: string;
  positionId: `${IBoardCoordinates['r']}${IBoardCoordinates['q']}${IBoardCoordinates['s']}`;
  groupId?: string;

  constructor(
    private _data: IBoardField,
    public isOccupied: () => boolean
  ) {
    this.position = this._data.position;
    this.positionId = CoordsHelper.createKeyFromCoordinates(this._data.position)
  }
  size: Size;
}