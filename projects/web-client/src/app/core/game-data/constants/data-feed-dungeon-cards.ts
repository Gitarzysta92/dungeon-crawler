import {
  emptyCard as ec,
  makeAttackCard as mac,
  increaseEnemyAttackPowerCard as iceapc,
  moveCreatureCard as mec,
  spawnCreatureCard as scc
} from "@game-logic/gameplay/data/dungeon-cards.data";
import { IDataContainer } from "../interface/data-container.interface";
import { IUiMedium } from "../../game-ui/mixins/visual-medium/ui-medium.interface";
import { INarrationMedium } from "../../game-ui/mixins/narrative-medium/narrative-medium.interface";


export const emptyCard: IDataContainer<typeof ec, INarrationMedium, IUiMedium> = Object.assign(ec, {
  narrative: { name: "Empty card", description: "Some text" },
  uiData: { icon: '', avatar: { url: "" } },
  isNarrationMedium: true as const,
  isUiMedium: true as const,
  isMixin: true as const
});


export const makeAttackCard: IDataContainer<typeof mac, INarrationMedium, IUiMedium> = Object.assign(mac, {
  narrative: { name: "Make attack", description: "Some text" },
  uiData: { icon: '', avatar: { url: "" } },
  isNarrationMedium: true as const,
  isUiMedium: true as const,
  isMixin: true as const
});


export const increaseEnemyAttackPowerCard: IDataContainer<typeof iceapc, INarrationMedium, IUiMedium> = Object.assign(iceapc, {
  narrative: { name: "Increase enemy attack power", description: "Some text" },
  uiData: { icon: '', avatar: { url: "" } },
  isNarrationMedium: true as const,
  isUiMedium: true as const,
  isMixin: true as const
});


export const moveCreatureCard: IDataContainer<typeof mec, INarrationMedium, IUiMedium> = Object.assign(mec, {
  narrative: { name: "Move enemy", description: "Some text" },
  uiData: { icon: '', avatar: { url: "" } },
  isNarrationMedium: true as const,
  isUiMedium: true as const,
  isMixin: true as const
});


export const spawnCreatureCard: IDataContainer<typeof scc, INarrationMedium, IUiMedium> = Object.assign(scc, {
  narrative: { name: "Spawn enemy", description: "Some text" },
  uiData: { icon: '', avatar: { url: "" } },
  isNarrationMedium: true as const,
  isUiMedium: true as const,
  isMixin: true as const
});