import { ACTOR_DATA_TYPE, ACTOR_SELECTOR_IDENTIFIER } from "../../lib/modules/actors/actors.constants"
import { DEFEATED_EVENT } from "../../lib/modules/actors/aspects/events/defeated.event"
import { IActor, IActorDeclaration } from "../../lib/modules/actors/entities/actor/actor.interface"
import { IDefeatableDeclaration } from "../../lib/modules/actors/entities/defeatable/defeatable.interface"
import { BOARD_SELECTOR } from "../../lib/modules/board/aspects/selectors/board.selector"
import { IBoardFieldDeclaration } from "../../lib/modules/board/entities/board-field/board-field.interface"
import { Side } from "../../lib/modules/board/entities/board-object/board-object.constants"
import { IBoardObjectDeclaration } from "../../lib/modules/board/entities/board-object/board-object.interface"
import { IInventoryBearerDeclaration } from "../../lib/modules/items/entities/bearer/inventory-bearer.interface"
import { InventorySlotType } from "../../lib/modules/items/entities/inventory-slot/inventory-slot.constants"
import { GRANT_EXPERIENCE } from "../../lib/modules/progression/aspects/actions/grant-experience.action"
import { IQuestCompleterDeclaration } from "../../lib/modules/quest/entities/quest-completer/quest-completer.interface"
import { IRewarderDeclaration } from "../../lib/modules/rewards/rewards.interface"
import { MODIFY_STATISTIC_BY_FORMULA_ACTION } from "../../lib/modules/statistics/aspects/actions/modify-statistic-by-formula.action"
import { IStatisticBearerDeclaration } from "../../lib/modules/statistics/entities/bearer/statistic-bearer.interface"
import { IAffectable } from "../../lib/modules/statuses/entities/affectable/affectable.interface"
import { IVendorDeclaration } from "../../lib/modules/vendors/entities/vendor/vendor.interface"
import { TRADE_ACTIVITY } from "../../lib/modules/vendors/vendors.constants"
import { IBoardAreaResidentDeclaration } from "../modules/board-areas/entities/board-resident/resident.interface"
import { IDungeonExit } from "../modules/dungeon/mixins/dungeon-exit/dungeon-exit"
import { COMPUTER_PLAYER_ID, DUNGEON_GROUP_ID, DUNGEON_MASTER_ID, FIRST_AREA_ID, RAT_ACTOR_ID, VENDOR_CHARACTER_ID, VENDOR_FIRST_COMMON_SLOT_ID, VENDOR_SECOND_COMMON_SLOT_ID, VENDOR_THIRD_COMMON_SLOT_ID } from "./common-identifiers.data"
import { vendorHealingPotion, vendorMagicPoo, vendorStaff } from "./items.data"
import { reportRatsExterminationQuest } from "./quests.data"
import { attackPowerStatistic, dealDamageFormula, defenceStatistic, improvableHealthStatistic } from "./statistics.data"
import { IDeckBearerDeclaration } from "../../lib/modules/cards/entities/deck-bearer/deck-bearer.interface"
import { IProcedureDeclaration } from "../../lib/base/procedure/procedure.interface"
import { IGatheringDataProcedureStepDeclaration } from "../../lib/cross-cutting/gatherer/data-gatherer.interface"
import { ProcedureStepTrigger } from "../../lib/base/procedure/procedure.constants"
import { IMakeActionProcedureStepDeclaration } from "../../lib/cross-cutting/action/action.interface"
import { makeAttack, increaseEnemyAttackPowerCard, moveCreatureCard, spawnCreatureCard } from "./cards.data"


export const ratActor:
  IActor &
  IAffectable &
  IProcedureDeclaration &
  IStatisticBearerDeclaration &
  IBoardObjectDeclaration &
  IDefeatableDeclaration &
  IRewarderDeclaration = {
  id: RAT_ACTOR_ID,
  groupId: DUNGEON_GROUP_ID,
  sourceActorId: RAT_ACTOR_ID,
  statistic: {
    defence: defenceStatistic,
    health: improvableHealthStatistic,
    attackPower: attackPowerStatistic,
  },
  defeatIndicatorsRef: ["{{$.statistic.health}}"],
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
    } as IGatheringDataProcedureStepDeclaration,
    makeAction: {
      isMakeActionStep: true,
      delegateId: MODIFY_STATISTIC_BY_FORMULA_ACTION,
      payload: {
        value: 10,
        caster: "{{$}}",
        target: "{{$.procedureSteps.actor}}",
        formula: dealDamageFormula.id
      } 
    } as IMakeActionProcedureStepDeclaration
  },
  rewards: [
    {
      id: "35655FE7-EE63-44FC-9A95-7E549B5C852F",
      isReward: true,
      isEntity: true,
      rewardWhen: [{ delegateId: DEFEATED_EVENT, payload: { defeatable: "{{$}}" } }],
      actions: [{ delegateId: GRANT_EXPERIENCE, payload: { ref: "{{$.defeater}}", amount: 10 } }],
      autoclaim: true,
      isMixin: true
    }
  ],
  isDefeatable: true,
  isBoardObject: true,
  isAffectable: true,
  isEntity: true,
  isActor: true,
  isRewarder: true,
  isStatisticBearer: true,
  isMixin: true,
  isProcedure: true,
  isCreature: true
}



export const obstacleActor: IActor & IBoardObjectDeclaration = {
  id: "A3FAF197-EEDE-407D-A08F-EE8E519D359F",
  sourceActorId: "A3FAF197-EEDE-407D-A08F-EE8E519D359F",
  isEntity: true,
  isBoardObject: true,
  isActor: true,
  isMixin: true,
  outlets: []
}



