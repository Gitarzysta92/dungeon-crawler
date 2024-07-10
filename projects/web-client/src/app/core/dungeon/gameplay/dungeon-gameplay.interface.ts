import { IDungeonGameplayDeclaration as IDg } from "@game-logic/gameplay/modules/dungeon/dungeon.interface";
import { IUiMedium } from "../../game-ui/mixins/ui-medium/ui-medium.interface";
import { ISceneMedium } from "../../scene/mixins/scene-medium/scene-medium.interface";
import { IEntity } from "@game-logic/lib/base/entity/entity.interface";
import { ISceneComposerDefinition } from "@3d-scene/lib/helpers/scene-composer/scene-composer.interface";

export type IDungeonGameplayDeclaration = IDg & { scene: { composerDeclarations: ISceneComposerDefinition<unknown>[]; } };

export type IGameplayEntity = IEntity & Partial<IUiMedium> & Partial<ISceneMedium>