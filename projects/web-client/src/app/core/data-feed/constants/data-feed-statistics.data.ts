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
import { IAuxiliaryContainer, INarrationData, IVisualData, IVisualUiData } from "../../commons/interfaces/auxiliary-container.interface";



export const defenceStatistic: IAuxiliaryContainer<typeof ds, INarrationData, IVisualData<IVisualUiData>> = Object.assign(ds, {
  narrative: { name: "Defence", description: "Some text" },
  visual: {
    ui: { icon: '', avatar: { url: "" } }
  }
});

export const improvableDefenceStatistic: IAuxiliaryContainer<typeof ids, INarrationData, IVisualData<IVisualUiData>> = Object.assign(ids, {
  narrative: { name: "Defence", description: "Some text" },
  visual: {
    ui: { icon: '', avatar: { url: "" } }
  }
});

export const healthStatistic: IAuxiliaryContainer<typeof hs, INarrationData, IVisualData<IVisualUiData>> = Object.assign(hs, {
  narrative: { name: "Health", description: "Some text" },
  visual: {
    ui: { icon: '', avatar: { url: "" } }
  }
});

export const improvableHealthStatistic: IAuxiliaryContainer<typeof ihs, INarrationData, IVisualData<IVisualUiData>> = Object.assign(ihs, {
  narrative: { name: "Health", description: "Some text" },
  visual: {
    ui: { icon: '', avatar: { url: "" } }
  }
});

export const attackPowerStatistic: IAuxiliaryContainer<typeof aps, INarrationData, IVisualData<IVisualUiData>> = Object.assign(aps, {
  narrative: { name: "Attack Power", description: "Some text" },
  visual: {
    ui: { icon: '', avatar: { url: "" } }
  }
});

export const improvableAttackPowerStatistic: IAuxiliaryContainer<typeof iaps, INarrationData, IVisualData<IVisualUiData>> = Object.assign(iaps, {
  narrative: { name: "Attack Power", description: "Some text" },
  visual: {
    ui: { icon: '', avatar: { url: "" } }
  }
});

export const spellPowerStatistic: IAuxiliaryContainer<typeof sps, INarrationData, IVisualData<IVisualUiData>> = Object.assign(sps, {
  narrative: { name: "Spell Power", description: "Some text" },
  visual: {
    ui: { icon: '', avatar: { url: "" } }
  }
});


export const improvableSpellPowerStatistic: IAuxiliaryContainer<typeof isps, INarrationData, IVisualData<IVisualUiData>> = Object.assign(isps, {
  narrative: { name: "Spell Power", description: "Some text" },
  visual: {
    ui: { icon: '', avatar: { url: "" } }
  }
});

export const movementStatistic: IAuxiliaryContainer<typeof ms, INarrationData, IVisualData<IVisualUiData>> = Object.assign(ms, {
  narrative: { name: "Movment", description: "Some text" },
  visual: {
    ui: { icon: '', avatar: { url: "" } }
  }
});

export const improvableMovementStatistic: IAuxiliaryContainer<typeof ims, INarrationData, IVisualData<IVisualUiData>> = Object.assign(ims, {
  narrative: { name: "Movement", description: "Some text" },
  visual: {
    ui: { icon: '', avatar: { url: "" } }
  }
});

export const improvableMajorActionStatistic: IAuxiliaryContainer<typeof imaas, INarrationData, IVisualData<IVisualUiData>> = Object.assign(imaas, {
  narrative: { name: "Major action", description: "Some text" },
  visual: {
    ui: { icon: '', avatar: { url: "" } }
  }
});

export const improvableMinorActionStatistic: IAuxiliaryContainer<typeof imias, INarrationData, IVisualData<IVisualUiData>> = Object.assign(imias, {
  narrative: { name: "Minor action", description: "Some text" },
  visual: {
    ui: { icon: '', avatar: { url: "" } }
  }
});

export const damageModifier: IAuxiliaryContainer<typeof dm, INarrationData, IVisualData<IVisualUiData>> = Object.assign(dm, {
  narrative: { name: "Damage modifier", description: "Some text" },
  visual: {
    ui: { icon: '', avatar: { url: "" } }
  }
});