import { campFireDefinitionName } from "@3d-scene/lib/actors/game-objects/tokens/camp-fire/camp-fire.constants";
import { ICampFireDefinition } from "@3d-scene/lib/actors/game-objects/tokens/camp-fire/camp-fire.interface";
import { IMagicGateDefinition } from "@3d-scene/lib/actors/game-objects/tokens/magic-gate/magic-gate.interface";
import { magicGateComposerDefinitionName } from "@3d-scene/lib/actors/game-objects/tokens/magic-gate/magic-gate.constants";
import { treasureChestDefinitionName } from "@3d-scene/lib/actors/game-objects/tokens/treasure-chest/treasure-chest.constants";
import { plainTileComposerDefinitionName } from "@3d-scene/lib/actors/game-objects/tokens/plain-tile/plain-tile.constants";
import { IPlainTileDefinition } from "@3d-scene/lib/actors/game-objects/tokens/plain-tile/plain-tile.interface";
import { barrelWithCandlesDefinitionName } from "@3d-scene/lib/actors/game-objects/tokens/barrel-with-candles/barrel-with-candles.constants";
import { IUiMedium } from "../../game-ui/mixins/ui-medium/ui-medium.interface";
import { INarrativeMedium } from "../../game-ui/mixins/narrative-medium/narrative-medium.interface";
import { IBarrelWithCandlesDefinition } from "@3d-scene/lib/actors/game-objects/tokens/barrel-with-candles/barrel-with-candles.interfaces";
import { IStoneFieldDefinition } from "@3d-scene/lib/actors/game-objects/fields/stone-field/stone-field.interface";
import { IBlankFieldDefinition } from "@3d-scene/lib/actors/game-objects/fields/blank-field/blank-field.interface";
import { IDataContainer } from "../interface/data-container.interface";
import { ISceneMediumDeclaration } from "../../scene/mixins/scene-medium/scene-medium.interface";
import { ITreasureChestDefinition } from "@3d-scene/lib/actors/game-objects/tokens/treasure-chest/treasure-chest.interface";
import { stoneFieldComposerDefinitionName } from "@3d-scene/lib/actors/game-objects/fields/stone-field/stone-field.constants";
import { blankFieldComposerDefinitionName } from "@3d-scene/lib/actors/game-objects/fields/blank-field/blank-field.constants";
import { emptyCard, fireball, increaseEnemyAttackPowerCard, makeAttackCard, moveCreatureCard, spawnCreatureCard } from "./data-feed-cards";
import { IActorDeclaration } from "@game-logic/lib/modules/actors/entities/actor/actor.interface";
import { IInventoryBearerDeclaration } from "@game-logic/lib/modules/items/entities/bearer/inventory-bearer.interface";
import { COMPUTER_PLAYER_ID, DUNGEON_GROUP_ID, DUNGEON_MASTER_ID, POO_ITEM_ID, RAT_ACTOR_ID } from "./common-identifiers.data";
import { IBoardObjectDeclaration } from "@game-logic/lib/modules/board/entities/board-object/board-object.interface";
import { ACTOR_DATA_TYPE, ACTOR_SELECTOR_IDENTIFIER } from "@game-logic/lib/modules/actors/actors.constants";
import { ProcedureStepTrigger } from "@game-logic/lib/base/procedure/procedure.constants";
import { BOARD_SELECTOR } from "@game-logic/lib/modules/board/aspects/selectors/board.selector";
import { IDeckBearerDeclaration } from "@game-logic/lib/modules/cards/entities/deck-bearer/deck-bearer.interface";
import { IStatisticBearerDeclaration } from "@game-logic/lib/modules/statistics/entities/bearer/statistic-bearer.interface";
import { attackPowerStatistic, defenceStatistic, healthStatistic } from "./data-feed-statistics.data";
import { IBoardFieldDeclaration } from "@game-logic/lib/modules/board/entities/board-field/board-field.interface";
import { IProcedureDeclaration } from "@game-logic/lib/base/procedure/procedure.interface";
import { IMakeActionStepDeclaration } from "@game-logic/lib/cross-cutting/action/action.interface";
import { IGatheringDataStepDeclaration } from "@game-logic/lib/cross-cutting/gatherer/data-gatherer.interface";
import { GRANT_EXPERIENCE } from "@game-logic/lib/modules/progression/aspects/actions/grant-experience.action";
import { MODIFY_STATISTIC_BY_FORMULA_ACTION } from "@game-logic/lib/modules/statistics/aspects/actions/modify-statistic-by-formula.action";
import { Side } from "@game-logic/lib/modules/board/entities/board-object/board-object.constants";
import { createCommonSlots } from "./data-feed-inventory";
import { AssetType } from "../../game-ui/constants/asset-type";
import { IRewarderDeclaration } from "@game-logic/lib/modules/rewards/entities/rewarder/rewarder.interface";
import { CLAIM_REWARD_ACTIVITY } from "@game-logic/lib/modules/rewards/rewards.constants";
import { ADD_CARD_ACTION } from "@game-logic/lib/modules/cards/aspects/actions/add-card.action";
import { IDamageDealerDeclaration } from "@game-logic/lib/modules/combat/entities/damage-dealer/damage-dealer.interface";
import { IDamageReciverDeclaration } from "@game-logic/lib/modules/combat/entities/damage-reciver/damage-reciver.interface";
import { IDefeatableDeclaration } from "@game-logic/lib/modules/combat/entities/defeatable/defeatable.interface";
import { STATISTIC_HAS_VALUE } from "@game-logic/lib/modules/statistics/aspects/conditions/statistic-has-value.condition";
import { HAS_NO_CARDS_TO_DRAW } from "@game-logic/lib/modules/cards/aspects/conditions/has-cards-to-draw.condition";





