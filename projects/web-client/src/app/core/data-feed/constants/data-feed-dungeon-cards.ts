import {
  emptyCard as ec,
  makeAttackCard as mac,
  increaseEnemyAttackPowerCard as iceapc,
  moveCreatureCard as mec,
  spawnCreatureCard as scc
} from "@game-logic/gameplay/data/dungeon-cards.data";
import { IAuxiliaryContainer, INarrationData, IVisualData, IVisualUiData } from "../../commons/interfaces/auxiliary-container.interface";

export const emptyCard: IAuxiliaryContainer<typeof ec, INarrationData, IVisualData<IVisualUiData>> = Object.assign(ec, {
  narrative: { name: "Empty card", description: "Some text" },
  visual: {
    ui: { icon: '', avatar: { url: "" } }
  }
});


export const makeAttackCard: IAuxiliaryContainer<typeof mac, INarrationData, IVisualData<IVisualUiData>> = Object.assign(mac, {
  narrative: { name: "Make attack", description: "Some text" },
  visual: {
    ui: { icon: '', avatar: { url: "" } }
  }
});


export const increaseEnemyAttackPowerCard: IAuxiliaryContainer<typeof iceapc, INarrationData, IVisualData<IVisualUiData>> = Object.assign(iceapc, {
  narrative: { name: "Increase enemy attack power", description: "Some text" },
  visual: {
    ui: { icon: '', avatar: { url: "" } }
  }
});


export const moveCreatureCard: IAuxiliaryContainer<typeof mec, INarrationData, IVisualData<IVisualUiData>> = Object.assign(mec, {
  narrative: { name: "Move enemy", description: "Some text" },
  visual: {
    ui: { icon: '', avatar: { url: "" } }
  }
});


export const spawnCreaturCard: IAuxiliaryContainer<typeof scc, INarrationData, IVisualData<IVisualUiData>> = Object.assign(scc, {
  narrative: { name: "Spawn enemy", description: "Some text" },
  visual: {
    ui: { icon: '', avatar: { url: "" } }
  }
});