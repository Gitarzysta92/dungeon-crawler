import { IEntityDeclaration } from "../../../../../lib/base/entity/entity.interface";
import { IMixin, IMixinFactory } from "../../../../../lib/base/mixin/mixin.interface";
import { Constructor } from "../../../../../lib/extensions/types";
import { IBoardAssignment } from "../../../../../lib/modules/board/entities/board-object/board-object.interface";
import { IAdventureMap, IAdventureMapDeclaration } from "./adventure-map.interface";

export class AdventureMapFactory implements IMixinFactory<IAdventureMap> {

  constructor() { }
    
  public validate(e: IAdventureMap): boolean {
    return e.isAdventureMap;
  };

  public create(e: Constructor<IMixin>): Constructor<IAdventureMap> {
    class AdventureMap extends e implements IAdventureMap {
      id: string;
      isAdventureMap = true as const;
      // spawnPoints: IBoardAssignment[];
      entities: (IEntityDeclaration & { sourceActorId?: string; groupId?: string; } & Partial<IBoardAssignment>)[];

      constructor(d: IAdventureMapDeclaration) { 
        super(d);
        this.entities = d.entities;
      }

    }
    return AdventureMap
  }
}