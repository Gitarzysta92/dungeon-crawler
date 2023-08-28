import { ISceneComposerSetup } from "@3d-scene/scene/interfaces/scene-composer-setup";

export type ISceneEnvironmentDeclaration = Omit<ISceneComposerSetup, 'board'>;