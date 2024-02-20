import { IEntityFactory, IEntity } from "../../../base/entity/entity.interface";
import { IAreaDataFeed } from "../area.interface";
import { AreaObject } from "./area-object";
import { IAreaObject } from "./area-object.interface";

export class AreaObjectFactory implements IEntityFactory<IAreaObject> {

  public get classDefinition() { return AreaObject };

  constructor(
    private readonly _dataFeed: IAreaDataFeed
  ) { }
  
  public create(e: IAreaObject): AreaObject {
    return new AreaObject(e);
  };

  public validate(e: IEntity & Partial<IAreaObject>): boolean {
    return e.isAreaObject;
  };

}