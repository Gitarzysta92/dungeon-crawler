import { IPlayer } from "@game-logic/lib/base/player/players.interface";
import { vendorActor } from "./data-feed-actors";
import { firstArea, secondArea } from "./data-feed-areas";
import { adventureTemplate as at } from "@game-logic/gameplay/data/adventure.data";
import { INarrationMedium } from "../../game-ui/entities/narrative-medium/narrative-medium.interface";
import { IVisualMedium, IVisualUiData } from "../../game-ui/entities/visual-medium/visual-medium.interface";
import { IDataContainer } from "../interface/data-container.interface";
import { directionalLightComposerDefinitionName } from "@3d-scene/lib/actors/light-objects/directional-light/directional-light.constants";
import { hemisphereLightComposerDefinitionName } from "@3d-scene/lib/actors/light-objects/hemisphere-light/hemisphere-light.constants";
import { boardComposerDefinitionName } from "@3d-scene/lib/components/board/board.constants";
import { Vector3 } from "three";




export const adventureTemplate: IDataContainer<typeof at, INarrationMedium, IVisualMedium<IVisualUiData, any>> = Object.assign(at, {
  entities: [
    firstArea,
    secondArea,
    vendorActor
  ],
  narrative: { name: "string", description: "string" },
  isNarrationMedium: true as const,
  isVisualMedium: true as const,
  visual: {
    scene: {
      bgColor: 0x2d1048,
      composerDefinitions: [
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
  }
});