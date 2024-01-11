import { campFireDefinitionName } from "./camp-fire.constants";
import { ITokenComposerDefinition, ITokenCreationDefinition, ITokenDefinition } from "../common/token.interface";

export interface ICampFireComposerDefinition
  extends ICampFireCreationDefinition,
  ITokenComposerDefinition<typeof campFireDefinitionName> { 
    initialAnimationDelay?: number;
  }

  
export interface ICampFireCreationDefinition
  extends ITokenCreationDefinition<typeof campFireDefinitionName>, ICampFireDefinition { }


export interface ICampFireDefinition
  extends ITokenDefinition<typeof campFireDefinitionName> {
  woodColor: number;
  flameColor: [number, number, number];
  flameBloomColor: number;
  primaryLightColor: number;
  secondaryLightColor: number;
}
