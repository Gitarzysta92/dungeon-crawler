import { Guid } from "../../../../../lib/extensions/types";
import { IAbilityPerformerDeclaration } from "../../../../../lib/modules/abilities/entities/performer/ability-performer.interface";
import { IActorDeclaration } from "../../../../../lib/modules/actors/entities/actor/actor.interface";
import { IDefeatableDeclaration } from "../../../../../lib/modules/actors/entities/defeatable/defeatable.interface";
import { ITravelerDeclaration } from "../../../../../lib/modules/areas/entities/occupier/occupier.interface";
import { IBoardObjectDeclaration } from "../../../../../lib/modules/board/entities/board-object/board-object.interface";
import { IInventoryBearerDeclaration } from "../../../../../lib/modules/items/entities/bearer/inventory-bearer.interface";
import { IPerkBearerDeclaration } from "../../../../../lib/modules/perks/entities/perk-bearer/perk-bearer.interface";
import { IProgressableDeclaration } from "../../../../../lib/modules/progression/entities/progressable.interface";
import { IQuestResolverDeclaration } from "../../../../../lib/modules/quest/entities/quest-resolver/quest-resolver.interface";
import { IStatisticBearerDeclaration } from "../../../../../lib/modules/statistics/entities/bearer/statistic-bearer.interface";
import { IControllable } from "../../../../../lib/modules/turn-based-gameplay/turn-based-gameplay.interface";

export type IHero = {
  name: string;
  raceId: Guid;
  classId: Guid;
  originId: Guid;
  isHero: true;
}


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
  IStatisticBearerDeclaration<[
    'defence',
    'attackPower',
    'spellPower',
    'movement',
    'majorAction',
    'minorAction',
    'moveAction'
  ]> &
  IDefeatableDeclaration<["health"]> &
  IAbilityPerformerDeclaration &
  IInventoryBearerDeclaration &
  IBoardObjectDeclaration &
  IProgressableDeclaration &
  IQuestResolverDeclaration &
  IPerkBearerDeclaration;
