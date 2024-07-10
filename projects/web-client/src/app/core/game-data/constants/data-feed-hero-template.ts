import { heroTemplate as ht } from "@game-logic/gameplay/data/hero-template.data";
import { INarrativeMedium } from "../../game-ui/mixins/narrative-medium/narrative-medium.interface";
import { IUiMedium } from "../../game-ui/mixins/ui-medium/ui-medium.interface";
import { IDataContainer } from "../interface/data-container.interface";
import { ISceneMediumDeclaration } from "../../scene/mixins/scene-medium/scene-medium.interface";
import { commonSlot1, commonSlot2, commonSlot3, commonSlot4, commonSlot5, weaponFirstSlot } from "@game-logic/gameplay/data/inventory.data";
import { v4 } from "uuid";
import { damageModifier, defenceStatistic, improvableAttackPowerStatistic, improvableHealthStatistic, improvableMajorActionStatistic, improvableMinorActionStatistic, improvableMoveActionStatistic, improvableMovementStatistic, improvableSpellPowerStatistic } from "./data-feed-statistics.data";
import { bodySlot, bootsSlot, gloveSlot, headSlot, necklaceSlot, weaponSecondSlot } from "./data-feed-inventory";
import { boots, magicPoo, staff, travelSupplies, twoHandedSword } from "./data-feed-items";
import { basicAttack, drawCards, emptyCard, fireball } from "./data-feed-cards";


export const heroTemplate: IDataContainer<typeof ht, INarrativeMedium, IUiMedium, ISceneMediumDeclaration> = Object.assign(ht, {
  narrative: {
    name: "hero-races.816120F8-924D-4ECF-9166-833F284CB762.name",
    description: "hero-races.816120F8-924D-4ECF-9166-833F284CB762.description"
  },
  uiData: { icon: '', avatar: { url: "816120F8-924D-4ECF-9166-833F284CB762-avatar.png" } },
  scene: { composerDeclarations: [] },
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
  isNarrationMedium: true as const,
  isUiMedium: true as const,
  isSceneMedium: true as const,
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
  inventory: Object.assign(ht.inventory, {
    items: [
      Object.assign({ associatedSlotIds: [commonSlot1.id] }, travelSupplies),
      Object.assign({ associatedSlotIds: [commonSlot2.id] }, magicPoo),
      Object.assign({ associatedSlotIds: [weaponFirstSlot.id] }, twoHandedSword),
      Object.assign({ associatedSlotIds: [bootsSlot.id] }, boots),
      Object.assign({ associatedSlotIds: [commonSlot3.id] }, staff),
    ],
    slots: [
      Object.assign({ stackSize: 100 }, commonSlot1),
      Object.assign({ stackSize: 1 }, commonSlot2),
      Object.assign({ stackSize: 1 }, commonSlot3),
      commonSlot4,
      commonSlot5,
      ...(new Array(25).fill({ ...commonSlot1 }).map(s => Object.assign({ ...s }, { id: v4() }))),
      Object.assign({ stackSize: 1}, {
        ...damageModifier,
        ...weaponFirstSlot,
      }),
      Object.assign({ stackSize: 1 }, weaponSecondSlot),
      headSlot,
      bodySlot,
      necklaceSlot,
      gloveSlot,
      Object.assign({ stackSize: 1 }, bootsSlot)
    ]
  })
});