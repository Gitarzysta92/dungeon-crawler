import { IDungeonGameplayDeclaration as IDg } from "@game-logic/gameplay/modules/dungeon/dungeon.interface";
import { ISceneComposerDefinition } from "@3d-scene/lib/helpers/scene-composer/scene-composer.interface";

export type IDungeonGameplayDeclaration = IDg & { scene: { composerDeclarations: ISceneComposerDefinition<unknown>[]; } };