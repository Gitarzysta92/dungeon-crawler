import { IEntityFactory, IEntity } from "../../../base/entity/entity.interface";
import { Defeatable } from "./defeatable";
import { IDefeatable } from "./defeatable.interface";

export class DefeatableFactory implements IEntityFactory<Defeatable> {

  public get classDefinition() { return Defeatable };

  constructor() { }
  
  public create(e: IDefeatable<[]>): Defeatable {
    return new Defeatable(e);
  };

  public validate(e: IEntity & Partial<IDefeatable<[]>>): boolean {
    return e.isDefeatable;
  };

}