import { Constructor } from "@game-logic/lib/infrastructure/extensions/types";
import { IMixinFactory } from "@game-logic/lib/infrastructure/mixin/mixin.interface";
import { ITurnGameplayPlayer, ITurnGameplayPlayerDeclaration } from "@game-logic/lib/modules/turn-based-gameplay/mixins/turn-based-player/turn-based-player.interface";
import { IDungeonHumanPlayer } from "./dungeon-human-player.interface";
import { PlayerType } from "@game-logic/lib/base/player/players.constants";

export class DungeonHumanPlayerMixin implements IMixinFactory<IDungeonHumanPlayer>  {

  constructor() { }

  public isApplicable(e: ITurnGameplayPlayerDeclaration): boolean {
    return e.isTurnGameplayPlayerDeclaration && e.isPlayer && e.playerType === PlayerType.Human;
  };
  
  public create(bc: Constructor<ITurnGameplayPlayer>): Constructor<IDungeonHumanPlayer> {
    class DungeonHumanPlayer extends bc implements IDungeonHumanPlayer {
  
      public isTurnGameplayPlayerDeclaration = true as const;


      constructor(d: ITurnGameplayPlayerDeclaration) {
        super(d);
      }
    }
    return DungeonHumanPlayer;
  };
}
