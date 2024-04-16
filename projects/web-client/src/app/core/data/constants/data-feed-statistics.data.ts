import {
  defenceStatistic as ds,
  improvableDefenceStatistic as ids,
  healthStatistic as hs,
  improvableHealthStatistic as ihs,
  attackPowerStatistic as aps,
  improvableAttackPowerStatistic as iaps,
  spellPowerStatistic as sps,
  improvableSpellPowerStatistic as isps,
  movementStatistic as ms,
  improvableMovementStatistic as ims,
  improvableMajorActionStatistic as imaas,
  improvableMinorActionStatistic as imias,
  damageModifier as dm
} from "@game-logic/gameplay/data/statistics.data";
import { IDataContainer } from "../interface/data-container.interface";
import { IVisualUiData } from "../../game-ui/entities/visual-medium/visual-medium.interface";
import { IVisualMedium } from "../../game-ui/entities/visual-medium/visual-medium.interface";
import { INarrationMedium } from "../../game-ui/entities/narrative-medium/narrative-medium.interface";



export const defenceStatistic: IDataContainer<typeof ds, INarrationMedium, IVisualMedium<IVisualUiData>> = Object.assign(ds, {
  narrative: { name: "Defence", description: "Some text" },
  visual: {
    ui: { icon: '', avatar: { url: "" } }
  },
  isNarrationMedium: true as const,
  isVisualMedium: true as const,
  isMixin: true as const
});

export const improvableDefenceStatistic: IDataContainer<typeof ids, INarrationMedium, IVisualMedium<IVisualUiData>> = Object.assign(ids, {
  narrative: { name: "Defence", description: "Some text" },
  visual: {
    ui: { icon: '', avatar: { url: "" } }
  },
  isNarrationMedium: true as const,
  isVisualMedium: true as const,
  isMixin: true as const
});

export const healthStatistic: IDataContainer<typeof hs, INarrationMedium, IVisualMedium<IVisualUiData>> = Object.assign(hs, {
  narrative: { name: "Health", description: "Some text" },
  visual: {
    ui: { icon: '', avatar: { url: "" } }
  },
  isNarrationMedium: true as const,
  isVisualMedium: true as const,
  isMixin: true as const
});

export const improvableHealthStatistic: IDataContainer<typeof ihs, INarrationMedium, IVisualMedium<IVisualUiData>> = Object.assign(ihs, {
  narrative: { name: "Health", description: "Some text" },
  visual: {
    ui: { icon: '', avatar: { url: "" } }
  },
  isNarrationMedium: true as const,
  isVisualMedium: true as const,
  isMixin: true as const
});

export const attackPowerStatistic: IDataContainer<typeof aps, INarrationMedium, IVisualMedium<IVisualUiData>> = Object.assign(aps, {
  narrative: { name: "Attack Power", description: "Some text" },
  visual: {
    ui: { icon: '', avatar: { url: "" } }
  },
  isNarrationMedium: true as const,
  isVisualMedium: true as const,
  isMixin: true as const
});

export const improvableAttackPowerStatistic: IDataContainer<typeof iaps, INarrationMedium, IVisualMedium<IVisualUiData>> = Object.assign(iaps, {
  narrative: { name: "Attack Power", description: "Some text" },
  visual: {
    ui: { icon: '', avatar: { url: "" } }
  },
  isNarrationMedium: true as const,
  isVisualMedium: true as const,
  isMixin: true as const
});

export const spellPowerStatistic: IDataContainer<typeof sps, INarrationMedium, IVisualMedium<IVisualUiData>> = Object.assign(sps, {
  narrative: { name: "Spell Power", description: "Some text" },
  visual: {
    ui: { icon: '', avatar: { url: "" } }
  },
  isNarrationMedium: true as const,
  isVisualMedium: true as const,
  isMixin: true as const
});


export const improvableSpellPowerStatistic: IDataContainer<typeof isps, INarrationMedium, IVisualMedium<IVisualUiData>> = Object.assign(isps, {
  narrative: { name: "Spell Power", description: "Some text" },
  visual: {
    ui: { icon: '', avatar: { url: "" } }
  },
  isNarrationMedium: true as const,
  isVisualMedium: true as const,
  isMixin: true as const
});

export const movementStatistic: IDataContainer<typeof ms, INarrationMedium, IVisualMedium<IVisualUiData>> = Object.assign(ms, {
  narrative: { name: "Movment", description: "Some text" },
  visual: {
    ui: { icon: '', avatar: { url: "" } }
  },
  isNarrationMedium: true as const,
  isVisualMedium: true as const,
  isMixin: true as const
});

export const improvableMovementStatistic: IDataContainer<typeof ims, INarrationMedium, IVisualMedium<IVisualUiData>> = Object.assign(ims, {
  narrative: { name: "Movement", description: "Some text" },
  visual: {
    ui: { icon: '', avatar: { url: "" } }
  },
  isNarrationMedium: true as const,
  isVisualMedium: true as const,
  isMixin: true as const
});

export const improvableMajorActionStatistic: IDataContainer<typeof imaas, INarrationMedium, IVisualMedium<IVisualUiData>> = Object.assign(imaas, {
  narrative: { name: "Major action", description: "Some text" },
  visual: {
    ui: { icon: '', avatar: { url: "" } }
  },
  isNarrationMedium: true as const,
  isVisualMedium: true as const,
  isMixin: true as const
});

export const improvableMinorActionStatistic: IDataContainer<typeof imias, INarrationMedium, IVisualMedium<IVisualUiData>> = Object.assign(imias, {
  narrative: { name: "Minor action", description: "Some text" },
  visual: {
    ui: { icon: '', avatar: { url: "" } }
  },
  isNarrationMedium: true as const,
  isVisualMedium: true as const,
  isMixin: true as const
});

export const damageModifier: IDataContainer<typeof dm, INarrationMedium, IVisualMedium<IVisualUiData>> = Object.assign(dm, {
  narrative: { name: "Damage modifier", description: "Some text" },
  visual: {
    ui: { icon: '', avatar: { url: "" } }
  },
  isNarrationMedium: true as const,
  isVisualMedium: true as const,
  isMixin: true as const
});