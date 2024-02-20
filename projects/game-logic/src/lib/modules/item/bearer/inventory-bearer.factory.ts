import { IEntity, IEntityFactory } from "../../../base/entity/entity.interface";
import { InventoryBearer } from "./inventory-bearer";
import { IInventoryBearer } from "./inventory-bearer.interface";


export class InventoryBearerFactory implements IEntityFactory<IInventoryBearer> {

  public get classDefinition() { return InventoryBearer };

  constructor(
    //private readonly _dataFeed: IAbilityDataFeed
  ) { }
  
  public create(e: IInventoryBearer & IEntity): InventoryBearer {
    return new InventoryBearer(e);
  };

  public validate(e: IEntity & Partial<IInventoryBearer>): boolean {
    return e.isInventoryBearer;
  };
}