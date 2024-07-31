import { Constructor } from "../../../../../lib/infrastructure/extensions/types";
import { IMixinFactory } from "../../../../../lib/infrastructure/mixin/mixin.interface";
import { ITurnGameplayPlayerDeclaration, ITurnGameplayPlayer } from "../../../../../lib/modules/turn-based-gameplay/mixins/turn-based-player/turn-based-player.interface";
import { IDungeonPlayer } from "./dungeon-player.interface";


export class DungeonPlayerMixin implements IMixinFactory<IDungeonPlayer>  {

  constructor() { }

  public isApplicable(e: ITurnGameplayPlayerDeclaration): boolean {
    return e.isTurnGameplayPlayerDeclaration && e.isPlayer
  };
  
  public create(bc: Constructor<ITurnGameplayPlayer>): Constructor<IDungeonPlayer> {
    class DungeonPlayer extends bc implements IDungeonPlayer {
  
      constructor(d: ITurnGameplayPlayerDeclaration) {
        super(d);
      }

      public drawCards() {
        const pawns = this.gameplay.getPawns(this);
        
      }

      public discardCards() {
        throw new Error("Method not implemented.");
      }

    }
    return DungeonPlayer;
  };
}
