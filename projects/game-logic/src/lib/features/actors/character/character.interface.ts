import { IInventory } from "../../items/inventory.interface";
import { ActorType } from "../actors.constants";
import { IActor } from "../actors.interface";

export interface ICharacter extends IActor {
  actorType: ActorType.Character;
  inventory: IInventory;
}