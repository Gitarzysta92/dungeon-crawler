import { Player } from "../../game/interfaces/player";
import { IGameContext } from "./game-context.interface";
import { IGameState } from "./game-state.interface";

export type IDispatcherValidator = (this: IGameContext, state: IGameState, authority: Player) => boolean;
