import {
  emptyCard as ec,
  makeAttack as mac,
  fireball as fb,
  basicAttack as ba,
  drawCards as dc,
  increaseEnemyAttackPowerCard as iceapc,
  moveCreatureCard as mec,
  spawnCreatureCard as scc
} from "@game-logic/gameplay/data/cards.data";
import { IDataContainer } from "../interface/data-container.interface";
import { IUiMedium } from "../../game-ui/mixins/ui-medium/ui-medium.interface";
import { INarrativeMedium } from "../../game-ui/mixins/narrative-medium/narrative-medium.interface";


export const emptyCard: IDataContainer<typeof ec, INarrativeMedium, IUiMedium> = Object.assign(ec, {
  narrative: { name: "Empty card", description: "Some text" },
  uiData: { icon: '', avatar: { url: "" } },
  isNarrationMedium: true as const,
  isUiMedium: true as const,
  isMixin: true as const
});


export const fireball: IDataContainer<typeof fb, INarrativeMedium, IUiMedium> = Object.assign(fb, {
  narrative: { name: "Fireball", description: "Some text" },
  uiData: { icon: '', avatar: { url: "" } },
  isNarrationMedium: true as const,
  isUiMedium: true as const,
  isMixin: true as const
});

export const basicAttack: IDataContainer<typeof ba, INarrativeMedium, IUiMedium> = Object.assign(ba, {
  narrative: { name: "Basic attack", description: "Some text" },
  uiData: { icon: '', avatar: { url: "" } },
  isNarrationMedium: true as const,
  isUiMedium: true as const,
  isMixin: true as const
});


export const drawCards: IDataContainer<typeof dc, INarrativeMedium, IUiMedium> = Object.assign(dc, {
  narrative: { name: "Draw cards", description: "Some text" },
  uiData: { icon: '', avatar: { url: "" } },
  isNarrationMedium: true as const,
  isUiMedium: true as const,
  isMixin: true as const
});


export const makeAttackCard: IDataContainer<typeof mac, INarrativeMedium, IUiMedium> = Object.assign(mac, {
  narrative: { name: "Make attack", description: "Some text" },
  uiData: { icon: '', avatar: { url: "" } },
  isNarrationMedium: true as const,
  isUiMedium: true as const,
  isMixin: true as const
});


export const increaseEnemyAttackPowerCard: IDataContainer<typeof iceapc, INarrativeMedium, IUiMedium> = Object.assign(iceapc, {
  narrative: { name: "Increase enemy attack power", description: "Some text" },
  uiData: { icon: '', avatar: { url: "" } },
  isNarrationMedium: true as const,
  isUiMedium: true as const,
  isMixin: true as const
});


export const moveCreatureCard: IDataContainer<typeof mec, INarrativeMedium, IUiMedium> = Object.assign(mec, {
  narrative: { name: "Move enemy", description: "Some text" },
  uiData: { icon: '', avatar: { url: "" } },
  isNarrationMedium: true as const,
  isUiMedium: true as const,
  isMixin: true as const
});


export const spawnCreatureCard: IDataContainer<typeof scc, INarrativeMedium, IUiMedium> = Object.assign(scc, {
  narrative: { name: "Spawn enemy", description: "Some text" },
  uiData: { icon: '', avatar: { url: "" } },
  isNarrationMedium: true as const,
  isUiMedium: true as const,
  isMixin: true as const
});