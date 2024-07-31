import { Vector3 } from "three";
import { directionalLightComposerDefinitionName } from "@3d-scene/lib/actors/light-objects/directional-light/directional-light.constants";
import { hemisphereLightComposerDefinitionName } from "@3d-scene/lib/actors/light-objects/hemisphere-light/hemisphere-light.constants";
import { floatingRockTerrainComposerDefinitionName } from "@3d-scene/lib/actors/game-objects/terrains/floating-rock/floating-rock-terrain.constants";
import { skySphereComposerDefinitionName } from "@3d-scene/lib/actors/game-objects/environment-details/sky-sphere/sky-sphere.constants";
import { dungeonDeclaration as dt } from "@game-logic/gameplay/data/dungeon.data";
import { barrelActor, campFireActor, commonField, dungeonExitActor, ratActor, treasureActor } from "./data-feed-actors";
import { IDataContainer } from "../interface/data-container.interface";
import { ISceneMediumDeclaration } from "../../scene/mixins/scene-medium/scene-medium.interface";
import { COMPUTER_GROUP_ID } from "@game-logic/gameplay/data/common-identifiers.data";
import { dungeonMaster } from "@game-logic/gameplay/data/actors.data";


export const dungeonDeclaration: IDataContainer<typeof dt, ISceneMediumDeclaration> = Object.assign(dt, {
  isSceneMedium: true as const,
  isMixin: true as const,
  scene: {
    bgColor: 0x2d1048,
    composerDeclarations: [
      {
        definitionName: floatingRockTerrainComposerDefinitionName,
        position: new Vector3(1, -1.2, -1.8),
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
      },
      {
        definitionName: skySphereComposerDefinitionName,
        primeColor: 0x0d1857,
        secondColor: 0xe85b35,
      }
    ]
  },
  entities: [
    Object.assign({ ...commonField }, {
      id: "9CE384C6-BF3B-4EA7-9792-447A0B9ADA50",
      sourceActorId: commonField.id,
      position: { r: -2, q: 1, s: 1 },
    }),
    Object.assign({ ...commonField }, {
      id: "B2947C50-0D0B-4F7F-AD97-44626C3A547A",
      sourceActorId: commonField.id,
      position: { r: -2, q: 2, s: 0 },
    }),
    Object.assign({ ...commonField }, {
      id: "C5922710-134B-450B-BEC7-B69EDED19A64",
      sourceActorId: commonField.id,
      position: { r: -1, q: 0, s: 1 },
    }),
    Object.assign({ ...commonField }, {
      id: "F6744C06-833F-4145-B0DF-160AF56E900F",
      sourceActorId: commonField.id,
      position: { r: -1, q: 1, s: 0 },
    }),
    Object.assign({ ...commonField }, {
      id: "CF4A4FE6-4800-4D83-BC99-BF8238EF4178",
      sourceActorId: commonField.id,
      position: { r: 0, q: -2, s: 2 },
    }),
    Object.assign({ ...commonField }, {
      id: "FE9F1844-8450-448B-92FB-037065062E07",
      sourceActorId: commonField.id,
      position: { r: 0, q: -1, s: 1 },
    }),
    Object.assign({ ...commonField }, {
      id: "34B7EA19-0F3F-4344-B2AB-6E3AF5B8136F",
      sourceActorId: commonField.id,
      position: { r: 0, q: 0, s: 0 },
    }),
    Object.assign({ ...commonField }, {
      id: "B12888E3-A3DC-4D8B-8E73-32EFE73F84DF",
      sourceActorId: commonField.id,
      position: { r: 0, q: 1, s: -1 },
    }),
    Object.assign({ ...commonField }, {
      id: "7985C41A-49AC-487F-8496-775427BFB972",
      sourceActorId: commonField.id,
      position: { r: 0, q: 2, s: -2 },
    }),
    Object.assign({ ...commonField }, {
      id: "AA62F595-EE91-47CF-9A00-209287AFDA67",
      sourceActorId: commonField.id,
      position: { r: 1, q: -2, s: 1 },
    }),
    Object.assign({ ...commonField }, {
      id: "E0D6A15A-3FDC-4072-AD20-AB2B17F09946",
      sourceActorId: commonField.id,
      position: { r: 1, q: -1, s: 0 },
    }),
    Object.assign({ ...commonField }, {
      id: "466055B1-EA84-44FF-ACD8-9A9DA6985853",
      sourceActorId: commonField.id,
      position: { r: 1, q: 0, s: -1 },
    }),
    Object.assign({ ...commonField }, {
      id: "11E2515C-A4C2-4BE5-B8F7-2DAEEF7BD830",
      sourceActorId: commonField.id,
      position: { r: 2, q: -2, s: -0 },
    }),
    Object.assign({ ...commonField }, {
      id: "AEC52B49-AF75-4ED9-B6C3-1A6DA3EAB1CF",
      sourceActorId: commonField.id,
      position: { r: 2, q: -1, s: -1 },
    }),
    Object.assign({ ...commonField }, {
      id: "7154DF78-65D9-4BA9-986F-CF91E678E057",
      sourceActorId: commonField.id,
      position: { r: 2, q: 0, s: -2 },
    }),
    Object.assign({
      sourceActorId: ratActor.id,
      groupId: COMPUTER_GROUP_ID,
      position: { r: 0, q: 0, s: 0 },
      rotation: 0
    }, ratActor),
    Object.assign({
      sourceActorId: treasureActor.id,
      position: { r: -2, q: 0, s: 2 },
      rotation: 0
    }, treasureActor),
    Object.assign({
      sourceActorId: barrelActor.id,
      position: { r: -1, q: 2, s: -1 },
      rotation: 1
    }, barrelActor),
    Object.assign({
      sourceActorId: dungeonExitActor.id,
      position: { r: -1, q: -1, s: 2 },
      rotation: 5
    }, dungeonExitActor),
    Object.assign({
      position: { r: 1, q: 1, s: -2 }, rotation: 3
    }, campFireActor),
    Object.assign({
      sourceActorId: dungeonMaster.id,
      groupId: COMPUTER_GROUP_ID
    }, dungeonMaster)
  ],
})
