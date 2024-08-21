import { IActivityResource } from "../../../../../lib/base/activity/activity.interface";
import { IPawn, IPawnDeclaration } from "../../../../../lib/base/pawn/pawn.interface";
import { Guid } from "../../../../../lib/infrastructure/extensions/types";
import { IAbilityPerformer, IAbilityPerformerDeclaration } from "../../../../../lib/modules/abilities/entities/performer/ability-performer.interface";
import { IActor, IActorDeclaration } from "../../../../../lib/modules/actors/entities/actor/actor.interface";
import { IBoardObject, IBoardObjectDeclaration } from "../../../../../lib/modules/board/entities/board-object/board-object.interface";
import { IDeckBearer, IDeckBearerDeclaration } from "../../../../../lib/modules/cards/entities/deck-bearer/deck-bearer.interface";
import { IDefeatable, IDefeatableDeclaration } from "../../../../../lib/modules/combat/entities/defeatable/defeatable.interface";
import { IInventoryBearer, IInventoryBearerDeclaration } from "../../../../../lib/modules/items/entities/bearer/inventory-bearer.interface";
import { IPerkBearer, IPerkBearerDeclaration } from "../../../../../lib/modules/perks/entities/perk-bearer/perk-bearer.interface";
import { IProgressable, IProgressableDeclaration } from "../../../../../lib/modules/progression/entities/progressable.interface";
import { IQuestResolver, IQuestResolverDeclaration } from "../../../../../lib/modules/quest/entities/quest-resolver/quest-resolver.interface";
import { IStatisticBearer, IStatisticBearerDeclaration } from "../../../../../lib/modules/statistics/entities/bearer/statistic-bearer.interface";
import { IBoardTraveler, IBoardTravelerDeclaration } from "../../../board-areas/entities/board-traveler/board-traveler.interface";
import { IDungeonCrawler, IDungeonCrawlerDeclaration } from "../../../dungeon/mixins/dungeon-crawler/dungeon-crawler.interface";


export type IHero = {
  name: string;
  raceId: Guid;
  classId: Guid;
  originId: Guid;
  isHero: true;
} &
IActor &
IBoardTraveler &
IStatisticBearer & { statistic: { [key: string]: IActivityResource} } &
IDefeatable &
IAbilityPerformer &
IInventoryBearer &
IBoardObject &
IProgressable &
IQuestResolver &
IPerkBearer &
IDungeonCrawler &
IPawn &
IDeckBearer;



export type IHeroDeclaration = {
  name: string;
  raceId: Guid;
  classId: Guid;
  originId: Guid;
  isHero: true;
} &
  IPawnDeclaration &
  IActorDeclaration &
  IBoardTravelerDeclaration &
  IStatisticBearerDeclaration &
  IDefeatableDeclaration &
  IAbilityPerformerDeclaration &
  IInventoryBearerDeclaration &
  IBoardObjectDeclaration &
  IProgressableDeclaration &
  IQuestResolverDeclaration &
  IPerkBearerDeclaration &
  IDeckBearerDeclaration &
  IDungeonCrawlerDeclaration;
