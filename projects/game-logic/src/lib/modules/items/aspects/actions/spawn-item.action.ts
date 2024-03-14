
import { IActionDeclaration, IActionHandler } from "../../../../cross-cutting/action/action.interface";
import { ResolvableReference, Guid } from "../../../../extensions/types";
import { IInventoryBearer } from "../../entities/bearer/inventory-bearer.interface";
import { ItemsService } from "../../items.service";


export const SPAWN_ITEM_ACTION = "SPAWN_ITEM_ACTION";

export interface ISpawnItemActionPayload {
  bearer: ResolvableReference<IInventoryBearer>;
  amount: number;
  sourceItemId: Guid;
}

export class SpawnItemAction implements IActionHandler<ISpawnItemActionPayload> {

  public delegateId = SPAWN_ITEM_ACTION;

  constructor(
    private readonly _itemsService: ItemsService
  ) { }


  public isApplicableTo(m: IActionDeclaration<ISpawnItemActionPayload>): boolean {
    return this.delegateId === m.delegateId;
  }

  public async process(payload: ISpawnItemActionPayload): Promise<void> {    
    await this._itemsService.addItem(payload.bearer as IInventoryBearer, payload.sourceItemId, payload.amount);
  }

}