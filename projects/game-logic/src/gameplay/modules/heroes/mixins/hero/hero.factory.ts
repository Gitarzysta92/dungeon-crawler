
import { IActivity } from "../../../../../lib/base/activity/activity.interface";
import { IEntityDeclaration, IEntity } from "../../../../../lib/base/entity/entity.interface";
import { IPawn } from "../../../../../lib/base/pawn/pawn.interface";
import { Constructor } from "../../../../../lib/infrastructure/extensions/types";
import { IMixinFactory } from "../../../../../lib/infrastructure/mixin/mixin.interface";
import { IBoardAssignment, IBoardObject } from "../../../../../lib/modules/board/entities/board-object/board-object.interface";
import { IHero, IHeroDeclaration } from "./hero.interface";

export class HeroFactory implements IMixinFactory<IHero> {

  constructor() { }
    
  public validate(e: IEntityDeclaration & Partial<IHero>): boolean {
    return e.isHero;
  };

  public create(e: Constructor<IPawn & IBoardObject>): Constructor<Partial<IHero>> {
    class Hero extends e implements Partial<IHero> {
      name: string;
      raceId: string;
      classId: string;
      originId: string;
      isHero = true as const;

      constructor(d: IHeroDeclaration) {
        super(d);
        this.name = d.name;
        this.raceId = d.raceId;
        this.classId = d.classId;
        this.originId = d.originId;
      }

      public perform(activity: IActivity): void {
        
      }

      public async canPerform(activity: IActivity & { subject: IBoardObject & IBoardAssignment }): Promise<boolean> {
        return this.isAdjanced(activity.subject) && await activity.canBePerformed(this);
      }

    };
    return Hero;
  };
}