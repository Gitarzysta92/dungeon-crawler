import { IDataContainer } from "../interface/data-container.interface";
import { IUiMedium } from "../../game-ui/mixins/ui-medium/ui-medium.interface";
import { INarrativeMedium } from "../../game-ui/mixins/narrative-medium/narrative-medium.interface";
import { IStatisticDeclaration } from "@game-logic/lib/modules/statistics/entities/statistic/statistic.interface";
import { Tags } from "./tags.data";
import { AssetType } from "../../game-ui/constants/asset-type";
import { IActivityResource } from "@game-logic/lib/base/activity/activity.interface";

import { CombatStatisticType } from "@game-logic/lib/modules/combat/combat.constants";
import { ICombatStatisticDeclaration } from "@game-logic/lib/modules/combat/entities/combat-statistic/combat-statistic.interface";


export const defenceStatistic: IDataContainer<IStatisticDeclaration & ICombatStatisticDeclaration, INarrativeMedium, IUiMedium> = {
  id: "F088AF0A-6396-4DA8-8255-837FBE66FFA6",
  combatStatisticType: CombatStatisticType.Defence,
  baseValue: 0,
  minBaseValue: 0,
  isStatistic: true,
  isEntity: true,
  isMixin: true,
  isModificable: true,
  narrative: { name: "statistics.F088AF0A-6396-4DA8-8255-837FBE66FFA6.name", description: "statistics.F088AF0A-6396-4DA8-8255-837FBE66FFA6.description" },
  uiData: { icon: 'shield', avatar: { type: AssetType.Avatar,  fileName: "", ext: "" } },
  isNarrationMedium: true,
  isUiMedium: true,
};


export const healthStatistic: IDataContainer<IStatisticDeclaration & ICombatStatisticDeclaration, INarrativeMedium, IUiMedium> = {
  id: "7A752C72-56F8-4562-9CCA-0E2891665827",
  combatStatisticType: CombatStatisticType.Health,
  maxBaseValue: 10,
  baseValue: 10,
  isStatistic: true,
  isEntity: true,
  isModificable: true,
  narrative: { name: "statistics.7A752C72-56F8-4562-9CCA-0E2891665827.name", description: "statistics.7A752C72-56F8-4562-9CCA-0E2891665827.description" },
  uiData: { icon: 'heart', avatar: { type: AssetType.Avatar,  fileName: "", ext: "" } },
  isNarrationMedium: true as const,
  isUiMedium: true as const,
  isMixin: true as const
};


export const attackPowerStatistic: IDataContainer<IStatisticDeclaration & ICombatStatisticDeclaration, INarrativeMedium, IUiMedium> = {
  id: "28CE445D-C5C5-40C5-8D61-A40140CCD83B",
  combatStatisticType: CombatStatisticType.AttackPower,
  baseValue: 10,
  isStatistic: true,
  isMixin: true,
  isEntity: true,
  isModificable: true,
  narrative: { name: "statistics.28CE445D-C5C5-40C5-8D61-A40140CCD83B.name", description: "statistics.28CE445D-C5C5-40C5-8D61-A40140CCD83B.description" },
  uiData: { icon: 'sword', avatar: { type: AssetType.Avatar,  fileName: "", ext: "" } },
  isNarrationMedium: true as const,
  isUiMedium: true as const,
};

 

export const movementStatistic: IDataContainer<IStatisticDeclaration, INarrativeMedium, IUiMedium> = {
  id: "F22785C8-010B-4BE1-B5EB-A890E5D6DF5E",
  baseValue: 0,
  isStatistic: true,
  isEntity: true,
  isModificable: true,
  narrative: { name: "statistics.F22785C8-010B-4BE1-B5EB-A890E5D6DF5E.name", description: "statistics.F22785C8-010B-4BE1-B5EB-A890E5D6DF5E.description" },
  uiData: { icon: 'feet', avatar: { type: AssetType.Avatar,  fileName: "", ext: "" } },
  isNarrationMedium: true as const,
  isUiMedium: true as const,
  isMixin: true as const
};



export const majorActionStatistic: IDataContainer<IStatisticDeclaration & IActivityResource, INarrativeMedium, IUiMedium> = {
  id: "302E8326-AC28-4C08-8014-95EB0870265B",
  maxBaseValue: 2,
  baseValue: 2,
  isStatistic: true,
  isActivitySubject: true as const,
  isActivityResource: true as const,
  isEntity: true,
  isModificable: true,
  tags: [Tags.SecondaryStatistic],
  narrative: { name: "statistics.302E8326-AC28-4C08-8014-95EB0870265B.name", description: "statistics.302E8326-AC28-4C08-8014-95EB0870265B.description" },
  uiData: { icon: 'comment', avatar: { type: AssetType.Avatar,  fileName: "", ext: "" } },
  isNarrationMedium: true as const,
  isUiMedium: true as const,
  isMixin: true as const
};

export const minorActionStatistic: IDataContainer<IStatisticDeclaration & IActivityResource, INarrativeMedium, IUiMedium> = {
  id: "AE2D0BB0-1454-453D-B9C9-535A3C2719F3",
  maxBaseValue: 2,
  baseValue: 2,
  isStatistic: true,
  isActivitySubject: true as const,
  isActivityResource: true as const,
  isEntity: true,
  isMixin: true,
  isModificable: true,
  tags: [Tags.SecondaryStatistic],
  narrative: { name: "statistics.AE2D0BB0-1454-453D-B9C9-535A3C2719F3.name", description: "statistics.AE2D0BB0-1454-453D-B9C9-535A3C2719F3.description" },
  uiData: { icon: 'comment', avatar: { type: AssetType.Avatar,  fileName: "", ext: "" } },
  isNarrationMedium: true as const,
  isUiMedium: true as const,
};

export const moveActionStatistic: IDataContainer<IStatisticDeclaration & IActivityResource, INarrativeMedium, IUiMedium> = {
  id: "8314B0C1-FA28-49E6-A7BC-BF364FF31AE7",
  maxBaseValue: 1,
  baseValue: 1,
  isStatistic: true,
  isActivitySubject: true as const,
  isActivityResource: true as const,
  isEntity: true,
  isMixin: true,
  isModificable: true,
  tags: [Tags.SecondaryStatistic],
  narrative: { name: "statistics.8314B0C1-FA28-49E6-A7BC-BF364FF31AE7.name", description: "statistics.8314B0C1-FA28-49E6-A7BC-BF364FF31AE7.description" },
  uiData: { icon: 'comment', avatar: { type: AssetType.Avatar,  fileName: "", ext: "" } },
  isNarrationMedium: true as const,
  isUiMedium: true as const,
};
