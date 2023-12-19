import { IInventory } from "../../items/inventory.interface";
import { ActorType } from "../actors.constants";
import { ICharacter } from "./character.interface";

export class CharacterActor implements ICharacter {
  actorType: ActorType.Character;
  inventory: IInventory;
  id: string;
  groupId?: string;
  sourceActorId: string;
}