import { IPossesedItem } from "../items/inventory.interface";
import { IArea } from "./area.interface";

export interface IAdventureMap {
  areas: IArea[]
}

export interface ITravelSupply {
  coverableDistance: number;
}