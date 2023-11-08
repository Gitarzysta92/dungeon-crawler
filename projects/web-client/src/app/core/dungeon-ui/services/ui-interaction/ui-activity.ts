import { IDataFeedEntityBase } from "src/app/core/data-feed/interfaces/data-feed-entity.interface";
import { IDungeonUiActivity } from "../../interfaces/dungeon-ui-activity";
import { DataFeedEntityType } from "src/app/core/data-feed/constants/data-feed-entity-type";
import { ISpellOrAbilityDataFeedEntity } from "src/app/core/data-feed/interfaces/data-feed-effect-entity.interface";
import { ICharacterDataFeedEntity, IDungeonExitDataFeedEntity, ITreasureDataFeedEntity } from "src/app/core/data-feed/interfaces/data-feed-actor-entity.interface";

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

  public async resolveActivity() {

  }
}

export class CastEffectUiActivity extends DungeonUiActivity {
  data: ISpellOrAbilityDataFeedEntity
}

export class ActorInteractionUiActivity extends DungeonUiActivity {}


export class ClaimTreasureUiActivity extends ActorInteractionUiActivity {
  data: ITreasureDataFeedEntity;

  constructor(data: ITreasureDataFeedEntity) {
    super({
      id: 'claim-teasure',
      entityType: DataFeedEntityType.Misc,
      informative: { name: 'Claim treasure', description: 'asd' },
    }, false, true)
  }
}

export class InteractCharacterUiActivity extends ActorInteractionUiActivity {
  data: ICharacterDataFeedEntity;

  constructor(data: ICharacterDataFeedEntity) {
    super({
      id: 'interact-character',
      entityType: DataFeedEntityType.Misc,
      informative: { name: 'Interact character', description: 'asd' },
    }, false, true)
  }
}

export class ExitDungeonUiActivity extends ActorInteractionUiActivity {
  data: IDungeonExitDataFeedEntity;

  constructor(data: IDungeonExitDataFeedEntity) {
    super({
      id: 'exit-dungeon',
      entityType: DataFeedEntityType.Misc,
      informative: { name: 'Exit dungeon', description: 'asd' },
    }, true, true)
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
