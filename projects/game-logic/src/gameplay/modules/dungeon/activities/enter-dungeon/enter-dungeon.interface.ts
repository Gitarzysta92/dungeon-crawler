import { IActivity } from "../../../../../lib/base/activity/activity.interface";
import { IDungeonCrawler } from "../../mixins/dungeon-crawler/dungeon-crawler.interface";


export interface IEnterDungeonActivity extends IActivity {
  canBeDispatched(c: IDungeonCrawler): boolean;
  dispatch(c: IDungeonCrawler): void;
}