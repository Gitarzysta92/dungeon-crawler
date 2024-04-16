import { Entity } from "../../../base/entity/entity";
import { IEntityDeclaration } from "../../../base/entity/entity.interface";
import { IMixinFactory } from "../../../base/mixin/mixin.interface";
import { ActionService } from "../../../cross-cutting/action/action.service";
import { EventService } from "../../../cross-cutting/event/event.service";
import { Constructor } from "../../../extensions/types";
import { LevelUpEvent } from "../aspects/events/leveled-up.event";
import { IPromotionDefinition } from "../progression.interface";

import { IProgressable, IProgressableDeclaration } from "./progressable.interface";

export class ProgressableFactory implements IMixinFactory<IProgressable> {

  constructor(
    private readonly _actionService: ActionService,
    private readonly _eventService: EventService
  ) { }
    
  public validate(e: IEntityDeclaration & Partial<IProgressable>): boolean {
    return e.isProgressable;
  };

  public create(e: typeof Entity): Constructor<IProgressable> {
    const actionService = this._actionService;
    const eventService = this._eventService;
    class Progressable extends e implements IProgressable {
      
      isProgressable = true as const;
      level: number = 0;
      experiencePoints: number = 0;
      promotions: IPromotionDefinition[];

      private readonly _actiosService: ActionService = actionService;
      private readonly _eventService: EventService = eventService;

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
            this._actiosService.exectue(action, this);
          }
          this._eventService.emit(new LevelUpEvent(this))
        }
      }

    }
    return Progressable;
  };
}