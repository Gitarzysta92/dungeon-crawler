import { treasureChestDefinitionName } from "./treasure-chest.constants";
import { ITokenComposerDefinition, ITokenCreationDefinition, ITokenDefinition } from "../common/token.interface";

export interface ITreasureChestComposerDefinition
  extends ITreasureChestCreationDefinition,
  ITokenComposerDefinition<typeof treasureChestDefinitionName> {
    initialAnimationDelay?: number;
}

export interface ITreasureChestCreationDefinition extends
  ITokenCreationDefinition<typeof treasureChestDefinitionName>,
  ITreasureChestDefinition { }


export interface ITreasureChestDefinition extends ITokenDefinition<typeof treasureChestDefinitionName> { 
  primaryColor: number;
  secondaryColor: number;
  tertiaryColor: number;
  lightColor: number;
}