export const vendorActor: IDataContainer<IActorDeclaration & IInventoryBearerDeclaration, INarrativeMedium, IUiMedium> = {
  id: "E2A83BC9-5C2E-46A5-A8EF-D9F48B9146E4",
  sourceActorId: "E2A83BC9-5C2E-46A5-A8EF-D9F48B9146E4",
  narrative: { name: "Vendor", description: "Character" },
  uiData: {
    avatar: { fileName: `vendor`, ext: "png", type: AssetType.Avatar },
    color: 0x0002,
    icon: ""
  },
  inventorySlots: createCommonSlots(10),
  isInventoryBearer: true,
  isEntity: true,
  isActor: true,
  isMixin: true,
  isNarrationMedium: true,
  isUiMedium: true,
};




export const adventureTrasureActor: IDataContainer<
  IActorDeclaration &
  IBoardObjectDeclaration &
  IRewarderDeclaration,
  INarrativeMedium, IUiMedium, ISceneMediumDeclaration<ITreasureChestDefinition>> = {
  id: "1AFC69DD-FE13-4588-A106-49AA0AF4BAE1",
  activities: [
    { id: CLAIM_REWARD_ACTIVITY, cost: [], isActivity: true, isMixin: true },
  ],
  rewards: [
    { delegateId: ADD_CARD_ACTION, payload: { cardId: fireball.id, quantity: 2, bearer: "{{$.rewardable}}" } },
    { delegateId: ADD_CARD_ACTION, payload: { cardId: emptyCard.id, quantity: 2, bearer: "{{$.rewardable}}" } }
  ],
  isActivitySubject: true,
  isRewarder: true,
  isEntity: true,
  isActor: true,
  isMixin: true,
  isNarrationMedium: true,
  isUiMedium: true,
  isSceneMedium: true,
  isBoardObject: true,
  outlets: [],
  position: { r: -2, q: 1, s: 1 },
  scene: {
    composerDeclarations: [
      {
        definitionName: treasureChestDefinitionName,
        primaryColor: 0x4e3027,
        secondaryColor: 0x868686,
        tertiaryColor: 0xffc90c,
        lightColor: 0xff8400,
      }
    ]
  },
  narrative: { name: "Treasue", description: "" },
  uiData: {
    avatar: { fileName: `vendor`, ext: "png", type: AssetType.Avatar },
    color: 0x0002,
    icon: ""
  }
};






