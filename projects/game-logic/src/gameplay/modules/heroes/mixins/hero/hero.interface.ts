import { Guid } from "../../../../../lib/extensions/types";
import { IAbilityPerformer, IAbilityPerformerDeclaration } from "../../../../../lib/modules/abilities/entities/performer/ability-performer.interface";
import { IActor, IActorDeclaration } from "../../../../../lib/modules/actors/entities/actor/actor.interface";
import { IDefeatable, IDefeatableDeclaration } from "../../../../../lib/modules/actors/entities/defeatable/defeatable.interface";
import { ITraveler, ITravelerDeclaration } from "../../../../../lib/modules/areas/entities/traveler/traveler.interface";
import { IBoardObject, IBoardObjectDeclaration } from "../../../../../lib/modules/board/entities/board-object/board-object.interface";
import { IInventoryBearer, IInventoryBearerDeclaration } from "../../../../../lib/modules/items/entities/bearer/inventory-bearer.interface";
import { IPerkBearer, IPerkBearerDeclaration } from "../../../../../lib/modules/perks/entities/perk-bearer/perk-bearer.interface";
import { IProgressable, IProgressableDeclaration } from "../../../../../lib/modules/progression/entities/progressable.interface";
import { IQuestResolver, IQuestResolverDeclaration } from "../../../../../lib/modules/quest/entities/quest-resolver/quest-resolver.interface";
import { IStatisticBearer, IStatisticBearerDeclaration } from "../../../../../lib/modules/statistics/entities/bearer/statistic-bearer.interface";
import { IControllable } from "../../../../../lib/modules/turn-based-gameplay/turn-based-gameplay.interface";
import { IDungeonCrawler } from "../../../dungeon/dungeon.interface";

export type IHero = {
  name: string;
  raceId: Guid;
  classId: Guid;
  originId: Guid;
  isHero: true;
} &
IActor &
ITraveler &
IControllable &
IStatisticBearer &
IDefeatable<["health"]> &
IAbilityPerformer &
IInventoryBearer &
IBoardObject &
IProgressable &
IQuestResolver &
IPerkBearer &
IDungeonCrawler;



export type IHeroDeclaration = {
    name: string;
    raceId: Guid;
    classId: Guid;
    originId: Guid;
    isHero: true;
  } &
  IActorDeclaration &
  ITravelerDeclaration &
  IControllable &
  IStatisticBearerDeclaration &
  IDefeatableDeclaration<["health"]> &
  IAbilityPerformerDeclaration &
  IInventoryBearerDeclaration &
  IBoardObjectDeclaration &
  IProgressableDeclaration &
  IQuestResolverDeclaration &
  IPerkBearerDeclaration;
