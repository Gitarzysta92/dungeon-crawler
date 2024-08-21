import { IUiMedium } from "../../game-ui/mixins/ui-medium/ui-medium.interface";
import { INarrativeMedium } from "../../game-ui/mixins/narrative-medium/narrative-medium.interface";
import { IDataContainer } from "../interface/data-container.interface";
import { defenceStatistic, healthStatistic, attackPowerStatistic, spellPowerStatistic, movementStatistic } from "./data-feed-statistics.data";
import { IHeroRaceDeclaration } from "@game-logic/gameplay/modules/heroes/mixins/hero-race/hero-race.interface";
import { Side, Size } from "@game-logic/lib/modules/board/entities/board-object/board-object.constants";
import { move } from "./data-feed-abilities";
import { additionalAtackPerk } from "./data-feed-perks.data";
import { AssetType } from "../../game-ui/constants/asset-type";



export const human: IDataContainer<IHeroRaceDeclaration, INarrativeMedium, IUiMedium> = {
  id: "816120F8-924D-4ECF-9166-833F284CB762",
  narrative: {
    name: "hero-races.816120F8-924D-4ECF-9166-833F284CB762.name",
    description: "hero-races.816120F8-924D-4ECF-9166-833F284CB762.description"
  },
  uiData: { icon: '', avatar: { type: AssetType.Avatar,  fileName: "816120F8-924D-4ECF-9166-833F284CB762-avatar", ext: "png" }},
  size: Size.Medium,
  outlets: [Side.Top],
  statistics: [
    Object.assign(defenceStatistic, { value: 10 }),
    Object.assign(healthStatistic, { value: 10 }),
    Object.assign(attackPowerStatistic, { value: 10 }),
    Object.assign(spellPowerStatistic, { value: 10 }),
    Object.assign(movementStatistic, { value: 10 })
  ],
  abilities: [
    //basicAttack,
    move,
  ],
  perks: [
    additionalAtackPerk
  ],
  isHeroRace: true,
  isNarrationMedium: true as const,
  isUiMedium: true as const,
  isMixin: true as const,
  isEntity: true
}

export const elf: IDataContainer<IHeroRaceDeclaration, INarrativeMedium, IUiMedium> = {
  id: "222031F9-D2EC-4459-9830-C99BC6D7633A",
  narrative: {
    name: "hero-races.222031F9-D2EC-4459-9830-C99BC6D7633A.name",
    description: "hero-races.222031F9-D2EC-4459-9830-C99BC6D7633A.description"
  },
  uiData: { icon: '', avatar: { type: AssetType.Avatar,  fileName: "222031F9-D2EC-4459-9830-C99BC6D7633A-avatar", ext: "png" }},
  size: Size.Medium,
  outlets: [Side.Top],
  statistics: [
    Object.assign(defenceStatistic, { value: 10 }),
    Object.assign(healthStatistic, { value: 10 }),
    Object.assign(attackPowerStatistic, { value: 10 }),
    Object.assign(spellPowerStatistic, { value: 10 }),
    Object.assign(movementStatistic, { value: 10 })
  ],
  abilities: [
    //basicAttack,
    move,
  ],
  perks: [
    additionalAtackPerk
  ],
  isHeroRace: true,
  isNarrationMedium: true as const,
  isUiMedium: true as const,
  isMixin: true as const,
  isEntity: true
}