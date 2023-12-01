import { IPossesedItem } from "../items/inventory.interface";
import { IArea } from "./area.interface";

export interface IAdventureMap {
  unlockedAreas: IArea[]
}

export interface ITravelSupply {
  coverableDistance: number;
}