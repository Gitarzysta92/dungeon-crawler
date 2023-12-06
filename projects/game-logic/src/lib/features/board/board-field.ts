import { ActorType } from "../actors/actors.constants";
import { IEffect } from "../effects/resolve-effect.interface";
import { IBoardCoordinates, IField } from "./board.interface";
import { CoordsHelper } from "./coords.helper";

export class BoardField implements IField {
  id: string;
  actorType: ActorType.Field = ActorType.Field;
  lastingEffects: IEffect[] = [];
  position: IBoardCoordinates;
  sourceActorId: string;
  positionId: `${IBoardCoordinates['r']}${IBoardCoordinates['q']}${IBoardCoordinates['s']}`;
  groupId?: string;

  constructor(
    private _data: IField,
    public isOccupied: () => boolean
  ) {
    this.id = this._data.id;
    this.position = this._data.position;
    this.lastingEffects = this._data.lastingEffects;
    this.sourceActorId = this._data.sourceActorId;
    this.positionId = CoordsHelper.createKeyFromCoordinates(this._data.position)
  }
}