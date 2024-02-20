import { IStatistic } from "../statistic.interface";

export type IStatisticBearer<T extends Array<string>> = Record<T[number], IStatistic> & { isStatisticBearer: true }