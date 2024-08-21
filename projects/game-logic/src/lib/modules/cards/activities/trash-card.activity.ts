import { IActivity, IActivityCost, IActivityDeclaration, IActivitySubject } from "../../../base/activity/activity.interface";
import { IProcedure, IProcedureExecutionStatus } from "../../../base/procedure/procedure.interface";
import { IMakeActionStepDeclaration } from "../../../cross-cutting/action/action.interface";
import { IGatheringController, IGatheringDataStepDeclaration } from "../../../cross-cutting/gatherer/data-gatherer.interface";
import { NotEnumerable } from "../../../infrastructure/extensions/object-traverser";
import { Constructor } from "../../../infrastructure/extensions/types";
import { IMixinFactory } from "../../../infrastructure/mixin/mixin.interface";
import { TrashAction } from "../aspects/actions/trash.action";
import { TRASH_CARD_ACTIVITY } from "../cards.constants";
import { ICardOnPile } from "../entities/card-on-pile/card-on-pile.interface";
import { IDeckBearer } from "../entities/deck-bearer/deck-bearer.interface";

export interface ITrashCardActivity extends IActivity {
  id: typeof TRASH_CARD_ACTIVITY;
  canBeDone(bearer: IDeckBearer): boolean
  doActivity<T>(bearer: IDeckBearer, controller: IGatheringController): AsyncGenerator<IProcedureExecutionStatus<IGatheringDataStepDeclaration & IMakeActionStepDeclaration>>
}

export class TrashCardActivityFactory implements IMixinFactory<IActivity> {

  constructor(
    private readonly _trashAction: TrashAction
  ) { }

  public isApplicable(a: IActivity): boolean {
    return a.isActivity && a.id === TRASH_CARD_ACTIVITY;
  }

  public create(c: Constructor<Partial<IProcedure>>): Constructor<IActivity> {
    const trashAction = this._trashAction;
    class TrashCardActivity extends c implements ITrashCardActivity {

      public id = TRASH_CARD_ACTIVITY;
      public isActivity = true as const;
      public isMixin = true as const;
      public cost?: IActivityCost[];
      public get card(): ICardOnPile | undefined { return this.subject };
      @NotEnumerable()
      public subject: IActivitySubject & ICardOnPile;

      constructor(d: IActivityDeclaration) {
        super(d);
        this.id = d.id;
        this.cost = d.cost ?? [];
      }

      public canBeDone(bearer: IDeckBearer): boolean {
        if (!this.card) {
          return false;
        }
        if (!this.card.isCardOnPile) {
          return false;
        }
        if (!bearer.hand.hasCardOnPile(this.card)) {
          return false;
        }
        return bearer.validateActivityResources(this.cost);
      }

      public async *doActivity(bearer: IDeckBearer, controller: IGatheringController): AsyncGenerator<IProcedureExecutionStatus<IGatheringDataStepDeclaration & IMakeActionStepDeclaration>> {
        if (!this.canBeDone(bearer)) {
          throw new Error("Activity cannot be performed");
        }
        
        await trashAction.process({ target: bearer, card: this.card });
        const data = Object.assign({ performer: bearer, subject: this.subject }, this);
        if (this.perform) {
          for await (let result of this.perform({ controller, data: data  })) {
            yield result as any;
          }  
        }     
      }
    }

    return TrashCardActivity;
  }
}