import { heroTemplate as ht } from "@game-logic/gameplay/data/hero-template.data";
import { INarrationMedium } from "../../game-ui/mixins/narrative-medium/narrative-medium.interface";
import { IUiMedium, IUiData } from "../../game-ui/mixins/visual-medium/ui-medium.interface";
import { IDataContainer } from "../interface/data-container.interface";

export const heroTemplate: IDataContainer<typeof ht, INarrationMedium, IUiMedium> = Object.assign(ht, {
  narrative: {
    name: "hero-races.816120F8-924D-4ECF-9166-833F284CB762.name",
    description: "hero-races.816120F8-924D-4ECF-9166-833F284CB762.description"
  },
  uiData: { icon: '', avatar: { url: "816120F8-924D-4ECF-9166-833F284CB762-avatar.png" } },
  isNarrationMedium: true,
  isUiMedium: true
});