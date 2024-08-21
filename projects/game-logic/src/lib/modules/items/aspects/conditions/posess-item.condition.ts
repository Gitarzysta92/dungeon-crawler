import { IActionDeclaration } from "../../../../cross-cutting/action/action.interface";
import { IConditionHandler } from "../../../../cross-cutting/condition/condition.interface";
import { Guid, ResolvableReference } from "../../../../infrastructure/extensions/types";
import { IInventoryBearer } from "../../entities/bearer/inventory-bearer.interface";
import { ItemsService } from "../../items.service";

export const ITEM_POSSESED = "ITEM_POSSESED";

export interface IPossesItemConditionPayload {
  bearer: ResolvableReference<IInventoryBearer>;
  amount: number;
  itemId: Guid;
}

export class PossesItemCondition implements IConditionHandler<IPossesItemConditionPayload> {

  public delegateId = ITEM_POSSESED;

  constructor(
    private readonly _itemsService: ItemsService
  ) { }

  public isApplicableTo(m: IActionDeclaration<IPossesItemConditionPayload>): boolean {
    return this.delegateId === m.delegateId;
  }

  process(p: IPossesItemConditionPayload): boolean {
    return (p.bearer as IInventoryBearer).possessItem(p.itemId, p.amount);
  }


}