import { Guid } from "../../extensions/types";
import { IActorsState } from "../../features/actors/actors.interface";
import { IHero } from "../../features/actors/hero/hero.interface";
import { IAassignedBoardObject, IBoardTemplate, IBoardState } from "../../features/board/board.interface";
import { IDungeonState, IDungeonTemplate } from "../../features/dungeon/dungeon.interface";
import { IEffectsState } from "../../features/effects/commons/effects-state-handler/effects-state.interface";
import { IPlayer } from "../../features/players/players.interface";

export type IDungeonGameplayState =
  IDungeonState &
  IActorsState &
  { actors: Partial<IAassignedBoardObject> } &
  IBoardState &
  IEffectsState;

export type IDungeonGameplayTemplate =
  IDungeonTemplate &
  IBoardTemplate &
  {
    actors: Partial<IAassignedBoardObject>
  };

export interface IDungeonGameplayPayload extends IActorsState {
  dungeonId: Guid;
  hero: IHero;
  players: IPlayer[];
};



export interface IDungeonGameplayDataFeed {
  getDungeonGameplayTemplates: (ids?: Guid[]) => Promise<IDungeonGameplayTemplate>[];
  getDungeonGameplayTemplate: (id: Guid) => Promise<IDungeonGameplayTemplate>
}