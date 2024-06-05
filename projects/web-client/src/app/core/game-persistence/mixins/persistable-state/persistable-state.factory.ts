import { IMixinFactory } from "@game-logic/lib/infrastructure/mixin/mixin.interface";
import { Constructor } from "@game-logic/lib/infrastructure/extensions/types";
import { IPersistableGame } from "./persistable-state.interface";
import { IGame } from "@game-logic/lib/base/game/game.interface";


export class PersistableGameFactory implements IMixinFactory<IPersistableGame> {

  public validate(e: IGame ): boolean {
    return 'entities' in e;
  }

  public create(e: Constructor<IGame>): Constructor<IPersistableGame> {
    class PersistableGame extends e implements IPersistableGame {
      persistedGameDataId: string;

      constructor(d: IPersistableGame) {
        super(d);
        this.persistedGameDataId = d.persistedGameDataId;
      }

    }
    return PersistableGame;
  }


}