export const treasureActor: IActor & IBoardObjectDeclaration & IInventoryBearerDeclaration = {
  id: "E2A83BC9-5C2E-46A5-A8EF-D9F48B9146E4",
  sourceActorId: "E2A83BC9-5C2E-46A5-A8EF-D9F48B9146E4",
  inventory: {
    id: "2F48E406-528F-4DA1-A624-B9BD327B9C6A",
    isInventory: true,
    isEntity: true,
    isMixin: true,
    slots: [
      { id: VENDOR_FIRST_COMMON_SLOT_ID, slotType: InventorySlotType.Common, isEntity: true, isInventorySlot: true, isMixin: true },
      { id: VENDOR_SECOND_COMMON_SLOT_ID, slotType: InventorySlotType.Common, isEntity: true, isInventorySlot: true, isMixin: true },
      { id: VENDOR_THIRD_COMMON_SLOT_ID, slotType: InventorySlotType.Common, isEntity: true, isInventorySlot: true, isMixin: true },
    ],
    items: []
  },
  outlets: [],
  isInventoryBearer: true,
  isBoardObject: true,
  isEntity: true,
  isActor: true,
  isMixin: true
}



export const dungeonExitActor: IActor & IDungeonExit & IBoardObjectDeclaration = {
  id: "A3D83C26-FAC9-4446-89DF-D228C7A8810A",
  sourceActorId: "A3D83C26-FAC9-4446-89DF-D228C7A8810A",
  applyExitBonus: false,
  outlets: [],
  isDungeonExit: true,
  isBoardObject: true,
  isEntity: true,
  isActor: true,
  isMixin: true
}


export const blankField: IActorDeclaration & Omit<IBoardFieldDeclaration, "position"> = {
  id: "E5D8289F-AAEB-4DE2-9A76-E4CD8C4DCDFC",
  sourceActorId: "E5D8289F-AAEB-4DE2-9A76-E4CD8C4DCDFC",
  isEntity: true,
  isActor: true,
  isMixin: true,
  isBoardField: true,
}


export const commonField: IActorDeclaration & Omit<IBoardFieldDeclaration, "position"> = {
  id: "CFC29C26-7307-4618-A830-F48AD97E6E88",
  sourceActorId: "D4BE1449-0B05-43B9-B436-B59769BEE2FC",
  isEntity: true,
  isActor: true,
  isMixin: true,
  isBoardField: true,
}


export const vendorActor: IActorDeclaration & IVendorDeclaration & IBoardAreaResidentDeclaration & IQuestCompleterDeclaration & IInventoryBearerDeclaration = {
  id: VENDOR_CHARACTER_ID,
  inventory: {
    id: "458B0332-ADDC-4A83-ABC0-B0ABE902F5EC",
    isEntity: true,
    isInventory: true,
    isMixin: true,
    slots: [
      { id: VENDOR_FIRST_COMMON_SLOT_ID, slotType: InventorySlotType.Common, isEntity: true, isInventorySlot: true, isMixin: true },
      { id: VENDOR_SECOND_COMMON_SLOT_ID, slotType: InventorySlotType.Common, isEntity: true, isInventorySlot: true, isMixin: true },
      { id: VENDOR_THIRD_COMMON_SLOT_ID, slotType: InventorySlotType.Common, isEntity: true, isInventorySlot: true, isMixin: true },
      { id: "75020F5A-CC48-457C-B8AE-B48F933F9C02", slotType: InventorySlotType.Common, isEntity: true, isInventorySlot: true, isMixin: true },
    ],
    items: [
      vendorHealingPotion,
      vendorStaff,
      vendorMagicPoo
    ]
  },
  activities: [
    { id: TRADE_ACTIVITY, isActivity: true, isMixin: true },
  ], 
  sourceActorId: VENDOR_CHARACTER_ID,
  occupiedAreaId: FIRST_AREA_ID,
  isMixin: true,
  isEntity: true,
  isActor: true,
  isInventoryBearer: true,
  isQuestCompleter: true,
  isResident: true,
  isBoardObject: true,
  isVendor: true,
  isActivitySubject: true,
  outlets: [],
  completableQuestIds: [reportRatsExterminationQuest.id],
};



export const dungeonMaster: IDeckBearerDeclaration & IActorDeclaration & IDefeatableDeclaration & IStatisticBearerDeclaration = {
  id: DUNGEON_MASTER_ID,
  groupId: DUNGEON_GROUP_ID,
  playerId: COMPUTER_PLAYER_ID,
  isPawn: true,
  statistic: {
    health: improvableHealthStatistic,
  },
  defeatIndicatorsRef: ["{{$.statistic.health}}"],
  isDeckBearer: true,
  isMixin: true,
  isEntity: true,
  isActor: true,
  isDefeatable: true,
  isStatisticBearer: true,
  cards: [],
  deck: {
    id: "",
    isEntity: true,
    isMixin: true,
    isCardsDeck: true,
    cards: [
      Object.assign({ quantity: 4 }, makeAttack),
      Object.assign({ quantity: 4 }, increaseEnemyAttackPowerCard),
      Object.assign({ quantity: 4 }, moveCreatureCard),
      Object.assign({ quantity: 4 }, spawnCreatureCard)
    ],
    drawSize: 3,
    hand: {
      isMixin: true,
      isCardsPile: true,
      pile: []
    },
    discardPile: {
      isMixin: true,
      isCardsPile: true,
      pile: []
    },
    drawPile: {
      isMixin: true,
      isCardsPile: true,
      pile: []
    },
    trashPile: {
      isMixin: true,
      isCardsPile: true,
      pile: []
    }
  }
}
