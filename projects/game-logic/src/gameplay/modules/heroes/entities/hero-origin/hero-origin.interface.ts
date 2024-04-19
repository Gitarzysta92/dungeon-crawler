import { IEntity, IEntityDeclaration } from "../../../../../lib/base/entity/entity.interface";
import { Guid } from "../../../../../lib/extensions/types";


export interface IHeroOrigin extends IHeroOriginDeclaration {
}


export interface IHeroOriginDeclaration extends IEntityDeclaration {
  id: Guid;
  startingAreaId: Guid;
  activeQuestIds: Guid[];
  isHeroOrigin: true;
}

