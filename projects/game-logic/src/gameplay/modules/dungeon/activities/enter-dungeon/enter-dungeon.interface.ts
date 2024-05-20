import { IActivity } from "../../../../../lib/base/activity/activity.interface";
import { IDungeonCrawler } from "../../dungeon.interface";

export interface IEnterDungeonActivity extends IActivity {
  canPerform(c: IDungeonCrawler): boolean;
  perform(c: IDungeonCrawler): void;
}