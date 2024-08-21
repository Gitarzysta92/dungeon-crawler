import { Guid } from "@game-logic/lib/infrastructure/extensions/types";


export type IDataContainer<B, N = {}, U = {}, S = {}> = B & N & U & S & { id: any };