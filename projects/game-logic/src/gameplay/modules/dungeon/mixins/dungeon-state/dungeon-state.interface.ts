import { IState } from "../../../../../helpers/dispatcher/state.interface";
import { IEntityDeclaration } from "../../../../../lib/base/entity/entity.interface";
import { ISerializable } from "../../../../../lib/infrastructure/extensions/json-serializer";
import { Guid } from "../../../../../lib/infrastructure/extensions/types";
import { IMixin } from "../../../../../lib/infrastructure/mixin/mixin.interface";

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

