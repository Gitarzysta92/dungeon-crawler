import { heroTemplate as ht } from "@game-logic/gameplay/data/hero-template.data";
import { INarrationMedium } from "../../game-ui/entities/narrative-medium/narrative-medium.interface";
import { IVisualMedium, IVisualUiData } from "../../game-ui/entities/visual-medium/visual-medium.interface";
import { IDataContainer } from "../interface/data-container.interface";

export const heroTemplate: IDataContainer<typeof ht, INarrationMedium, IVisualMedium<IVisualUiData>> = Object.assign(ht, {
  narrative: {
    name: "hero-races.816120F8-924D-4ECF-9166-833F284CB762.name",
    description: "hero-races.816120F8-924D-4ECF-9166-833F284CB762.description"
  },
  visual: {
    ui: { icon: '', avatar: { url: "816120F8-924D-4ECF-9166-833F284CB762-avatar.png" } }
  },
  isNarrationMedium: true,
  isVisualMedium: true
});