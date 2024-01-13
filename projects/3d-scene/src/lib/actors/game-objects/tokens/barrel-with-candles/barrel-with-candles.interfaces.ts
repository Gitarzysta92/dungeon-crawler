import { ITokenComposerDefinition, ITokenCreationDefinition, ITokenDefinition } from "../common/token.interface";
import { barrelWithCandlesDefinitionName } from "./barrel-with-candles.constants";

export interface IBarrelWithCandlesComposerDefinition
  extends IBarrelWithCandlesCreationDefinition,
  ITokenComposerDefinition<typeof barrelWithCandlesDefinitionName> {
    initialAnimationDelay?: number;
}

export interface IBarrelWithCandlesCreationDefinition extends
  ITokenCreationDefinition<typeof barrelWithCandlesDefinitionName>,
  IBarrelWithCandlesDefinition { }


export interface IBarrelWithCandlesDefinition extends ITokenDefinition<typeof barrelWithCandlesDefinitionName> { 
  primaryColor: number;
  secondaryColor: number;
  lightColor: number;
}