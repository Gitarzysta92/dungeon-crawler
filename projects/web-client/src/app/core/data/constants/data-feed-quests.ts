import {
  exterminateRatsQuest as erq,
  reportRatsExterminationQuest as rreq,
  gatherItemQuest as giq
} from "@game-logic/gameplay/data/quests.data";
import { IDataContainer } from "../interface/data-container.interface";
import { INarrationMedium } from "../../game-ui/entities/narrative-medium/narrative-medium.interface";


export const exterminateRatsQuest: IDataContainer<typeof erq, INarrationMedium> = Object.assign(erq, {
  narrative: { name: "string", description: "string" },
  isNarrationMedium: true as const,
});

export const reportRatsExterminationQuest: IDataContainer<typeof erq, INarrationMedium> = Object.assign(rreq, {
  narrative: { name: "string", description: "string" },
  isNarrationMedium: true as const,
});

export const slayEnemiesItemQuest: IDataContainer<typeof erq, INarrationMedium> = Object.assign(giq, {
  narrative: { name: "string", description: "string" },
  isNarrationMedium: true as const,
});