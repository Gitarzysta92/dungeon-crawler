import { TRAVEL_ACTIVITY } from "../../areas.constants";

import { IActivityDeclaration } from "../../../../base/activity/activity.interface";


export interface ITravelActivity extends IActivityDeclaration {
  id: typeof TRAVEL_ACTIVITY;
}
