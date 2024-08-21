import { IActionDeclaration } from "../../../../cross-cutting/action/action.interface";
import { IConditionHandler } from "../../../../cross-cutting/condition/condition.interface";
import { ResolvableReference, Guid } from "../../../../infrastructure/extensions/types";
import { IInventoryBearer } from "../../entities/bearer/inventory-bearer.interface";
import { ItemsService } from "../../items.service";
import { IPossesItemConditionPayload } from "./posess-item.condition";

export const ITEM_EQUIPPED = "ITEM_EQUIPPED";

export interface IEquippedConditionPayload {
  bearer: ResolvableReference<IInventoryBearer>;
  amount: number;
  itemId: Guid;
}

export class EquippedCondition implements IConditionHandler<IEquippedConditionPayload> {

  public delegateId = ITEM_EQUIPPED;

  constructor(
    private readonly _itemsService: ItemsService
  ) { }

  public isApplicableTo(m: IActionDeclaration<IEquippedConditionPayload>): boolean {
    return this.delegateId === m.delegateId;
  }

  process(p: IPossesItemConditionPayload): boolean {
    return (p.bearer as IInventoryBearer).possessItem(p.itemId, p.amount);
  }


}