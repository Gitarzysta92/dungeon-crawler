import { ActorType } from "../lib/features/actors/actor.constants";
import { IDungeonDeck } from "../lib/features/dungeon/dungeon-deck";
import { groupId } from "./commons";

export const dungeonDeck: IDungeonDeck = {
  id: "86FA22F6-5425-4FC6-BB41-657F53A73B1B",
  name: "Dungeon deck",
  drawPerTurn: 3,
  groupId: groupId,
  cardsToUtilize: [],
  utilizedCards: [],
  actorType: ActorType.DungeonDeck
}



