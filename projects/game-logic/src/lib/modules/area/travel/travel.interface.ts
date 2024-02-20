import { Guid } from "../../../extensions/types";

export interface ITravelState {
  unlockedAreaIds: Guid[];
}

export interface ITravelSupply {
  coverableDistance: number;
}