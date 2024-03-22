import {
  firstArea as fa,
  secondArea as sa,
  firstAreaTavern as fat,
  firstAreaDungeon as fad
} from "@game-logic/gameplay/data/areas.data";
import { IAuxiliaryContainer, INarrationData, IVisualData, IVisualUiData } from "../../commons/interfaces/auxiliary-container.interface";
import { dungeonTemplate } from "@game-logic/gameplay/data/dungeon.data";


export const firstAreaTavern: IAuxiliaryContainer<typeof fat, INarrationData, IVisualData<IVisualUiData>> = Object.assign(fat, {
  narrative: { name: "First area tavern", description: "string" },
});

export const firstAreaDungeon: IAuxiliaryContainer<typeof fad, INarrationData, IVisualData<IVisualUiData>> = Object.assign(fad, {
  narrative: { name: "First area dungeon", description: "string" },
});

export const firstArea: IAuxiliaryContainer<typeof fa, INarrationData, IVisualData<IVisualUiData>> = Object.assign(fa, {
  narrative: { name: "First area", description: "string" },
  nestedAreas: [
    firstAreaTavern,
    Object.assign(firstAreaDungeon, dungeonTemplate)
  ],
});

export const secondArea: IAuxiliaryContainer<typeof sa, INarrationData, IVisualData<IVisualUiData>> = Object.assign(sa, {
  narrative: { name: "Second area", description: "string" },
});