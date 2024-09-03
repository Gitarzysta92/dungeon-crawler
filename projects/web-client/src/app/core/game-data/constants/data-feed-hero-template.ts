import { INarrativeMedium } from "../../game-ui/mixins/narrative-medium/narrative-medium.interface";
import { IUiMedium } from "../../game-ui/mixins/ui-medium/ui-medium.interface";
import { IDataContainer } from "../interface/data-container.interface";
import { ISceneMediumDeclaration } from "../../scene/mixins/scene-medium/scene-medium.interface";
import { IHeroDeclaration } from "@game-logic/gameplay/modules/heroes/mixins/hero/hero.interface";
import { emptyCard, basicAttack, drawCards, fireball } from "./data-feed-cards";
import { attackPowerStatistic, defenceStatistic, healthStatistic, majorActionStatistic, minorActionStatistic, moveActionStatistic, movementStatistic } from "./data-feed-statistics.data";
import { magicPoo, staffItem, travelSupplies } from "./data-feed-items";
import { additionalDamagePerk } from "./data-feed-perks";
import { bodySlot, bootsSlot, createCommonSlotsV2, gloveSlot, headSlot, necklaceSlot, weaponFirstSlot, weaponSecondSlot } from "./data-feed-inventory";
import { commonTileComposerDefinitionName } from "@3d-scene/lib/actors/game-objects/tokens/common-tile/common-tile.constants";
import { Side } from "@game-logic/lib/modules/board/entities/board-object/board-object.constants";
import { PLAYER_GROUP_ID } from "./common-identifiers.data";
import { AssetType } from "../../game-ui/constants/asset-type";
import { crushAbility, moveAbility, stealthAbility, visionAbility } from "./data-feed-abilities";
import { STATISTIC_HAS_VALUE } from "@game-logic/lib/modules/statistics/aspects/conditions/statistic-has-value.condition";


export const mageHeroTemplate: IDataContainer<IHeroDeclaration, INarrativeMedium, IUiMedium, ISceneMediumDeclaration & any> = {
  id: "816120F8-924D-4ECF-9166-833F284CB762",
  groupId: PLAYER_GROUP_ID,
  narrative: {
    name: "hero.816120F8-924D-4ECF-9166-833F284CB762.name",
    description: "hero.816120F8-924D-4ECF-9166-833F284CB762.description"
  },
  uiData: {
    icon: '',
    avatar: { fileName: "816120F8-924D-4ECF-9166-833F284CB762-avatar", ext: "png", type: AssetType.Avatar },
    portrait: { fileName: "816120F8-924D-4ECF-9166-833F284CB762-portrait", ext: "png", type: AssetType.Portrait }
  },
  scene: {
    composerDeclarations: [
      {
        definitionName: commonTileComposerDefinitionName,
        primaryColor: 0x31386c,
        jawelColor: 0xeb6f36,
        texture: {
          fileName: "816120F8-924D-4ECF-9166-833F284CB762-avatar",
          ext:"png",
          type: AssetType.TileTexture
        },
        outlets: [Side.Top]
      }
    ]
  },
  entities: [
    defenceStatistic,
    healthStatistic,
    attackPowerStatistic,
    movementStatistic,
    majorActionStatistic,
    minorActionStatistic,
    moveActionStatistic,
    Object.assign({ quantity: 4 }, emptyCard),
    Object.assign({ quantity: 4 }, basicAttack),
    Object.assign({ quantity: 4 }, drawCards),
    Object.assign({ quantity: 4 }, fireball),
    Object.assign({ quantity: 1 }, staffItem),
    Object.assign({ associatedSlotIds: [8], quantity: 100 }, travelSupplies),
    Object.assign({ associatedSlotIds: [9], quantity: 10 }, magicPoo),
    additionalDamagePerk,
    visionAbility,
    moveAbility,
  ],
  isNarrationMedium: true as const,
  isUiMedium: true as const,
  isSceneMedium: true as const,
  isPawn: true,
  isMixin: true,
  isEntity: true,
  isProgressable: true,
  isBoardObject: true,
  isActor: true,
  isInventoryBearer: true,
  isDefeatable: true,
  isStatisticBearer: true,
  isAbilityPerformer: true,
  isQuestResolver: true,
  isPerkBearer: true,
  isHero: true,
  isTraveler: true,
  isDungeonCrawler: true,
  isDeckBearer: true,
  isModifierExposer: true,
  isDamageDealer: true,
  isDamageReciver: true,
  level: 1,
  experiencePoints: 0,
  promotions: [],
  outlets: [Side.Top],
  hand: { isMixin: true, isCardsPile: true, pile: [] },
  discardPile: { isMixin: true, isCardsPile: true, pile: [] },
  drawPile: { isMixin: true, isCardsPile: true, pile: [] },
  trashPile: { isMixin: true, isCardsPile: true, pile: [] },
  temporaryPile: { isMixin: true, isCardsPile: true, pile: [] },
  deck: {
    isCardsDeck: true,
    drawSize: 3,
    isMixin: true,
    selectedCards: [
      { cardId: emptyCard.id, qunatity: 4 },
      { cardId: basicAttack.id, qunatity: 4 },
      { cardId: drawCards.id, qunatity: 4 },
      { cardId: fireball.id, qunatity: 4 },
    ]
  },
  inventorySlots: [
    weaponFirstSlot,
    weaponSecondSlot,
    headSlot,
    bodySlot,
    necklaceSlot,
    gloveSlot,
    bootsSlot,
    ...createCommonSlotsV2([
      { stackSize: 100, },
      { stackSize: 10, },
      { stackSize: 0 },
      { stackSize: 0 },
    ])
  ],
  defeatConditions: [
    { delegateId: STATISTIC_HAS_VALUE, payload: { bearer: "{{$}}", value: 0, statisticId: healthStatistic.id, comparator: 1 } }
  ],
  activeQuests: [],
  completedQuestIds: [],
  perks: []
};




