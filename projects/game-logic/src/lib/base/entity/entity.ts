import { IClonable } from "../../extensions/interfaces";
import { ISerializable } from "../../extensions/json-serializer";
import { IEntity } from "./entity.interface";

export class Entity implements IEntity, IClonable, ISerializable<IEntity> {
  public id: string;
  public toRemove?: boolean;
  public isEntity: true = true;

  constructor(data: IEntity) { 
    this.id = data.id;
    this.toRemove = data.toRemove;[]
  }

  public onInitialize() { };
  public onDestroy() { };

  public toJSON(): IEntity {
    return this;
  }
  public clone(): Entity {
    return this;
  };
};
