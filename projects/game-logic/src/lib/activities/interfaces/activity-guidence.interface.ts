import { Player } from "../../game/interfaces/player";
import { IGameState } from "../../state-dispatcher/interfaces/game-state.interface";
import { ActivityName } from "../constants/activity-name";

export type ActivityGuidence = (gameState: IGameState, authority: Player) => boolean;