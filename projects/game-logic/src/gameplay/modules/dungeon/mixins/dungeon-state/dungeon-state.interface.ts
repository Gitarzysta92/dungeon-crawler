import { IEntityDeclaration } from "../../../../../lib/base/entity/entity.interface";
import { IMixin } from "../../../../../lib/base/mixin/mixin.interface";
import { IState } from "../../../../../lib/base/state/state.interface";
import { ISerializable } from "../../../../../lib/extensions/json-serializer";
import { Guid } from "../../../../../lib/extensions/types";
import { ITurnBasedGameplayDeclaration, ITurnBasedGameplayState } from "../../../../../lib/modules/turn-based-gameplay/turn-based-gameplay.interface";

export interface IDungeonState extends IDungeonStateDeclaration, IState, ISerializable<IDungeonStateDeclaration>, ITurnBasedGameplayState {
  isDungeonFinished(): boolean;
}

export interface IDungeonStateDeclaration extends IMixin, ITurnBasedGameplayDeclaration {
  id: Guid,
  isDungeonState: true,
  entities: Array<IEntityDeclaration> 
}

export type IDungeonGameplayDataGatherer = any;

