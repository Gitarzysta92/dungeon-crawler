import { Observable } from "rxjs";
import { IGameplay } from "./game.interface";

export interface IGameStore {
  isInitialized: boolean;
  state$: Observable<IGameplay>;
  currentState: IGameplay;
  setState(s: unknown) 
  //dispatch(activity: IDispatcherDirective<unknown>): Promise < void>
  startTransaction()
  dispose() 
  initializeStore(
    s: unknown,
    gameplayFactory: (g: unknown) => Promise<IGameplay>
  )
}