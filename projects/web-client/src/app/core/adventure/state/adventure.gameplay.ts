import { AdventureGameplayLogicState } from "@game-logic/gameplay/state/adventure/adventure-gameplay";
import { IAdventureGameplay } from "../interfaces/adventure-gameplay.interface";
import { IVisualMedium, IVisualUiData } from "../../game-ui/entities/visual-medium/visual-medium.interface";

export class AdventureGameplay extends AdventureGameplayLogicState implements IAdventureGameplay {
  isAdventureState: true;
  heroOccupiedAreaName: string;
  heroAvatar: IVisualMedium<IVisualUiData, null>;
  heroLevel: number;
  heroName: string;
  gameVersion: string;
  activityConfirmationRequired: boolean;
  activityIdToConfirmation: string;
  activityConfirmed: boolean;
  activitySelectionRequired: boolean;
  confirmationPossible: boolean;
  activityIdToEarlyConfirm: string;
  activityEarlyConfirmationPossible: boolean;
  activityEarlyConfirmed: boolean;
  selectedHeroId: string;
  selectedActivityId: string;
  
}