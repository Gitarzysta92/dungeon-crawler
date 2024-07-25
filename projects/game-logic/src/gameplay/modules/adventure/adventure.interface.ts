import { IEntity, IEntityDeclaration } from "../../../lib/base/entity/entity.interface";
import { Guid } from "../../../lib/infrastructure/extensions/types";
import { IAbilitiesDataFeed } from "../../../lib/modules/abilities/abilities.interface";
import { IActorDataFeed } from "../../../lib/modules/actors/actors.interface";
import { IActor, IActorDeclaration } from "../../../lib/modules/actors/entities/actor/actor.interface";
import { IAreasDataFeed } from "../../../lib/modules/areas/areas.interface";
import { ICardsDeckDataFeed } from "../../../lib/modules/cards/cards.interface";
import { IContinuousGameplayDeclaration } from "../../../lib/modules/continuous-gameplay/continuous-gameplay.interface";
import { IItemsDataFeed } from "../../../lib/modules/items/items.interface";
import { IQuestDataFeed } from "../../../lib/modules/quest/quest.interface";
import { IStatisticDataFeed } from "../../../lib/modules/statistics/statistics.interface";
import { IBoardArea, IBoardAreaDeclaration } from "../board-areas/entities/board-area/board-area.interface";
import { IDungeonDataFeed } from "../dungeon/dungeon.interface";


export interface IAdventureGameplayDeclaration extends IContinuousGameplayDeclaration {
  id: Guid,
  isAdventureGameplay: true;
  visitedDungeonAreaId?: Guid;
  entities: IAdventureGameplayEntityDeclaration[];
}

export type IAdventureGameplayEntityDeclaration =
  IEntityDeclaration &
  Partial<IActorDeclaration> & 
  Partial<IBoardAreaDeclaration>


export type IAdventureGameplayEntity =
  IEntity &
  Partial<IActor> & 
  Partial<IBoardArea>


export interface IAdventureDataFeed {
  getAdventureTemplate: () => Promise<IAdventureGameplayDeclaration>;
}
  

export type IAdventureGameplayDataFeed =
  IDungeonDataFeed &
  IAreasDataFeed &
  IDungeonDataFeed &
  IQuestDataFeed &
  IActorDataFeed &
  IItemsDataFeed &
  IAbilitiesDataFeed &
  ICardsDeckDataFeed &
  IStatisticDataFeed;
