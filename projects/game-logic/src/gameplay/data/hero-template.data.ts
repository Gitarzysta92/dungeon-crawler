
import { v4 } from "uuid";
import { IHeroDeclaration } from "../modules/heroes/mixins/hero/hero.interface";
import { commonSlot1, commonSlot2, commonSlot3, commonSlot4, commonSlot5, weaponFirstSlot, weaponSecondSlot, bootsSlot, headSlot, necklaceSlot, gloveSlot, bodySlot } from "./inventory.data";
import { magicPoo, travelSupplies } from "./items.data";
import { defenceStatistic, improvableHealthStatistic, improvableAttackPowerStatistic, improvableSpellPowerStatistic, improvableMovementStatistic, improvableMajorActionStatistic, improvableMinorActionStatistic, improvableMoveActionStatistic, damageModifier } from "./statistics.data";
import { basicAttack, drawCards, emptyCard, fireball } from "./cards.data";
import { humanPlayer } from "./players.data";

export const heroTemplate: IHeroDeclaration = {
  id: "",
  playerId: humanPlayer.id,
  groupId: humanPlayer.groupId,
  name: null,
  raceId: null,
  classId: null,
  originId: null,
  statistic: {
    defence: defenceStatistic,
    health: improvableHealthStatistic,
    attackPower: improvableAttackPowerStatistic,
    spellPower: improvableSpellPowerStatistic,
    movement: improvableMovementStatistic,
    majorAction: improvableMajorActionStatistic,
    minorAction: improvableMinorActionStatistic,
    moveAction: improvableMoveActionStatistic,
  },
  defeatIndicatorsRef: [
    "{{$.statistic.health}}"
  ],
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
  level: 1,
  experiencePoints: 0,
  promotions: [],
  outlets: [],
  cards: [],
  deck: {
    id: "",
    isEntity: true,
    isMixin: true,
    isCardsDeck: true,
    drawSize: 3,
    hand: {
      isMixin: true,
      isCardsPile: true,
      pile: []
    },
    cards: [
      Object.assign({ quantity: 4 }, emptyCard),
      Object.assign({ quantity: 4 }, basicAttack),
      Object.assign({ quantity: 4 }, drawCards),
      Object.assign({ quantity: 4 }, fireball)
    ],
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
  },
  inventory: {
    id: "",
    isInventory: true,
    isEntity: true,
    isMixin: true,
    slots: [
      Object.assign({ stackSize: 100 }, commonSlot1),
      Object.assign({ stackSize: 1 }, commonSlot2),
      commonSlot3,
      commonSlot4,
      commonSlot5,
      ...(new Array(25).fill(Object.assign({ ... commonSlot1 }, { id: v4() }))),
      {
        ...weaponFirstSlot,
        ...damageModifier
      },
      weaponSecondSlot,
      headSlot,
      bodySlot,
      necklaceSlot,
      gloveSlot,
      bootsSlot
    ],
    items: [
      Object.assign({ associatedSlotIds: [commonSlot1.id] }, travelSupplies),
      Object.assign({ associatedSlotIds: [commonSlot2.id] }, magicPoo)
    ],
  },
  abilities: [],
  activeQuests: [],
  completedQuestIds: [],
  perks: []
}