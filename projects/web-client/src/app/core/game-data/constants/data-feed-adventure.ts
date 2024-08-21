import { adventureTrasureActor, vendorActor } from "./data-feed-actors";
import { area1, area10, area11, area12, area2, area3, area4, area5, area6, area7, area8, area9 } from "./data-feed-areas";
import { INarrativeMedium } from "../../game-ui/mixins/narrative-medium/narrative-medium.interface";
import { IDataContainer } from "../interface/data-container.interface";
import { directionalLightComposerDefinitionName } from "@3d-scene/lib/actors/light-objects/directional-light/directional-light.constants";
import { hemisphereLightComposerDefinitionName } from "@3d-scene/lib/actors/light-objects/hemisphere-light/hemisphere-light.constants";
import { boardComposerDefinitionName } from "@3d-scene/lib/components/board/board.constants";
import { Vector3 } from "three";
import { ISceneMediumDeclaration } from "../../scene/mixins/scene-medium/scene-medium.interface";
import { sceneComposerDefinitionName } from "@3d-scene/lib/components/scene/scene.constants";
import { IAdventureGameplayDeclaration } from "@game-logic/gameplay/modules/adventure/adventure.interface";



export const adventureTemplate: IDataContainer<IAdventureGameplayDeclaration, INarrativeMedium, ISceneMediumDeclaration<any>> = {
  id: "ADAEFB05-8C30-44A5-A14E-099F7E9F609D",
  currentDay: 0,
  entities: [
    area1,
    area2,
    area3,
    area4,
    area5,
    area6,
    area7,
    area8,
    area9,
    area10,
    area11,
    area12,
    vendorActor,
    adventureTrasureActor
  ],
  narrative: { name: "string", description: "string" },
  isNarrationMedium: true as const,
  isSceneMedium: true as const,
  isMixin: true as const,
  isAdventureGameplay: true,
  scene: {
    composerDeclarations: [
      {
        definitionName: sceneComposerDefinitionName,
        bgColor: 0x2d1048,
      },
      {
        definitionName: boardComposerDefinitionName,
        position: new Vector3(0, 0, 0),
        color: 0x56680c
      },
      {
        definitionName: directionalLightComposerDefinitionName,
        position: new Vector3(7, 5, 0),
        color: 0x8d5ff9,
        intensity: 2,
        radius: 1,
      },
      {
        definitionName: directionalLightComposerDefinitionName,
        position: new Vector3(-7, 5, 0),
        color: 0xffb400,
        intensity: 1,
        radius: 1,
      },
      {
        definitionName: hemisphereLightComposerDefinitionName,
        skyColor: 0x009dff,
        groundColor: 0x1c0f0a,
        intensity: 1,
        position: new Vector3(0, 0, 0),
      }
    ]
  }
};