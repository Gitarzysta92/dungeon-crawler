import { IActionDeclaration } from "../../../../cross-cutting/action/action.interface";
import { IConditionHandler } from "../../../../cross-cutting/condition/condition.interface";
import { ResolvableReference, Guid } from "../../../../extensions/types";
import { IInventoryBearer } from "../../entities/bearer/inventory-bearer.interface";
import { ItemsService } from "../../items.service";

export const POSESS_ITEM_ACTION = "POSESS_ITEM_ACTION";

export interface IPossesItemConditionPayload {
  bearer: ResolvableReference<IInventoryBearer>;
  amount: number;
  itemId: Guid;
}

export class PossesItemCondition implements IConditionHandler<IPossesItemConditionPayload> {

  public delegateId = POSESS_ITEM_ACTION;

  constructor(
    private readonly _itemsService: ItemsService
  ) { }

  public isApplicableTo(m: IActionDeclaration<IPossesItemConditionPayload>): boolean {
    return this.delegateId === m.delegateId;
  }

  process(p: IPossesItemConditionPayload): boolean {
    return (p.bearer as IInventoryBearer).inventory.hasItem(p.itemId, p.amount);
  }


}