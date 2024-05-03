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
  narrative: { name: "statistics.F088AF0A-6396-4DA8-8255-837FBE66FFA6.name", description: "statistics.F088AF0A-6396-4DA8-8255-837FBE66FFA6.description" },
  visual: {
    ui: { icon: 'comment', avatar: { url: "" } }
  },
  isNarrationMedium: true as const,
  isVisualMedium: true as const,
  isMixin: true as const
});

export const improvableDefenceStatistic: IDataContainer<typeof ids, INarrationMedium, IVisualMedium<IVisualUiData>> = Object.assign(ids, {
  narrative: { name: "statistics.F088AF0A-6396-4DA8-8255-837FBE66FFA6.name", description: "statistics.F088AF0A-6396-4DA8-8255-837FBE66FFA6.description" },
  visual: {
    ui: { icon: 'comment', avatar: { url: "" } }
  },
  isNarrationMedium: true as const,
  isVisualMedium: true as const,
  isMixin: true as const
});

export const healthStatistic: IDataContainer<typeof hs, INarrationMedium, IVisualMedium<IVisualUiData>> = Object.assign(hs, {
  narrative: { name: "statistics.7A752C72-56F8-4562-9CCA-0E2891665827.name", description: "statistics.7A752C72-56F8-4562-9CCA-0E2891665827.description" },
  visual: {
    ui: { icon: 'comment', avatar: { url: "" } }
  },
  isNarrationMedium: true as const,
  isVisualMedium: true as const,
  isMixin: true as const
});

export const improvableHealthStatistic: IDataContainer<typeof ihs, INarrationMedium, IVisualMedium<IVisualUiData>> = Object.assign(ihs, {
  narrative: { name: "statistics.7A752C72-56F8-4562-9CCA-0E2891665827.name", description: "statistics.7A752C72-56F8-4562-9CCA-0E2891665827.description" },
  visual: {
    ui: { icon: 'comment', avatar: { url: "" } }
  },
  isNarrationMedium: true as const,
  isVisualMedium: true as const,
  isMixin: true as const
});

export const attackPowerStatistic: IDataContainer<typeof aps, INarrationMedium, IVisualMedium<IVisualUiData>> = Object.assign(aps, {
  narrative: { name: "statistics.28CE445D-C5C5-40C5-8D61-A40140CCD83B.name", description: "statistics.28CE445D-C5C5-40C5-8D61-A40140CCD83B.description" },
  visual: {
    ui: { icon: 'comment', avatar: { url: "" } }
  },
  isNarrationMedium: true as const,
  isVisualMedium: true as const,
  isMixin: true as const
});

export const improvableAttackPowerStatistic: IDataContainer<typeof iaps, INarrationMedium, IVisualMedium<IVisualUiData>> = Object.assign(iaps, {
  narrative: { name: "statistics.28CE445D-C5C5-40C5-8D61-A40140CCD83B.name", description: "statistics.28CE445D-C5C5-40C5-8D61-A40140CCD83B.description" },
  visual: {
    ui: { icon: 'comment', avatar: { url: "" } }
  },
  isNarrationMedium: true as const,
  isVisualMedium: true as const,
  isMixin: true as const
});

export const spellPowerStatistic: IDataContainer<typeof sps, INarrationMedium, IVisualMedium<IVisualUiData>> = Object.assign(sps, {
  narrative: { name: "statistics.3083FCEA-BE5B-4C63-966A-FAE22B734FCB.name", description: "statistics.3083FCEA-BE5B-4C63-966A-FAE22B734FCB.description" },
  visual: {
    ui: { icon: 'comment', avatar: { url: "" } }
  },
  isNarrationMedium: true as const,
  isVisualMedium: true as const,
  isMixin: true as const
});


export const improvableSpellPowerStatistic: IDataContainer<typeof isps, INarrationMedium, IVisualMedium<IVisualUiData>> = Object.assign(isps, {
  narrative: { name: "statistics.3083FCEA-BE5B-4C63-966A-FAE22B734FCB.name", description: "statistics.3083FCEA-BE5B-4C63-966A-FAE22B734FCB.description" },
  visual: {
    ui: { icon: 'comment', avatar: { url: "" } }
  },
  isNarrationMedium: true as const,
  isVisualMedium: true as const,
  isMixin: true as const
});

export const movementStatistic: IDataContainer<typeof ms, INarrationMedium, IVisualMedium<IVisualUiData>> = Object.assign(ms, {
  narrative: { name: "statistics.F22785C8-010B-4BE1-B5EB-A890E5D6DF5E.name", description: "statistics.F22785C8-010B-4BE1-B5EB-A890E5D6DF5E.description" },
  visual: {
    ui: { icon: 'comment', avatar: { url: "" } }
  },
  isNarrationMedium: true as const,
  isVisualMedium: true as const,
  isMixin: true as const
});

export const improvableMovementStatistic: IDataContainer<typeof ims, INarrationMedium, IVisualMedium<IVisualUiData>> = Object.assign(ims, {
  narrative: { name: "statistics.F22785C8-010B-4BE1-B5EB-A890E5D6DF5E.name", description: "statistics.F22785C8-010B-4BE1-B5EB-A890E5D6DF5E.description" },
  visual: {
    ui: { icon: 'comment', avatar: { url: "" } }
  },
  isNarrationMedium: true as const,
  isVisualMedium: true as const,
  isMixin: true as const
});

export const improvableMajorActionStatistic: IDataContainer<typeof imaas, INarrationMedium, IVisualMedium<IVisualUiData>> = Object.assign(imaas, {
  narrative: { name: "statistics.302E8326-AC28-4C08-8014-95EB0870265B.name", description: "statistics.302E8326-AC28-4C08-8014-95EB0870265B.description" },
  visual: {
    ui: { icon: 'comment', avatar: { url: "" } }
  },
  isNarrationMedium: true as const,
  isVisualMedium: true as const,
  isMixin: true as const
});

export const improvableMinorActionStatistic: IDataContainer<typeof imias, INarrationMedium, IVisualMedium<IVisualUiData>> = Object.assign(imias, {
  narrative: { name: "statistics.AE2D0BB0-1454-453D-B9C9-535A3C2719F3.name", description: "statistics.AE2D0BB0-1454-453D-B9C9-535A3C2719F3.description" },
  visual: {
    ui: { icon: 'comment', avatar: { url: "" } }
  },
  isNarrationMedium: true as const,
  isVisualMedium: true as const,
  isMixin: true as const
});

export const damageModifier: IDataContainer<typeof dm, INarrationMedium, IVisualMedium<IVisualUiData>> = Object.assign(dm, {
  narrative: { name: "statistics.8314B0C1-FA28-49E6-A7BC-BF364FF31AE7.name", description: "statistics.8314B0C1-FA28-49E6-A7BC-BF364FF31AE7.description" },
  visual: {
    ui: { icon: 'comment', avatar: { url: "" } }
  },
  isNarrationMedium: true as const,
  isVisualMedium: true as const,
  isMixin: true as const
});