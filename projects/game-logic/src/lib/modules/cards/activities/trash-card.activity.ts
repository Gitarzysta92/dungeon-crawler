import { IActivity, IActivityCost, IActivityDeclaration, IActivitySubject } from "../../../base/activity/activity.interface";
import { IProcedure, IProcedureContext } from "../../../base/procedure/procedure.interface";
import { IGatheringController } from "../../../cross-cutting/gatherer/data-gatherer.interface";
import { NotEnumerable } from "../../../infrastructure/extensions/object-traverser";
import { Constructor } from "../../../infrastructure/extensions/types";
import { IMixinFactory } from "../../../infrastructure/mixin/mixin.interface";
import { TrashAction } from "../aspects/actions/trash.action";
import { TRASH_CARD_ACTIVITY } from "../cards.constants";
import { ICard } from "../entities/card/card.interface";
import { IDeckBearer } from "../entities/deck-bearer/deck-bearer.interface";

export class TrashCardActivityFactory implements IMixinFactory<IActivity> {

  constructor(
    private readonly _trashAction: TrashAction
  ) { }

  public validate(a: IActivity): boolean {
    return a.isActivity && a.id === TRASH_CARD_ACTIVITY;
  }

  public create(c: Constructor<IProcedure>): Constructor<IActivity> {
    const trashAction = this._trashAction;
    class TrashCardActivity extends c implements IActivity {

      id = TRASH_CARD_ACTIVITY;
      get card(): ICard | undefined { return this.subject as ICard };
      isActivity = true as const;
      cost?: IActivityCost[];

      @NotEnumerable()
      subject: IActivitySubject & ICard;

      constructor(d: IActivityDeclaration) {
        super(d);
        this.id = d.id;
        this.cost = d.cost ?? [];
      }


      public canBeDispatched(bearer: IDeckBearer): boolean {
        if (!this.card) {
          return false;
        }

        if (!bearer.deck.hasCard(this.card)) {
          return false;
        }

        return bearer.validateActivityResources(this.cost);
      }

      public async *dispatch2(
        bearer: IDeckBearer,
        context: IProcedureContext & { controller: IGatheringController }
      ): AsyncGenerator {
        if (!this.canBeDispatched(bearer)) {
          throw new Error("Activity cannot be performed");
        }
        await trashAction.process({ target: bearer, card: this.card }, {});
        
        for await (let result of this.perform(Object.assign({ subject: this.subject, performer: bearer }, context))) {
          yield result;
        }      
      }

      public async dispatch(): Promise<void> {}
    }

    return TrashCardActivity;
  }
}