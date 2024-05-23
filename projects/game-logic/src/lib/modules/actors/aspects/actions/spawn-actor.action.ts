import { IActionDeclaration, IActionHandler } from "../../../../cross-cutting/action/action.interface";
import { Guid, ResolvableReference } from "../../../../infrastructure/extensions/types";
import { IActorDataFeed } from "../../actors.interface";
import { ActorsService } from "../../actors.service";


export const SPAWN_ACTOR_ACTION_IDENTIFIER = "SPAWN_ACTOR_ACTION_IDENTIFIER";

export interface ISpawnActorActionPayload {
  id: ResolvableReference<Guid>;
  sourceActorId: Guid;
}

export class SpawnActorAction implements IActionHandler<ISpawnActorActionPayload> {

  public delegateId: string;

  constructor(
    private readonly _dataFeed: IActorDataFeed,
    private readonly _actorsService: ActorsService
  ) { }


  public isApplicableTo(m: IActionDeclaration<ISpawnActorActionPayload>): boolean {
    return this.delegateId === m.delegateId;
  }

  public prepare: (ctx: unknown, d: ISpawnActorActionPayload) => ISpawnActorActionPayload;


  public async process(payload: ISpawnActorActionPayload): Promise<void> {
    const actor = await this._dataFeed.getActor(payload.sourceActorId);
    
    if (!actor) {
      throw new Error('There are no actors of given id');
    }
    
    this._actorsService.addActor(actor);
  }

}