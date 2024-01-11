import { magicGateComposerDefinitionName } from "./magic-gate.constants";
import { ITokenComposerDefinition, ITokenCreationDefinition, ITokenDefinition } from "../common/token.interface";

export interface IMagicGateComposerDefinition extends
  IMagicGateCreationDefinition,
  ITokenComposerDefinition<typeof magicGateComposerDefinitionName> {
  initialAnimationDelay?: number;
  }


export interface IMagicGateCreationDefinition extends
  ITokenCreationDefinition<typeof magicGateComposerDefinitionName>,
  IMagicGateDefinition {}


export interface IMagicGateDefinition extends ITokenDefinition<typeof magicGateComposerDefinitionName> {
  primaryColor: number;
  primaryTeleportColor: number;
  secondaryTeleportColor: number;
  lightColor: number;
}
