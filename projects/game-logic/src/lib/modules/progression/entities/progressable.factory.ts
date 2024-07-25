import { IEntityDeclaration, IEntity } from "../../../base/entity/entity.interface";
import { ActionService } from "../../../cross-cutting/action/action.service";
import { EventService } from "../../../cross-cutting/event/event.service";
import { Constructor } from "../../../infrastructure/extensions/types";
import { IMixinFactory } from "../../../infrastructure/mixin/mixin.interface";
import { LevelUpEvent } from "../aspects/events/leveled-up.event";
import { IPromotionDefinition } from "../progression.interface";

import { IProgressable, IProgressableDeclaration } from "./progressable.interface";

export class ProgressableFactory implements IMixinFactory<IProgressable> {

  constructor(
    private readonly _actionService: ActionService,
    private readonly _eventService: EventService
  ) { }
    
  public isApplicable(e: IEntityDeclaration & Partial<IProgressable>): boolean {
    return e.isProgressable;
  };

  public create(e: Constructor<IEntity>): Constructor<IProgressable> {
    const actionService = this._actionService;
    const eventService = this._eventService;
    class Progressable extends e implements IProgressable {
      
      isProgressable = true as const;
      level: number = 0;
      experiencePoints: number = 0;
      promotions: IPromotionDefinition[];


      constructor(d: IProgressableDeclaration) {
        super(d);
        this.level = d.level;
        this.experiencePoints = d.experiencePoints;
        this.promotions = d.promotions;
      }
      
      public gainExperience(n: number): void {
        this.experiencePoints += n;
        this.promote();
      }

      public promote(): void {
        const promotion = this.promotions.find(p => p.requiredExperience >= this.experiencePoints && p.level === this.level + 1);
        if (!promotion) {
          for (let action of promotion.actions) {
            actionService.exectue(action, this);
          }
          eventService.emit(new LevelUpEvent(this))
        }
      }

    }
    return Progressable;
  };
}