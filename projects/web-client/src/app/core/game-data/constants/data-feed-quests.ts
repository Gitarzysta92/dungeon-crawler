import {
  exterminateRatsQuest as erq,
  reportRatsExterminationQuest as rreq,
  gatherItemQuest as giq
} from "@game-logic/gameplay/data/quests.data";
import { IDataContainer } from "../interface/data-container.interface";
import { INarrativeMedium } from "../../game-ui/mixins/narrative-medium/narrative-medium.interface";


export const exterminateRatsQuest: IDataContainer<typeof erq, INarrativeMedium> = Object.assign(erq, {
  narrative: { name: "string", description: "string" },
  isNarrationMedium: true as const,
});

export const reportRatsExterminationQuest: IDataContainer<typeof erq, INarrativeMedium> = Object.assign(rreq, {
  narrative: { name: "string", description: "string" },
  isNarrationMedium: true as const,
});

export const slayEnemiesItemQuest: IDataContainer<typeof erq, INarrativeMedium> = Object.assign(giq, {
  narrative: { name: "string", description: "string" },
  isNarrationMedium: true as const,
});