export const treasureActor: IDataContainer<IActorDeclaration & IBoardObjectDeclaration & IInventoryBearerDeclaration, INarrativeMedium, IUiMedium, ISceneMediumDeclaration<ITreasureChestDefinition>> = {
  id: "E2A83BC9-5C2E-46A5-A8EF-D9F48B9146E4",
  sourceActorId: "E2A83BC9-5C2E-46A5-A8EF-D9F48B9146E4",
  inventorySlots: createCommonSlots(10),
  outlets: [],
  isInventoryBearer: true,
  isBoardObject: true,
  isEntity: true,
  isActor: true,
  isMixin: true,
  isNarrationMedium: true,
  isUiMedium: true,
  isSceneMedium: true,
  narrative: { name: "treasure", description: "string" },
  uiData: {
    avatar: { fileName: `treasure`, ext: "png", type: AssetType.Avatar },
    color: 0x0002,
    icon: ""
  },
  scene: {
    composerDeclarations: [
      {
        definitionName: treasureChestDefinitionName,
        primaryColor: 0x4e3027,
        secondaryColor: 0x868686,
        tertiaryColor: 0xffc90c,
        lightColor: 0xff8400,
      }
    ]
  },
  // passives: [
  //   { 
  //     updateOn: [MOVED_EVENT, SPAWNED_EVENT],
  //     procedureSteps: {
  //       actor: GatheringDataProcedureStepFactory.validate({
  //         isInitialStep: true,
  //         isGatheringDataStep: true,
  //         dataProvider: {
  //           type: ACTOR_DATA_TYPE,
  //           selectors: [
  //             { delegateId: BOARD_SELECTOR, payload: { shape: 'radius', origin: "{{$}}", range: 1 } }
  //           ]
  //         },
  //         requireUniqueness: true,
  //         autogather: true,
  //         dataType: ACTOR_DATA_TYPE,
  //         nextStepTrigger: ProcedureStepTrigger.AfterAll,
  //         nextStep: "{{$.procedureSteps.path}}"
  //       }),
  //       makeAction: {
  //         isMakeActionStep: true,
  //         delegateId: APPLY_STATUS_ACTION,
  //         payload: {
  //           status: weaknessStatus,
  //           target: "{{$.associatedInventory.bearer}}",
  //         }
  //       } as IMakeActionStepDeclaration
  //     }
  //   }
  // ],
};




export const ratActor: IDataContainer<IActorDeclaration &
  IProcedureDeclaration &
  IStatisticBearerDeclaration &
  IBoardObjectDeclaration &
  IDefeatableDeclaration &
  IDamageDealerDeclaration &
  IDamageReciverDeclaration &
  IDefeatableDeclaration &
  IRewarderDeclaration, INarrativeMedium, IUiMedium, ISceneMediumDeclaration<IPlainTileDefinition>> = {
  id: RAT_ACTOR_ID,
  groupId: DUNGEON_GROUP_ID,
  sourceActorId: RAT_ACTOR_ID,
  entities: [
    Object.assign({ ...defenceStatistic }, { baseValue: 20 }),
    Object.assign({ ...healthStatistic }, { baseValue: 20 }),
    attackPowerStatistic,
  ],
  outlets: [Side.Top],
  procedureSteps: {
    actor: {
      isGatheringDataStep: true,
      dataType: ACTOR_DATA_TYPE,
      amount: 1,
      selectors: [
        { delegateId: ACTOR_SELECTOR_IDENTIFIER, payload: { notInGroup: "{{$.groupId}}" } },
        { delegateId: BOARD_SELECTOR, payload: { origin: "{{$}}", shape: "line", range: 1 } }
      ],
      nextStepTrigger: ProcedureStepTrigger.AfterAll,
      nextStep: "{{$.procedureSteps.makeAction}}"
    } as IGatheringDataStepDeclaration,
    makeAction: {
      isMakeActionStep: true,
      delegateId: MODIFY_STATISTIC_BY_FORMULA_ACTION,
      payload: {
        value: 10,
        caster: "{{$}}",
        target: "{{$.procedureSteps.actor}}",
      } 
    } as IMakeActionStepDeclaration
  },
  rewards: [
    { delegateId: GRANT_EXPERIENCE, payload: { ref: "{{$.defeater}}", amount: 10 } }
  ],
  defeatConditions: [
    { delegateId: STATISTIC_HAS_VALUE, payload: { bearer: "{{$}}", value: 0, statisticId: healthStatistic.id, comparator: 1 } }
  ],
  isDefeatable: true,
  isBoardObject: true,
  isEntity: true,
  isActor: true,
  isRewarder: true,
  isStatisticBearer: true,
  isMixin: true,
  isProcedure: true,
  isCreature: true,
  isDamageDealer: true,
  isDamageReciver: true,
  narrative: { name: "rat", description: "string" },
  uiData: {
    avatar: { fileName: `rat`, ext: "png", type: AssetType.Avatar },
    color: 0x0002,
    icon: ""
  },
  scene: {
    composerDeclarations: [
      {
        definitionName: plainTileComposerDefinitionName,
        primaryColor: 0x297353,
        outlineColor: 0xff4800,
        texture: {
          fileName: "rat",
          ext: "png",
          dir: "/images/actors"
        },
        outlets: [Side.Top]
      }
    ]
  },
  isNarrationMedium: true as const,
  isUiMedium: true as const,
  isSceneMedium: true as const
};






