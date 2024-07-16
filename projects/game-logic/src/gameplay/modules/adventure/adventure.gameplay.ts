
import { IActivity, IActivitySubject } from "../../../lib/base/activity/activity.interface";
import { EntityService } from "../../../lib/base/entity/entity.service";
import { IPawn } from "../../../lib/base/pawn/pawn.interface";
import { INestedArea } from "../../../lib/modules/areas/entities/area/area.interface";
import { IBoardObject } from "../../../lib/modules/board/entities/board-object/board-object.interface";
import { ContinuousGameplay } from "../../../lib/modules/continuous-gameplay/continuous-gameplay.gameplay";
import { IBoardAreaResident } from "../board-areas/entities/board-resident/resident.interface";
import { IDungeonCrawler } from "../dungeon/mixins/dungeon-crawler/dungeon-crawler.interface";
import { IHero } from "../heroes/mixins/hero/hero.interface";
import { IAdventureGameplayDeclaration, IAdventureGameplayEntity, IAdventureGameplayEntityDeclaration } from "./adventure.interface";

export class AdventureGameplay extends ContinuousGameplay {
  public id: string;
  public get visitedDungeon() { return this.getSelectedPawn<IDungeonCrawler & IPawn>(this.currentPlayer).visitedDungeon };
  public get entities() { return super.entities as IAdventureGameplayEntity[] };
  public get hero() { return this.getSelectedPawn<IHero>(this.currentPlayer) }

  constructor( _entityService: EntityService) { 
    super(_entityService);
  }

  public async hydrate(data: IAdventureGameplayDeclaration): Promise<void> {
    await super.hydrate(data);
    this.id = data.id;
  }
  

  public getCurrentPlayerSelectedPawn<T extends IPawn>(): T {
    return super.getSelectedPawn<T>(this.currentPlayer);
  }

  public getAvailableActivities(pawn: IPawn & IBoardObject): Array<IActivity> {
    const boardActivities = this.entities
      .filter(e => e.isBoardArea)
      .reduce((acc, e) => e.activities ? acc.concat(e.activities) : acc, []);
    
    const areaActivities = [];
    this.entities.filter(e => e.isBoardArea && pawn.isAssigned(e.position))
      .forEach(a => a.traverseNestedAreas<INestedArea & IActivitySubject>(na => {
        na.activities?.forEach(a => areaActivities.push(a));
      }))

    const residentActivities = this.entities
      .filter(e => e.isBoardArea && pawn.isAssigned(e.position))
      .reduce((acc, e) => e.residents
        .reduce((acc, r: IActivitySubject & IBoardAreaResident) => acc.concat(r.activities), [])
        .concat(acc), []);
            
    return [...boardActivities, ...areaActivities, ...residentActivities].filter(a => pawn.canPerform(a));
  }
}