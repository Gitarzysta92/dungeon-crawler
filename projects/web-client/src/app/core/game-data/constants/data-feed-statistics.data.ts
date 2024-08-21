
import { IDataContainer } from "../interface/data-container.interface";
import { IUiMedium } from "../../game-ui/mixins/ui-medium/ui-medium.interface";
import { INarrativeMedium } from "../../game-ui/mixins/narrative-medium/narrative-medium.interface";
import { IStatisticDeclaration } from "@game-logic/lib/modules/statistics/entities/statistic/statistic.interface";
import { StatisticType } from "@game-logic/lib/modules/statistics/statistics.constants";
import { Tags } from "./tags.data";
import { AssetType } from "../../game-ui/constants/asset-type";



export const defenceStatistic: IDataContainer<IStatisticDeclaration, INarrativeMedium, IUiMedium> = {
  id: "F088AF0A-6396-4DA8-8255-837FBE66FFA6",
  type: StatisticType.Static,
  value: 0,
  isStatistic: true,
  isEntity: true,
  isMixin: true,
  narrative: { name: "statistics.F088AF0A-6396-4DA8-8255-837FBE66FFA6.name", description: "statistics.F088AF0A-6396-4DA8-8255-837FBE66FFA6.description" },
  uiData: { icon: 'shield', avatar: { type: AssetType.Avatar,  fileName: "", ext: "" } },
  isNarrationMedium: true,
  isUiMedium: true,
};


export const healthStatistic: IDataContainer<IStatisticDeclaration, INarrativeMedium, IUiMedium> = {
  id: "7A752C72-56F8-4562-9CCA-0E2891665827",
  type: StatisticType.Dynamic,
  baseValue: 10,
  isStatistic: true,
  isEntity: true,
  narrative: { name: "statistics.7A752C72-56F8-4562-9CCA-0E2891665827.name", description: "statistics.7A752C72-56F8-4562-9CCA-0E2891665827.description" },
  uiData: { icon: 'heart', avatar: { type: AssetType.Avatar,  fileName: "", ext: "" } },
  isNarrationMedium: true as const,
  isUiMedium: true as const,
  isMixin: true as const
};


export const attackPowerStatistic: IDataContainer<IStatisticDeclaration, INarrativeMedium, IUiMedium> = {
  id: "28CE445D-C5C5-40C5-8D61-A40140CCD83B",
  type: StatisticType.Static,
  value: 10,
  isStatistic: true,
  modifiers: [],
  isMixin: true,
  isEntity: true,
  narrative: { name: "statistics.28CE445D-C5C5-40C5-8D61-A40140CCD83B.name", description: "statistics.28CE445D-C5C5-40C5-8D61-A40140CCD83B.description" },
  uiData: { icon: 'sword', avatar: { type: AssetType.Avatar,  fileName: "", ext: "" } },
  isNarrationMedium: true as const,
  isUiMedium: true as const,
};




export const spellPowerStatistic: IDataContainer<IStatisticDeclaration, INarrativeMedium, IUiMedium> = {
  id: "3083FCEA-BE5B-4C63-966A-FAE22B734FCB",
  type: StatisticType.Static,
  value: 0,
  isStatistic: true,
  modifiers: [],
  isEntity: true,
  isMixin: true,
  narrative: { name: "statistics.3083FCEA-BE5B-4C63-966A-FAE22B734FCB.name", description: "statistics.3083FCEA-BE5B-4C63-966A-FAE22B734FCB.description" },
  uiData: { icon: 'wand', avatar: { type: AssetType.Avatar,  fileName: "", ext: "" } },
  isNarrationMedium: true as const,
  isUiMedium: true as const,
};



export const movementStatistic: IDataContainer<IStatisticDeclaration, INarrativeMedium, IUiMedium> = {
  id: "F22785C8-010B-4BE1-B5EB-A890E5D6DF5E",
  type: StatisticType.Static,
  value: 0,
  isStatistic: true,
  modifiers: [],
  isEntity: true,
  narrative: { name: "statistics.F22785C8-010B-4BE1-B5EB-A890E5D6DF5E.name", description: "statistics.F22785C8-010B-4BE1-B5EB-A890E5D6DF5E.description" },
  uiData: { icon: 'feet', avatar: { type: AssetType.Avatar,  fileName: "", ext: "" } },
  isNarrationMedium: true as const,
  isUiMedium: true as const,
  isMixin: true as const
};



export const majorActionStatistic: IDataContainer<IStatisticDeclaration, INarrativeMedium, IUiMedium> = {
  id: "302E8326-AC28-4C08-8014-95EB0870265B",
  type: StatisticType.Dynamic,
  baseValue: 2,
  regainValue: 2,
  isStatistic: true,
  modifiers: [],
  isActivitySubject: true as const,
  isEntity: true,
  tags: [Tags.SecondaryStatistic],
  narrative: { name: "statistics.302E8326-AC28-4C08-8014-95EB0870265B.name", description: "statistics.302E8326-AC28-4C08-8014-95EB0870265B.description" },
  uiData: { icon: 'comment', avatar: { type: AssetType.Avatar,  fileName: "", ext: "" } },
  isNarrationMedium: true as const,
  isUiMedium: true as const,
  isMixin: true as const
};

export const minorActionStatistic: IDataContainer<IStatisticDeclaration, INarrativeMedium, IUiMedium> = {
  id: "AE2D0BB0-1454-453D-B9C9-535A3C2719F3",
  type: StatisticType.Dynamic,
  baseValue: 2,
  regainValue: 2,
  isStatistic: true,
  modifiers: [],
  isActivitySubject: true as const,
  isEntity: true,
  isMixin: true,
  tags: [Tags.SecondaryStatistic],
  narrative: { name: "statistics.AE2D0BB0-1454-453D-B9C9-535A3C2719F3.name", description: "statistics.AE2D0BB0-1454-453D-B9C9-535A3C2719F3.description" },
  uiData: { icon: 'comment', avatar: { type: AssetType.Avatar,  fileName: "", ext: "" } },
  isNarrationMedium: true as const,
  isUiMedium: true as const,
};

export const moveActionStatistic: IDataContainer<IStatisticDeclaration, INarrativeMedium, IUiMedium> = {
  id: "8314B0C1-FA28-49E6-A7BC-BF364FF31AE7",
  type: StatisticType.Dynamic,
  baseValue: 1,
  regainValue: 1,
  isStatistic: true,
  modifiers: [],
  isActivitySubject: true as const,
  isEntity: true,
  isMixin: true,
  tags: [Tags.SecondaryStatistic],
  narrative: { name: "statistics.8314B0C1-FA28-49E6-A7BC-BF364FF31AE7.name", description: "statistics.8314B0C1-FA28-49E6-A7BC-BF364FF31AE7.description" },
  uiData: { icon: 'comment', avatar: { type: AssetType.Avatar,  fileName: "", ext: "" } },
  isNarrationMedium: true as const,
  isUiMedium: true as const,
};
