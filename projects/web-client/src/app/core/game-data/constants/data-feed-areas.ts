import {
  firstArea as fa,
  secondArea as sa,
  firstAreaTavern as fat,
  firstAreaDungeon as fad
} from "@game-logic/gameplay/data/areas.data";
import { IDataContainer } from "../interface/data-container.interface";
import { IVisualUiData } from "../../game-ui/entities/visual-medium/visual-medium.interface";
import { IVisualMedium } from "../../game-ui/entities/visual-medium/visual-medium.interface";
import { INarrationMedium } from "../../game-ui/entities/narrative-medium/narrative-medium.interface";
import { dungeonTemplate } from "@game-logic/gameplay/data/dungeon.data";


export const firstAreaTavern: IDataContainer<typeof fat, INarrationMedium, IVisualMedium<IVisualUiData>> = Object.assign(fat, {
  narrative: { name: "First area tavern", description: "string" },
  visual: {
    ui: { icon: '', avatar: { url: "" } }
  },
  isNarrationMedium: true as const,
  isMixin: true as const,
  isVisualMedium: true as const
});

export const firstAreaDungeon: IDataContainer<typeof fad, INarrationMedium, IVisualMedium<IVisualUiData>> = Object.assign(fad, {
  narrative: { name: "First area dungeon", description: "string" },
  visual: {
    ui: { icon: '', avatar: { url: "" } }
  },
  isNarrationMedium: true as const,
  isMixin: true as const,
  isVisualMedium: true as const
});

export const firstArea: IDataContainer<typeof fa, INarrationMedium, IVisualMedium<IVisualUiData>> = Object.assign(fa, {
  narrative: { name: "First area", description: "string" },
  nestedAreas: [
    firstAreaTavern,
    Object.assign(firstAreaDungeon, dungeonTemplate)
  ],
  visual: {
    ui: { icon: '', avatar: { url: "" } }
  },
  isNarrationMedium: true as const,
  isMixin: true as const,
  isVisualMedium: true as const
});

export const secondArea: IDataContainer<typeof sa, INarrationMedium, IVisualMedium<IVisualUiData>> = Object.assign(sa, {
  narrative: { name: "Second area", description: "string" },
  visual: {
    ui: { icon: '', avatar: { url: "" } }
  },
  isNarrationMedium: true as const,
  isMixin: true as const,
  isVisualMedium: true as const
});