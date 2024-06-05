import { NotEnumerable } from "@game-logic/lib/infrastructure/extensions/object-traverser";
import { Constructor } from "@game-logic/lib/infrastructure/extensions/types";
import { IMixinFactory } from "@game-logic/lib/infrastructure/mixin/mixin.interface";
import { ITradeActivity } from "@game-logic/lib/modules/vendors/activities/trade.interface";
import { ICommand } from "../interfaces/command.interface";
import { IGame } from "../interfaces/game.interface";
import { TRADE_ACTIVITY } from "@game-logic/lib/modules/vendors/vendors.constants";

export class TradeCommandFactory implements IMixinFactory<ICommand> {

  constructor() {}
  
  public validate(a: ITradeActivity & ICommand): boolean {
    return a.isActivity && a.id === TRADE_ACTIVITY
  }

  public create(e: Constructor<ITradeActivity & ICommand>): Constructor<ICommand> {
    
    class TradeCommand extends e implements ICommand {
      
      @NotEnumerable()
      isTradeCommand = true as const;

      constructor(d: unknown) {
        super(d);
      }

      public async indicate(state: IGame): Promise<void> {}

      public async execute(stateStore: any): Promise<void> {
        const abandonTransaction = stateStore.startTransaction();
        const pawn = stateStore.currentState.getSelectedPawn();
        try {
          super.perform2(pawn)
        } catch (e) {
          abandonTransaction();
          throw e;
        }
        stateStore.setState(stateStore.currentState);
      }
    }
    return TradeCommand;
  }
}