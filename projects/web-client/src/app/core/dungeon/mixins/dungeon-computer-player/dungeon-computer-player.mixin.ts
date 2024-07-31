import { Constructor } from "@game-logic/lib/infrastructure/extensions/types";
import { IMixinFactory } from "@game-logic/lib/infrastructure/mixin/mixin.interface";
import { ITurnGameplayPlayerDeclaration } from "@game-logic/lib/modules/turn-based-gameplay/mixins/turn-based-player/turn-based-player.interface";
import { IDungeonComputerPlayer } from "./dungeon-computer-player.interface";
import { PlayerType } from "@game-logic/lib/base/player/players.constants";
import { IDungeonPlayer } from "@game-logic/gameplay/modules/dungeon/mixins/dungeon-player/dungeon-player.interface";

export class DungeonComputerPlayerMixin implements IMixinFactory<IDungeonComputerPlayer>  {

  constructor() { }

  public isApplicable(e: ITurnGameplayPlayerDeclaration): boolean {
    return e.isTurnGameplayPlayerDeclaration && e.isPlayer && e.playerType === PlayerType.Computer;
  };
  
  public create(bc: Constructor<IDungeonPlayer>): Constructor<IDungeonComputerPlayer> {
    class DungeonComputerPlayer extends bc implements IDungeonComputerPlayer {
  
      public isTurnGameplayPlayerDeclaration = true as const;


      constructor(d: ITurnGameplayPlayerDeclaration) {
        super(d);
      }
    }
    return DungeonComputerPlayer;
  };
}
