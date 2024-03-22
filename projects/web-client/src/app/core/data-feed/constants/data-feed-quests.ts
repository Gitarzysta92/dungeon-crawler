import {
  exterminateRatsQuest as erq,
  reportRatsExterminationQuest as rreq,
  gatherItemQuest as giq
} from "@game-logic/gameplay/data/quests.data";
import { IAuxiliaryContainer, INarrationData } from "../../commons/interfaces/auxiliary-container.interface";


export const exterminateRatsQuest: IAuxiliaryContainer<typeof erq, INarrationData> = Object.assign(erq, {
  narration: { name: "string", description: "string" }
});

export const reportRatsExterminationQuest: IAuxiliaryContainer<typeof erq, INarrationData> = Object.assign(rreq, {
  informative: { name: "string", description: "string" }
});

export const slayEnemiesItemQuest: IAuxiliaryContainer<typeof erq, INarrationData> = Object.assign(giq, {
  informative: { name: "string", description: "string" }
});