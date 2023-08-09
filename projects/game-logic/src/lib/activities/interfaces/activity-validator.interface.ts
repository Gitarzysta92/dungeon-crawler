import { Player } from "../../game/interfaces/player";
import { IGameState } from "../../state-dispatcher/interfaces/game-state.interface";
import { IActivity } from "./activity.interface";


export type ActivityValidator = (gameState: IGameState, activity: IActivity<any>, authority: Player) => void