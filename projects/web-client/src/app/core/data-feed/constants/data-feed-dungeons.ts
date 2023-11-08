import { RepeatWrapping, Vector2, Vector3 } from "three";
import { IDungeonDataFeedEntity } from "../interfaces/data-feed-dungeon-entity.interface";
import { DataFeedEntityType } from "./data-feed-entity-type";
import { dungeon } from '@game-logic/data/dungeon.data';
import { imagesPath } from "./data-feed-commons";

export const dungeonDataFeedEntity: IDungeonDataFeedEntity = Object.assign(dungeon, {
  entityType: DataFeedEntityType.Quest,
  informative: { name: "string", description: "string" },
  visualScene: {
    terrain: {
      color: 0xa07966,
      mapTexture: {
        url: `${imagesPath}/Vol_39_2_Base_Color.png`,
        wrap: RepeatWrapping as any,
        repeat: new Vector2(2, 2),
        offset: new Vector2(3, 3),
      },
      normalMapTexture: {
        url: `${imagesPath}/Vol_39_2_Normal.png`,
        wrap: RepeatWrapping as any,
        repeat: new Vector2(2, 2),
        offset: new Vector2(3, 3),
      }, 
      displacementMapTexture: {
        url: `${imagesPath}/Vol_39_2_Height.png`,
        wrap: RepeatWrapping as any,
        repeat: new Vector2(2, 2),
        offset: new Vector2(3, 3),
      },
      axisYOffset: 0
    },
    board: {
      type: "hexagonal-game-board",
      coords: new Vector3(0, 0, 0),
      apperance: {
        primaryColor: 0x000,
        secondaryColor: 0x000
      },
      fields: []
    },
    lights: [
      {
        type: "directional-light",
        params: {
          color: 0xff7404,
          intensity: 3.8,
          shadow: { near: 10, far: 200, left: -30, right: 30, top: 35, bottom: -30 },
          radius: 10,
          castShadow: true,
          position: new Vector3(-100, 30, 10)
        } 
      },
      {
        type: "directional-light",
        params: {
          color: 0xfbdaa0,
          intensity: 3.2, 
          shadow: { near: 10, far: 1300, left: -530, right: 530, top: 535, bottom: -530 },
          radius: 10,
          castShadow: true,
          position: new Vector3(-500, 500, -500)
        } 
      },
      {
        type: "ambient-light",
        params: { color: 0xfbdaa0 }
      },
      {
        type: "hemisphere-light",
        params: { skyColor: 0xB1E1FF, groundColor: 0xa07966, intensity: 1}
      }
    ] as any
  }
})