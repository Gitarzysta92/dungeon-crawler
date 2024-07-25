
import { IActivityDoer } from "../../../../../lib/base/activity/activity.interface";
import { IEntity } from "../../../../../lib/base/entity/entity.interface";
import { Constructor } from "../../../../../lib/infrastructure/extensions/types";
import { IMixinFactory } from "../../../../../lib/infrastructure/mixin/mixin.interface";
import { IBoardTraveler } from "../../../board-areas/entities/board-traveler/board-traveler.interface";
import { DungeonService } from "../../dungeon.service";
import { IDungeonArea } from "../dungeon-area/dungeon-area.interface";
import { IDungeonCrawler, IDungeonCrawlerDeclaration } from "./dungeon-crawler.interface";

export class DungeonCrawlerFactory implements IMixinFactory<IDungeonCrawler> {

  constructor(
    private readonly _dungeonService: DungeonService
  ) { }

  public validate(e: IDungeonCrawler ): boolean {
    return e.isDungeonCrawler && e.isTraveler
  };

  public create(e: Constructor<IEntity & IActivityDoer & IBoardTraveler>): Constructor<IDungeonCrawler> {
    const dungeonService = this._dungeonService;
    return class DungeonCrawler extends e implements IDungeonCrawler {
      
      public visitedDungeonId: string;
      public isDungeonCrawler = true as const;

      public get visitedDungeon() { return dungeonService.getDungeon(this.occupiedArea.id, this.visitedDungeonId) }

      constructor(d: IDungeonCrawlerDeclaration & any) {
        super(d);
        this.visitedDungeonId = d.visitedDungeonId;
      }

      public enterDungeon(d: IDungeonArea): void {
        this.visitedDungeonId = d.dungeonId;
      }

      public leaveDungeon(): void {
        this.visitedDungeonId = null
      }

    }
  };
}