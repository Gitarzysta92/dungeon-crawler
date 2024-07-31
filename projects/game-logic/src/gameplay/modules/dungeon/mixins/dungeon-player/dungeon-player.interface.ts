import { ITurnGameplayPlayer } from "../../../../../lib/modules/turn-based-gameplay/mixins/turn-based-player/turn-based-player.interface";

export interface IDungeonPlayer extends ITurnGameplayPlayer {
  drawCards()
  discardCards()
}