export const rogueHeroTemplate2: IDataContainer<IHeroDeclaration, INarrativeMedium, IUiMedium, ISceneMediumDeclaration & any> = {
  id: "CBB2268A-DF6A-40A6-A049-27445F28643E",
  groupId: PLAYER_GROUP_ID,
  narrative: {
    name: "hero.CBB2268A-DF6A-40A6-A049-27445F28643E.name",
    description: "hero.CBB2268A-DF6A-40A6-A049-27445F28643E.description"
  },
  uiData: {
    icon: '',
    avatar: { fileName: "CBB2268A-DF6A-40A6-A049-27445F28643E-avatar", ext: "png", type: AssetType.Avatar },
    portrait: { fileName: "CBB2268A-DF6A-40A6-A049-27445F28643E-portrait", ext: "png", type: AssetType.Portrait }
  },
  scene: {
    composerDeclarations: [
      {
        definitionName: commonTileComposerDefinitionName,
        primaryColor: 0x31386c,
        jawelColor: 0xeb6f36,
        texture: {
          fileName: "CBB2268A-DF6A-40A6-A049-27445F28643E-avatar",
          ext:"png",
          type: AssetType.TileTexture
        },
        outlets: [Side.Top]
      }
    ]
  },
  entities: [
    defenceStatistic,
    healthStatistic,
    attackPowerStatistic,
    movementStatistic,
    majorActionStatistic,
    minorActionStatistic,
    moveActionStatistic,
    Object.assign({ quantity: 4 }, emptyCard),
    Object.assign({ quantity: 4 }, basicAttack),
    Object.assign({ quantity: 4 }, drawCards),
    Object.assign({ quantity: 4 }, fireball),
    Object.assign({ quantity: 1 }, staffItem),
    Object.assign({ associatedSlotIds: [8], quantity: 100 }, travelSupplies),
    Object.assign({ associatedSlotIds: [9], quantity: 10 }, magicPoo),
    additionalDamagePerk,
    stealthAbility,
    moveAbility,
  ],
  isNarrationMedium: true as const,
  isUiMedium: true as const,
  isSceneMedium: true as const,
  isPawn: true,
  isMixin: true,
  isEntity: true,
  isProgressable: true,
  isBoardObject: true,
  isActor: true,
  isInventoryBearer: true,
  isDefeatable: true,
  isStatisticBearer: true,
  isAbilityPerformer: true,
  isQuestResolver: true,
  isPerkBearer: true,
  isHero: true,
  isTraveler: true,
  isDungeonCrawler: true,
  isDeckBearer: true,
  isModifierExposer: true,
  isDamageDealer: true,
  isDamageReciver: true,
  level: 1,
  experiencePoints: 0,
  promotions: [],
  outlets: [Side.Top],
  hand: { isMixin: true, isCardsPile: true, pile: [] },
  discardPile: { isMixin: true, isCardsPile: true, pile: [] },
  drawPile: { isMixin: true, isCardsPile: true, pile: [] },
  trashPile: { isMixin: true, isCardsPile: true, pile: [] },
  temporaryPile: { isMixin: true, isCardsPile: true, pile: [] },
  deck: {
    isCardsDeck: true,
    drawSize: 3,
    isMixin: true,
    selectedCards: [
      { cardId: emptyCard.id, qunatity: 4 },
      { cardId: basicAttack.id, qunatity: 4 },
      { cardId: drawCards.id, qunatity: 4 },
      { cardId: fireball.id, qunatity: 4 },
    ]
  },
  inventorySlots: [
    weaponFirstSlot,
    weaponSecondSlot,
    headSlot,
    bodySlot,
    necklaceSlot,
    gloveSlot,
    bootsSlot,
    ...createCommonSlotsV2([
      { stackSize: 100, },
      { stackSize: 10, },
      { stackSize: 0 },
      { stackSize: 0 },
    ])
  ],
  defeatConditions: [
    { delegateId: STATISTIC_HAS_VALUE, payload: { bearer: "{{$}}", value: 0, statisticId: healthStatistic.id, comparator: 1 } }
  ],
  activeQuests: [],
  completedQuestIds: [],
  perks: []
};












