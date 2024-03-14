import { IClonable } from "../../extensions/interfaces";
import { ISerializable } from "../../extensions/json-serializer";
import { IEntity } from "./entity.interface";

export class Entity implements IEntity, IClonable, ISerializable<IEntity> {
  public id: string;
  public toRemove?: boolean;
  public isEntity: true = true;

  constructor(data: IEntity) { }

  protected onInitialize() { };
  protected onDestroy() { };

  public toJSON(): IEntity {
    return this;
  }
  public clone(): Entity {
    return this;
  };
};
