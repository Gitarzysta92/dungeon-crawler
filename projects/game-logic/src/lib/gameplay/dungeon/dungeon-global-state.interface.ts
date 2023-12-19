import { IActor, IActorsState } from "../../features/actors/actors.interface";
import { IAassignedBoardObject, IBoardState, IField } from "../../features/board/board.interface";
import { IDungeonState } from "../../features/dungeon/dungeon.interface";
import { IEffectsState } from "../../features/effects/commons/effects-state-handler/effects-state.interface";
import { IHero } from "../../features/hero/hero.interface";
import { IPlayer } from "../../features/players/players.interface";

export type IDungeonGlobalState =
  IDungeonState &
  IActorsState &
  IBoardState<IField, IAassignedBoardObject> &
  IEffectsState;

export interface IDungeonGlobalStateLoad {
  hero: IHero;
  board: IBoardState<IField, IActor & IAassignedBoardObject>;
  dungeon: IDungeonState;
  players: IPlayer[];
}