export const dungeonExitActor: IDataContainer<IActorDeclaration & IBoardObjectDeclaration, INarrativeMedium, IUiMedium, ISceneMediumDeclaration<IMagicGateDefinition>> = {
  id: "A3D83C26-FAC9-4446-89DF-D228C7A8810A",
  sourceActorId: "A3D83C26-FAC9-4446-89DF-D228C7A8810A",
  outlets: [],
  isBoardObject: true,
  isEntity: true,
  isActor: true,
  isMixin: true,
  narrative: { name: "dungeon exit", description: "string" },
  uiData: {
    avatar: { fileName: `exit`, ext: "png", type: AssetType.Avatar },
    color: 0x0002,
    icon: ""
  },
  scene: {
    composerDeclarations: [
      {
        definitionName: magicGateComposerDefinitionName,
        primaryColor: 0x797979,
        primaryTeleportColor: 0x124df4,
        secondaryTeleportColor: 0x83ecff,
        lightColor: 0x2769ff
      }
    ]
  },
  isNarrationMedium: true as const,
  isUiMedium: true as const,
  isSceneMedium: true as const
};



export const campFireActor: IDataContainer<IActorDeclaration & IBoardObjectDeclaration, INarrativeMedium, IUiMedium, ISceneMediumDeclaration<ICampFireDefinition>> = {
  id: "A3FAF197-EEDE-407D-A08F-EE8E519D359F",
  sourceActorId: "A3FAF197-EEDE-407D-A08F-EE8E519D359F",
  isEntity: true,
  isBoardObject: true,
  isActor: true,
  isMixin: true,
  outlets: [],
  narrative: { name: "obstacle", description: "string" },
  uiData: {
    avatar: { fileName: `obstacle`, ext: "png", type: AssetType.Avatar },
    color: 0x0002,
    icon: ""
  },
  entities: [

  ],
  scene: {
    composerDeclarations: [
      {
        definitionName: campFireDefinitionName,
        woodColor: 0x4b1010,
        flameColor: [0xff4800, 0xffee9d, 0xffecd2] as [number, number, number],
        flameBloomColor: 0xffea86,
        primaryLightColor: 0xffb400,
        secondaryLightColor: 0xff3c00
      }
    ]
  },
  isNarrationMedium: true as const,
  isUiMedium: true as const,
  isSceneMedium: true as const
};


export const barrelActor: IDataContainer<IActorDeclaration & IBoardObjectDeclaration, INarrativeMedium, IUiMedium, ISceneMediumDeclaration<IBarrelWithCandlesDefinition>> = {
  id: "A3FAF197-EEDE-407D-A08F-EE8E519D359F",
  sourceActorId: "A3FAF197-EEDE-407D-A08F-EE8E519D359F",
  isEntity: true,
  isBoardObject: true,
  isActor: true,
  isMixin: true,
  narrative: { name: "obstacle", description: "string" },
  outlets: [],
  uiData: {
    avatar: { fileName: `obstacle`, ext: "png", type: AssetType.Avatar },
    color: 0x0002,
    icon: ""
  },
  scene: {
    composerDeclarations: [
      {
      definitionName: barrelWithCandlesDefinitionName,
      primaryColor: 0x4e3027,
      secondaryColor: 0x868686,
      lightColor: 0xff8400,
      }
    ]
  },
  isNarrationMedium: true as const,
  isUiMedium: true as const,
  isSceneMedium: true as const
};


