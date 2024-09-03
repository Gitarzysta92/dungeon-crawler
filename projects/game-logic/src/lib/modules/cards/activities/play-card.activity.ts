import { IActivity, IActivityCost, IActivityDeclaration, IActivitySubject } from "../../../base/activity/activity.interface";
import { ProcedureExecutionPhase } from "../../../base/procedure/procedure.constants";
import { IProcedure } from "../../../base/procedure/procedure.interface";
import { IGatheringController } from "../../../cross-cutting/gatherer/data-gatherer.interface";
import { NotEnumerable } from "../../../infrastructure/extensions/object-traverser";
import { Constructor } from "../../../infrastructure/extensions/types";
import { IMixinFactory } from "../../../infrastructure/mixin/mixin.interface";
import { PLAY_CARD_ACTIVITY } from "../cards.constants";
import { ICardOnPile } from "../entities/card-on-pile/card-on-pile.interface";
import { IDeckBearer } from "../entities/deck-bearer/deck-bearer.interface";

export interface IPlayCardActivity extends IActivity {
  id: typeof PLAY_CARD_ACTIVITY;
  subject: IActivitySubject & ICardOnPile
  doActivity<T>(bearer: IDeckBearer, controller: IGatheringController): AsyncGenerator<T> 
}


export class PlayCardActivityFactory implements IMixinFactory<IActivity> {

  constructor() { }

  public static isPlayCardActivity(data: any): boolean {
    return data.isActivity && data.id === PLAY_CARD_ACTIVITY && data.isProcedure; 
  }
  
  public static asPlayCardActivity<T>(data: T): T & IPlayCardActivity {
    if (!this.isPlayCardActivity(data)) {
      throw new Error("Provided data is not a Activity");
    } 
    return data as T & IPlayCardActivity;
  }


  public isApplicable(a: IActivity): boolean {
    return a.isActivity && a.id === PLAY_CARD_ACTIVITY && a.isProcedure;
  }

  public create(c: Constructor<IProcedure>): Constructor<IActivity> {
    class PlayCardActivity extends c implements IPlayCardActivity {

      public id = PLAY_CARD_ACTIVITY;
      public get card(): ICardOnPile | undefined { return this.subject };
      public isActivity = true as const;
      public cost: IActivityCost[];

      @NotEnumerable()
      subject: IActivitySubject & ICardOnPile;

      constructor(d: IActivityDeclaration) {
        super(d);
        this.id = d.id;
        this.cost = d.cost ?? [];
      }

      public canBeDone(performer: IDeckBearer): boolean {
        if (!this.card) {
          return false;
        }

        if (!performer.deck.hasCard(this.card.ref)) {
          return false;
        }

        return performer.validateActivityResources(this.cost);
      }

      public async *doActivity<T>(performer: IDeckBearer, controller: IGatheringController): AsyncGenerator<T> {
        if (!this.canBeDone(performer)) {
          throw new Error("Activity cannot be performed");
        }
        const data = Object.assign({ performer, subject: this.subject }, this);
        for await (let result of this.perform({ controller, data: data })) {
          if (result.executionPhaseType === ProcedureExecutionPhase.ExecutionFinished && result.isSuccessful) {
            performer.consumeActivityResources(this.cost);
          }
          yield result as any;
        }
      }

    }

    return PlayCardActivity;
  }
}