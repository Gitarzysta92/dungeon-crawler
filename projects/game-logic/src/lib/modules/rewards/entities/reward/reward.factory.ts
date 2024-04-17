import { IEntity } from "../../../../base/entity/entity.interface";
import { IMixinFactory } from "../../../../base/mixin/mixin.interface";
import { IActionDeclaration } from "../../../../cross-cutting/action/action.interface";
import { ActionService } from "../../../../cross-cutting/action/action.service";
import { IEventListenerDeclaration } from "../../../../cross-cutting/event/event.interface";
import { EventService } from "../../../../cross-cutting/event/event.service";
import { ModifierService } from "../../../../cross-cutting/modifier/modifier.service";
import { Constructor } from "../../../../extensions/types";
import { IRewarder } from "../rewarder/rewarder.interface";
import { IReward } from "./reward.interface";

export class RewardFactory implements IMixinFactory<IReward>  {

  constructor(
    private readonly _modifierService: ModifierService,
    private readonly _actionService: ActionService,
    private readonly _eventService: EventService
  ) { }
  
  public validate(e: IReward): boolean {
    return e.isReward;
  };

  public create(bc: Constructor<IEntity>): Constructor<IReward> {
    const modifierService = this._modifierService;
    const actionService = this._actionService;
    const eventService = this._eventService;
    const c = class Reward extends bc implements IReward {

      public isReward: true;
      public rewardWhen: IEventListenerDeclaration<unknown>[] = [];
      public actions: IActionDeclaration<unknown>[] = [];
      public claimed: boolean = false;
      public autoclaim?: boolean;
      public bearer: IRewarder;

      public rewarder: IRewarder;
      
      private readonly _modifierService: ModifierService = modifierService;
      private readonly _actionService: ActionService = actionService;
      private readonly _eventService: EventService = eventService;
    
      constructor(e: IReward) { 
        super(e);
        Object.assign(this, e);
      }

      public onInitialize(): void {
        this._eventService.listen(this._rewardTriggerHandler);
        super.onInitialize();
      }
    

      public onDestroy(): void {
        this._eventService.stopListening(this._rewardTriggerHandler);
        super.onDestroy();
      }

      public claim() {
        if (this.claimed) {
          return;
        }
        this._makeActions();
        this.claimed = true;
      }

      
      private _rewardTriggerHandler = (e) => {
        if (this.claimed) {
          return;
        }
        for (let trigger of this.rewardWhen) {
          if (e.isApplicableTo(trigger) && this.autoclaim) {
            this.claim()
          }
        }
      }

      private _makeActions(): void {
        for (let action of this.actions) {
          this._actionService.exectue(action, this)
        }
      }

    }

    return c; 
  };
}