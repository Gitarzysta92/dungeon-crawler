import { IActivity, IActivityCost, IActivityDeclaration, IActivitySubject } from "../../../base/activity/activity.interface";
import { IProcedure, IProcedureContext } from "../../../base/procedure/procedure.interface";
import { IGatheringController, IGatheringDataStepContext } from "../../../cross-cutting/gatherer/data-gatherer.interface";
import { NotEnumerable } from "../../../infrastructure/extensions/object-traverser";
import { Constructor } from "../../../infrastructure/extensions/types";
import { IMixinFactory } from "../../../infrastructure/mixin/mixin.interface";
import { PLAY_CARD_ACTIVITY } from "../cards.constants";
import { ICard } from "../entities/card/card.interface";
import { IDeckBearer } from "../entities/deck-bearer/deck-bearer.interface";

export interface IPlayCardActivity extends IActivity {
  id: typeof PLAY_CARD_ACTIVITY;
  doActivity<T>(bearer: IDeckBearer, controller: IGatheringController): AsyncGenerator<T> 
}


export class PlayCardActivityFactory implements IMixinFactory<IActivity> {

  constructor() { }

  public isApplicable(a: IActivity): boolean {
    return a.isActivity && a.id === PLAY_CARD_ACTIVITY && a.isProcedure;
  }

  public create(c: Constructor<IProcedure>): Constructor<IActivity> {
    class PlayCardActivity extends c implements IPlayCardActivity {

      public id = PLAY_CARD_ACTIVITY;
      public get card(): ICard | undefined { return this.subject as ICard };
      public isActivity = true as const;
      public cost: IActivityCost[];

      @NotEnumerable()
      subject: IActivitySubject & ICard;

      constructor(d: IActivityDeclaration) {
        super(d);
        this.id = d.id;
        this.cost = d.cost ?? [];
      }

      public canBeDone(bearer: IDeckBearer): boolean {
        if (!this.card) {
          return false;
        }

        if (!bearer.deck.hasCard(this.card)) {
          return false;
        }

        return bearer.validateActivityResources(this.cost);
      }

      public async *doActivity<T>(performer: IDeckBearer, controller: IGatheringController): AsyncGenerator<T> {
        if (!this.canBeDone(performer)) {
          throw new Error("Activity cannot be performed");
        }
        const data = Object.assign({ performer, subject: this.subject }, this);
        for await (let result of this.perform({ controller, data: data })) {
          yield result as any;
        }   
      }

    }

    return PlayCardActivity;
  }
}