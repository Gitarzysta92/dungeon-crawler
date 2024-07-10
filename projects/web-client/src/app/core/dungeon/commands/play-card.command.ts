import { DungeonStateStore } from "../stores/dungeon-state.store";
import { IMixinFactory } from "@game-logic/lib/infrastructure/mixin/mixin.interface";
import { Constructor } from "@game-logic/lib/infrastructure/extensions/types";
import { ICommand } from "../../game/interfaces/command.interface";
import { NotEnumerable } from "@game-logic/lib/infrastructure/extensions/object-traverser";
import { PLAY_CARD_ACTIVITY } from "@game-logic/lib/modules/cards/cards.constants";
import { IProcedure, IProcedureContext } from "@game-logic/lib/base/procedure/procedure.interface";
import { IGatheringController } from "@game-logic/lib/cross-cutting/gatherer/data-gatherer.interface";



export class PlayCardCommand implements IMixinFactory<any> {

  constructor() {}
  
  validate(a: IProcedure & ICommand): boolean {
    return a.isActivity && a.id === PLAY_CARD_ACTIVITY;
  }

  create(e: Constructor<IProcedure & ICommand>): Constructor<ICommand> {
    class PlayCardCommand extends e implements ICommand {

      @NotEnumerable()
      public isCastEffectCommand = true as const;
      
      constructor(d: unknown) {
        super(d);
      }

      public async indicate(s: DungeonStateStore): Promise<void> {}

      public async execute(
        s: DungeonStateStore,
        context: IProcedureContext & { controller: IGatheringController }
      ): Promise<void> {
        const abandonTransaction = s.startTransaction();
        const pawn = s.currentState.getCurrentPlayerSelectedPawn()
        try {
          for await (let result of super.dispatch2(pawn, context)) {
            s.setState(s.currentState);
          }
        } catch (e) {
          abandonTransaction()
          throw e;
        }
      }

    }
    return PlayCardCommand;
  }
}