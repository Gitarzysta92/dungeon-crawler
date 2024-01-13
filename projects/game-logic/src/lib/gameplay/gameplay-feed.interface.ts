import { IActorsDataFeed } from "../features/actors/actors.interface";
import { ICardsDeckDataFeed } from "../features/actors/cards-deck/cards-deck.interface";
import { IDungeonGameplayDataFeed } from "./dungeon/dungeon-global-state.interface";

export type IGameplayFeed =
  IActorsDataFeed &
  ICardsDeckDataFeed &
  IDungeonGameplayDataFeed;


// export interface IGameDataFeed {
//   getQuests: (ids?: string[]) => Promise<IQuest[]>;
//   getQuest: (id: string) => Promise<IQuest>;
//   getCharacters: (ids?: string[]) => Promise<(ICharacter & { inventory: IInventory, assignedAreaId: string })[]>;
//   getCharacter: (id: string) => Promise<(ICharacter & { inventory: IInventory, assignedAreaId: string })>;
//   getAreas: (ids?: string[]) => Promise<IArea[]>;
//   getArea: (id: string) => Promise<IArea>;

//   getActors: (ids?: string[]) => Promise<IActor[]>;
//   getActor: (id: string) => Promise<IActor>;

//   getDungeon: (id: string) => Promise<IDungeon>;
//   getDungeons: (ids?: string[]) => Promise<IDungeon[]>;
//   getDungeonCards: (ids?: string[]) => Promise<IDungeonCard<IEffect>[]>;
//   getItems: (ids?: string[]) => Promise<IItem[]>;
//   getItem: (id: string) => Promise<IItem>;
// }