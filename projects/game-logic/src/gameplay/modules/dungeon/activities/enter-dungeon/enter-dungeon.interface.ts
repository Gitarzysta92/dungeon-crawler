import { IActivity } from "../../../../../lib/base/activity/activity.interface";
import { IDungeonCrawler } from "../../dungeon.interface";

export interface IEnterDungeonActivity extends IActivity {
  canBePerformed(c: IDungeonCrawler): boolean;
  perform(c: IDungeonCrawler): void;
}