export const commonField: IDataContainer<IActorDeclaration & Omit<IBoardFieldDeclaration, "position">, INarrativeMedium, IUiMedium, ISceneMediumDeclaration<IStoneFieldDefinition>> = {
  id: "CFC29C26-7307-4618-A830-F48AD97E6E88",
  sourceActorId: "D4BE1449-0B05-43B9-B436-B59769BEE2FC",
  isEntity: true,
  isActor: true,
  isMixin: true,
  isBoardField: true,
  narrative: { name: "Stone field", description: "string" },
  uiData: {
    avatar: { fileName: `obstacle`, ext: "png", type: AssetType.Avatar },
    color: 0x0002,
    icon: ""
  },
  scene: {
    composerDeclarations: [
      {
        definitionName: stoneFieldComposerDefinitionName,
        primaryColor: 0x797979
      }
    ]
  },
  isNarrationMedium: true as const,
  isUiMedium: true as const,
  isSceneMedium: true as const
};



export const blankField: IDataContainer<IActorDeclaration & Omit<IBoardFieldDeclaration, "position">, INarrativeMedium, IUiMedium, ISceneMediumDeclaration<IBlankFieldDefinition>> = {
  id: "E5D8289F-AAEB-4DE2-9A76-E4CD8C4DCDFC",
  sourceActorId: "E5D8289F-AAEB-4DE2-9A76-E4CD8C4DCDFC",
  isEntity: true,
  isActor: true,
  isMixin: true,
  isBoardField: true,
  narrative: { name: "Blank field", description: "string" },
  uiData: {
    avatar: { fileName: `obstacle`, ext: "png", type: AssetType.Avatar },
    color: 0x0002,
    icon: ""
  },
  scene: {
    composerDeclarations: [
      {
        definitionName: blankFieldComposerDefinitionName,
        primaryColor: 0x4e3027,
      },
    ]
  },
  isNarrationMedium: true as const,
  isUiMedium: true as const,
  isSceneMedium: true as const
};



export const dungeonMaster: IDataContainer<IDeckBearerDeclaration & IActorDeclaration & IDefeatableDeclaration & IStatisticBearerDeclaration, INarrativeMedium, IUiMedium, ISceneMediumDeclaration<IPlainTileDefinition>> = {
  id: DUNGEON_MASTER_ID,
  groupId: DUNGEON_GROUP_ID,
  playerId: COMPUTER_PLAYER_ID,
  isPawn: true,
  narrative: { name: "Dungeon", description: "Master" },
  uiData: {
    avatar: { fileName: `vendor`, ext: "png", type: AssetType.Avatar },
    color: 0x0002,
    icon: ""
  },
  entities: [
    healthStatistic,
    Object.assign({ quantity: 4 }, makeAttackCard),
    Object.assign({ quantity: 4 }, increaseEnemyAttackPowerCard),
    Object.assign({ quantity: 4 }, moveCreatureCard),
    Object.assign({ quantity: 4 }, spawnCreatureCard)
  ],
  hand: { isMixin: true, isCardsPile: true, pile: [] },
  discardPile: { isMixin: true, isCardsPile: true, pile: [] },
  drawPile: { isMixin: true, isCardsPile: true, pile: [] },
  trashPile: { isMixin: true, isCardsPile: true, pile: [] },
  temporaryPile: { isMixin: true, isCardsPile: true, pile: [] },
  deck: {
    isCardsDeck: true,
    isMixin: true,
    drawSize: 3,
    selectedCards: []
  },
  defeatConditions: [
    { delegateId: STATISTIC_HAS_VALUE, payload: { bearer: "{{$}}", value: 0, statisticId: healthStatistic.id, comparator: 1 } },
    { delegateId: HAS_NO_CARDS_TO_DRAW, payload: { bearer: "{{$}}" } }
  ],
  isDeckBearer: true,
  isMixin: true,
  isEntity: true,
  isActor: true,
  isDefeatable: true,
  isStatisticBearer: true,
  scene: {
    composerDeclarations: [
      {
        definitionName: plainTileComposerDefinitionName,
        primaryColor: 0x4e3027,
        outlineColor: 0x4e3027,
        texture: { fileName: "vendor", ext: "png", type: AssetType.Avatar },
        outlets: []
      }
    ]
  },
  isNarrationMedium: true as const,
  isUiMedium: true as const,
  isSceneMedium: true as const
};