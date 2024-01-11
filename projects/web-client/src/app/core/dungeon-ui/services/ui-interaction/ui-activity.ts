import { IDataFeedEntityBase } from "src/app/core/data-feed/interfaces/data-feed-entity.interface";
import { IDungeonUiActivity } from "../../interfaces/dungeon-ui-activity";
import { DataFeedEntityType } from "src/app/core/data-feed/constants/data-feed-entity-type";
import { ISpellOrAbilityDataFeedEntity } from "src/app/core/data-feed/interfaces/data-feed-effect-entity.interface";
import { IBoardActorDataFeedEntity, ICharacterDataFeedEntity, IDungeonExitDataFeedEntity, ITreasureDataFeedEntity } from "src/app/core/data-feed/interfaces/data-feed-actor-entity.interface";
import { ITokenComposerDefinition } from "@3d-scene/lib/actors/game-objects/tokens/common/token.interface";

export class DungeonUiActivity implements IDungeonUiActivity {
  id: string;
  name: string;
  iconUrl: string;
  isHighlighted: boolean;
  isDisabled: boolean;
  isSelected: boolean;
  isContextual: boolean;
  readonly isStatic: boolean;
  data: IDataFeedEntityBase;

  constructor(
    data: IDataFeedEntityBase,
    isContextual: boolean = false,
    isStatic: boolean = false
  ) {
    this.id = data.id;
    this.data = data;
    this.name = data.informative.name;
    this.iconUrl = data.informative.iconUrl;
    this.isHighlighted = false;
    this.isDisabled = false;
    this.isSelected = false;
    this.isContextual = isContextual
    this.isStatic = isStatic;
  }
}

export class CastEffectUiActivity extends DungeonUiActivity {
  data: ISpellOrAbilityDataFeedEntity
}

export class ActorInteractionUiActivity extends DungeonUiActivity {
  data: IBoardActorDataFeedEntity<unknown>
}


export class ClaimTreasureUiActivity extends ActorInteractionUiActivity {
  data: ITreasureDataFeedEntity<ITokenComposerDefinition<unknown>>;

  constructor(data: ITreasureDataFeedEntity<ITokenComposerDefinition<unknown>>) {
    super(data, false)
  }
}

export class InteractCharacterUiActivity extends ActorInteractionUiActivity {
  data: ICharacterDataFeedEntity<ITokenComposerDefinition<unknown>>;

  constructor(data: ICharacterDataFeedEntity<ITokenComposerDefinition<unknown>>) {
    super(data, false)
  }
}

export class LeaveDungeonUiActivity extends ActorInteractionUiActivity {
  data: IDungeonExitDataFeedEntity<ITokenComposerDefinition<unknown>>;

  constructor(data: IDungeonExitDataFeedEntity<ITokenComposerDefinition<unknown>>) {
    super(data, true)
  }
}

export class FinishTurnUiActivity extends DungeonUiActivity {
  constructor() {
    super({
      id: 'finish-turn',
      entityType: DataFeedEntityType.Misc,
      informative: { name: 'Finish turn', description: 'asd' },
    }, false, true)
  }
}
