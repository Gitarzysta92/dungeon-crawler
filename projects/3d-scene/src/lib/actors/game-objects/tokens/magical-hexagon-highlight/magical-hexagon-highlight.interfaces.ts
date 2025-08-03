import { ITokenComposerDefinition, ITokenCreationDefinition, ITokenDefinition } from "../common/token.interface";
import { magicalHexagonHighlightDefinitionName } from "./magical-hexagon-highlight.constants";

export interface IMagicalHexagonHighlightComposerDefinition
  extends IMagicalHexagonHighlightCreationDefinition,
  ITokenComposerDefinition<typeof magicalHexagonHighlightDefinitionName> {
    initialAnimationDelay?: number;
}

export interface IMagicalHexagonHighlightCreationDefinition extends
  ITokenCreationDefinition<typeof magicalHexagonHighlightDefinitionName>,
  IMagicalHexagonHighlightDefinition { }

export interface IMagicalHexagonHighlightDefinition extends ITokenDefinition<typeof magicalHexagonHighlightDefinitionName> { 
  primaryColor: number;
  secondaryColor: number;
  intensity: number;
  pulseSpeed: number;
  fadeHeight: number;
} 