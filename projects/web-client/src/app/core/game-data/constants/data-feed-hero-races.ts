import {
  human as h,
  elf as e
} from "@game-logic/gameplay/data/hero-races";
import { IUiData } from "../../game-ui/mixins/visual-medium/ui-medium.interface";
import { IUiMedium } from "../../game-ui/mixins/visual-medium/ui-medium.interface";
import { INarrationMedium } from "../../game-ui/mixins/narrative-medium/narrative-medium.interface";
import { IDataContainer } from "../interface/data-container.interface";
import { improvableAttackPowerStatistic, improvableDefenceStatistic, improvableHealthStatistic, improvableMovementStatistic, improvableSpellPowerStatistic } from "./data-feed-statistics.data";

export const human: IDataContainer<typeof h, INarrationMedium, IUiMedium> = Object.assign(h, {
  narrative: {
    name: "hero-races.816120F8-924D-4ECF-9166-833F284CB762.name",
    description: "hero-races.816120F8-924D-4ECF-9166-833F284CB762.description"
  },
  uiData: { icon: '', avatar: { url: "816120F8-924D-4ECF-9166-833F284CB762-avatar.png" } },
  statistics: [
    Object.assign(improvableDefenceStatistic, { value: 10 }),
    Object.assign(improvableHealthStatistic, { value: 10 }),
    Object.assign(improvableAttackPowerStatistic, { value: 10 }),
    Object.assign(improvableSpellPowerStatistic, { value: 10 }),
    Object.assign(improvableMovementStatistic, { value: 10 })
  ],
  isNarrationMedium: true as const,
  isUiMedium: true as const,
  isMixin: true as const
})

export const elf: IDataContainer<typeof e, INarrationMedium, IUiMedium> = Object.assign(e, {
  narrative: {
    name: "hero-races.222031F9-D2EC-4459-9830-C99BC6D7633A.name",
    description: "hero-races.222031F9-D2EC-4459-9830-C99BC6D7633A.description"
  },
  uiData: { icon: '', avatar: { url: "222031F9-D2EC-4459-9830-C99BC6D7633A-avatar.png" } },
  statistics: [
    Object.assign(improvableDefenceStatistic, { value: 10 }),
    Object.assign(improvableHealthStatistic, { value: 10 }),
    Object.assign(improvableAttackPowerStatistic, { value: 10 }),
    Object.assign(improvableSpellPowerStatistic, { value: 10 }),
    Object.assign(improvableMovementStatistic, { value: 10 })
  ],
  isNarrationMedium: true as const,
  isUiMedium: true as const,
  isMixin: true as const
})