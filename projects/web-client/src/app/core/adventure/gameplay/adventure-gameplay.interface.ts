import { IAdventureGameplayDeclaration as IAg } from "@game-logic/gameplay/modules/adventure/adventure.interface";
import { ISceneComposerDefinition } from "@3d-scene/lib/helpers/scene-composer/scene-composer.interface";

export type IAdventureGameplayDeclaration = IAg & { scene: { composerDeclarations: ISceneComposerDefinition<unknown>[]; } };