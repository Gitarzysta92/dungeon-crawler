import { INarrationMedium } from "../mixins/narrative-medium/narrative-medium.interface";
import { IUiMedium } from "../mixins/visual-medium/ui-medium.interface";

export type IInfoPanelData = IUiMedium & INarrationMedium;