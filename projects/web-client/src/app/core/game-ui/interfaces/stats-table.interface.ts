import { INarrationMedium } from "../entities/narrative-medium/narrative-medium.interface";
import { IVisualMedium } from "../entities/visual-medium/visual-medium.interface";

export type IStatsTableStatistic = INarrationMedium & IVisualMedium & { value: number }