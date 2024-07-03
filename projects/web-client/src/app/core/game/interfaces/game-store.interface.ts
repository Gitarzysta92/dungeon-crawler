import { Observable } from "rxjs";
import { IGame } from "./game.interface";

export interface IGameStore {
  isInitialized: boolean;
  state$: Observable<IGame>;
  currentState: IGame;
  setState(s: unknown) 
  //dispatch(activity: IDispatcherDirective<unknown>): Promise < void>
  startTransaction()
  dispose() 
  initializeStore(
    s: unknown,
    gameplayFactory: (g: unknown) => Promise<IGame>
  )
}