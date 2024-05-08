import { Guid } from "@game-logic/lib/extensions/types";

export type IDataContainer<B, N = {}, V = {}> = B & N & V & { id: Guid };