import { Entity } from "../../../../../lib/base/entity/entity";
import { IEntityFactory, IEntity } from "../../../../../lib/base/entity/entity.interface";
import { Constructor } from "../../../../../lib/extensions/types";
import { IHero, IHeroDeclaration } from "./hero.interface";

export class HeroFactory implements IEntityFactory<IHero> {

  constructor() { }
    
  public validate(e: IEntity & Partial<IHero>): boolean {
    return e.isHero;
  };

  public create(e: typeof Entity): Constructor<IHero> {
    class Hero extends e implements IHero {
      name: string;
      raceId: string;
      classId: string;
      originId: string;
      isHero: true;

      constructor(d: IHeroDeclaration) {
        super(d);
        this.name = d.name;
        this.raceId = d.raceId;
        this.classId = d.classId;
        this.isHero = d.isHero;
      }

    };
    return Hero;
  };
}