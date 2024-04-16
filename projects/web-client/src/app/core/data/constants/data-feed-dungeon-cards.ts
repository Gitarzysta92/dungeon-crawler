import {
  emptyCard as ec,
  makeAttackCard as mac,
  increaseEnemyAttackPowerCard as iceapc,
  moveCreatureCard as mec,
  spawnCreatureCard as scc
} from "@game-logic/gameplay/data/dungeon-cards.data";
import { IDataContainer } from "../interface/data-container.interface";
import { IVisualUiData } from "../../game-ui/entities/visual-medium/visual-medium.interface";
import { IVisualMedium } from "../../game-ui/entities/visual-medium/visual-medium.interface";
import { INarrationMedium } from "../../game-ui/entities/narrative-medium/narrative-medium.interface";

export const emptyCard: IDataContainer<typeof ec, INarrationMedium, IVisualMedium<IVisualUiData>> = Object.assign(ec, {
  narrative: { name: "Empty card", description: "Some text" },
  visual: {
    ui: { icon: '', avatar: { url: "" } }
  },
  isNarrationMedium: true as const,
  isVisualMedium: true as const,
  isMixin: true as const
});


export const makeAttackCard: IDataContainer<typeof mac, INarrationMedium, IVisualMedium<IVisualUiData>> = Object.assign(mac, {
  narrative: { name: "Make attack", description: "Some text" },
  visual: {
    ui: { icon: '', avatar: { url: "" } }
  },
  isNarrationMedium: true as const,
  isVisualMedium: true as const,
  isMixin: true as const
});


export const increaseEnemyAttackPowerCard: IDataContainer<typeof iceapc, INarrationMedium, IVisualMedium<IVisualUiData>> = Object.assign(iceapc, {
  narrative: { name: "Increase enemy attack power", description: "Some text" },
  visual: {
    ui: { icon: '', avatar: { url: "" } }
  },
  isNarrationMedium: true as const,
  isVisualMedium: true as const,
  isMixin: true as const
});


export const moveCreatureCard: IDataContainer<typeof mec, INarrationMedium, IVisualMedium<IVisualUiData>> = Object.assign(mec, {
  narrative: { name: "Move enemy", description: "Some text" },
  visual: {
    ui: { icon: '', avatar: { url: "" } }
  },
  isNarrationMedium: true as const,
  isVisualMedium: true as const,
  isMixin: true as const
});


export const spawnCreaturCard: IDataContainer<typeof scc, INarrationMedium, IVisualMedium<IVisualUiData>> = Object.assign(scc, {
  narrative: { name: "Spawn enemy", description: "Some text" },
  visual: {
    ui: { icon: '', avatar: { url: "" } }
  },
  isNarrationMedium: true as const,
  isVisualMedium: true as const,
  isMixin: true as const
});