import { IActivityDeclaration } from "../../../base/activity/activity.interface";
import { IQuestResolver } from "../../quest/entities/quest-resolver/quest-resolver.interface";
import { IVendor } from "../entities/vendor/vendor.interface";
import { TRADE_ACTIVITY } from "../vendors.constants";

export interface ITradeActivity extends IActivityDeclaration {
  id: typeof TRADE_ACTIVITY;
  readonly vendor: IVendor;
  perform2(traveler: IQuestResolver): AsyncGenerator<any>;
}

export interface ITradeActivitySignature {

}
