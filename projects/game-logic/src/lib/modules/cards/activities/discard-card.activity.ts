import { IActivity, IActivityCost, IActivitySubject, IActivityDeclaration } from "../../../base/activity/activity.interface";
import { IProcedure } from "../../../base/procedure/procedure.interface";
import { IGatheringController } from "../../../cross-cutting/gatherer/data-gatherer.interface";
import { NotEnumerable } from "../../../infrastructure/extensions/object-traverser";
import { Constructor } from "../../../infrastructure/extensions/types";
import { IMixinFactory } from "../../../infrastructure/mixin/mixin.interface";
import { DiscardAction } from "../aspects/actions/discard.action";
import { DISCARD_CARD_ACTIVITY } from "../cards.constants";
import { ICardOnPile } from "../entities/card-on-pile/card-on-pile.interface";
import { IDeckBearer } from "../entities/deck-bearer/deck-bearer.interface";

export interface IDiscardCardActivity extends IActivity {
  id: typeof DISCARD_CARD_ACTIVITY;
  canBeDone(bearer: IDeckBearer): boolean
  doActivity(bearer: IDeckBearer, controller: IGatheringController): AsyncGenerator
}

export class DiscardCardActivityFactory implements IMixinFactory<IActivity> {

  constructor(
    private readonly _discardAction: DiscardAction
  ) { }

  public isApplicable(a: IActivity): boolean {
    return a.isActivity && a.id === DISCARD_CARD_ACTIVITY;
  }

  public create(c: Constructor<Partial<IProcedure>>): Constructor<IActivity> {
    const discardAction = this._discardAction;
    class DiscardCardActivity extends c implements IDiscardCardActivity {

      public id = DISCARD_CARD_ACTIVITY;
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
        if (!bearer.hand.hasCardOnPile(this.card)) {
          return false;
        }

        return bearer.validateActivityResources(this.cost);
      }

      public async *doActivity(
        bearer: IDeckBearer,
        controller: IGatheringController
      ): AsyncGenerator {
        if (!this.canBeDone(bearer)) {
          throw new Error("Activity cannot be performed");
        }
        
        await discardAction.process({ target: bearer, card: this.card });
        const data = Object.assign({ performer: bearer, subject: this.subject }, this);
        if (this.perform) {
          for await (let result of this.perform({ controller, data: data })) {
            yield result;
          }  
        }    
      }
    }

    return DiscardCardActivity;
  }
}