export const warriorHeroTemplate3: IDataContainer<IHeroDeclaration, INarrativeMedium, IUiMedium, ISceneMediumDeclaration & any> = {
  id: "5587BDFC-15CA-4BB1-B13F-B90B365CFD2A",
  groupId: PLAYER_GROUP_ID,
  narrative: {
    name: "hero.5587BDFC-15CA-4BB1-B13F-B90B365CFD2A.name",
    description: "hero.5587BDFC-15CA-4BB1-B13F-B90B365CFD2A.description"
  },
  uiData: {
    icon: '',
    avatar: { fileName: "5587BDFC-15CA-4BB1-B13F-B90B365CFD2A-avatar", ext: "png", type: AssetType.Avatar },
    portrait: { fileName: "5587BDFC-15CA-4BB1-B13F-B90B365CFD2A-portrait", ext: "png", type: AssetType.Portrait }
  },
  scene: {
    composerDeclarations: [
      {
        definitionName: commonTileComposerDefinitionName,
        primaryColor: 0x31386c,
        jawelColor: 0xeb6f36,
        texture: {
          fileName: "5587BDFC-15CA-4BB1-B13F-B90B365CFD2A-avatar",
          ext:"png",
          type: AssetType.TileTexture
        },
        outlets: [Side.Top]
      }
    ]
  },
  entities: [
    defenceStatistic,
    healthStatistic,
    attackPowerStatistic,
    movementStatistic,
    majorActionStatistic,
    minorActionStatistic,
    moveActionStatistic,
    Object.assign({ quantity: 4 }, emptyCard),
    Object.assign({ quantity: 4 }, basicAttack),
    Object.assign({ quantity: 4 }, drawCards),
    Object.assign({ quantity: 4 }, fireball),
    Object.assign({ quantity: 1 }, staffItem),
    Object.assign({ associatedSlotIds: [8], quantity: 100 }, travelSupplies),
    Object.assign({ associatedSlotIds: [9], quantity: 10 }, magicPoo),
    additionalDamagePerk,
    crushAbility,
    moveAbility,
    
  ],
  isNarrationMedium: true as const,
  isUiMedium: true as const,
  isSceneMedium: true as const,
  isPawn: true,
  isMixin: true,
  isEntity: true,
  isProgressable: true,
  isBoardObject: true,
  isActor: true,
  isInventoryBearer: true,
  isDefeatable: true,
  isStatisticBearer: true,
  isAbilityPerformer: true,
  isQuestResolver: true,
  isPerkBearer: true,
  isHero: true,
  isTraveler: true,
  isDungeonCrawler: true,
  isDeckBearer: true,
  isModifierExposer: true,
  isDamageDealer: true,
  isDamageReciver: true,
  level: 1,
  experiencePoints: 0,
  promotions: [],
  outlets: [Side.Top],
  hand: { isMixin: true, isCardsPile: true, pile: [] },
  discardPile: { isMixin: true, isCardsPile: true, pile: [] },
  drawPile: { isMixin: true, isCardsPile: true, pile: [] },
  trashPile: { isMixin: true, isCardsPile: true, pile: [] },
  temporaryPile: { isMixin: true, isCardsPile: true, pile: [] },
  deck: {
    isCardsDeck: true,
    drawSize: 3,
    isMixin: true,
    selectedCards: [
      { cardId: emptyCard.id, qunatity: 4 },
      { cardId: basicAttack.id, qunatity: 4 },
      { cardId: drawCards.id, qunatity: 4 },
      { cardId: fireball.id, qunatity: 4 },
    ]
  },
  inventorySlots: [
    weaponFirstSlot,
    weaponSecondSlot,
    headSlot,
    bodySlot,
    necklaceSlot,
    gloveSlot,
    bootsSlot,
    ...createCommonSlotsV2([
      { stackSize: 100, },
      { stackSize: 10, },
      { stackSize: 0 },
      { stackSize: 0 },
    ])
  ],
  defeatConditions: [
    { delegateId: STATISTIC_HAS_VALUE, payload: { bearer: "{{$}}", value: 0, statisticId: healthStatistic.id, comparator: 1 } }
  ],
  activeQuests: [],
  completedQuestIds: [],
  perks: []
};