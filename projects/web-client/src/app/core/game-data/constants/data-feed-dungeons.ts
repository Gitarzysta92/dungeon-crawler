import { Vector3 } from "three";
import { directionalLightComposerDefinitionName } from "@3d-scene/lib/actors/light-objects/directional-light/directional-light.constants";
import { hemisphereLightComposerDefinitionName } from "@3d-scene/lib/actors/light-objects/hemisphere-light/hemisphere-light.constants";
import { floatingRockTerrainComposerDefinitionName } from "@3d-scene/lib/actors/game-objects/terrains/floating-rock/floating-rock-terrain.constants";
import { skySphereComposerDefinitionName } from "@3d-scene/lib/actors/game-objects/environment-details/sky-sphere/sky-sphere.constants";
import { dungeonTemplate as dt } from "@game-logic/gameplay/data/dungeon.data";
import { INarrativeMedium } from "../../game-ui/mixins/narrative-medium/narrative-medium.interface";
import { barrelActor, campFireActor, commonField, dungeonExitActor, ratActor, treasureActor } from "./data-feed-actors";
import { IDataContainer } from "../interface/data-container.interface";
import { ISceneMediumDeclaration } from "../../scene/mixins/scene-medium/scene-medium.interface";
import { COMPUTER_GROUP_ID } from "@game-logic/gameplay/data/common-identifiers.data";
import { dungeonMaster } from "@game-logic/gameplay/data/actors.data";


export const dungeonTemplate: IDataContainer<typeof dt, INarrativeMedium, ISceneMediumDeclaration> = Object.assign(dt, {
  narrative: { name: "string", description: "string" },
  isNarrationMedium: true as const,
  isSceneMedium: true as const,
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
    Object.assign({
      sourceActorId: dungeonMaster.id,
      groupId: COMPUTER_GROUP_ID
    }, commonField),

    // Object.assign({
    //   sourceActorId: commonField.id,
    //   position: { r: -2, q: 0, s: 2 },
    // }, commonField),
    Object.assign({
      sourceActorId: commonField.id,
      position: { r: -2, q: 1, s: 1 },
    }, commonField),
    Object.assign({
      sourceActorId: commonField.id,
      position: { r: -2, q: 2, s: 0 },
    }, commonField),
    // Object.assign({
    //   sourceActorId: commonField.id,
    //   position: { r: -1, q: -1, s: 2 },
    // }, commonField),
    Object.assign({
      sourceActorId: commonField.id,
      position: { r: -1, q: 0, s: 1 },
    }, commonField),
    Object.assign({
      sourceActorId: commonField.id,
      position: { r: -1, q: 1, s: 0 },
    }, commonField),
    // Object.assign({
    //   sourceActorId: commonField.id,
    //   position: { r: -1, q: 2, s: -1 },
    // }, commonField),
    Object.assign({
      sourceActorId: commonField.id,
      position: { r: 0, q: -2, s: 2 },
    }, commonField),
    Object.assign({
      sourceActorId: commonField.id,
      position: { r: 0, q: -1, s: 1 },
    }, commonField),
    Object.assign({
      sourceActorId: commonField.id,
      position: { r: 0, q: 0, s: 0 },
    }, commonField),
    Object.assign({
      sourceActorId: commonField.id,
      position: { r: 0, q: 1, s: -1 },
    }, commonField),
    Object.assign({
      sourceActorId: commonField.id,
      position: { r: 0, q: 2, s: -2 },
    }, commonField),
    Object.assign({
      sourceActorId: commonField.id,
      position: { r: 1, q: -2, s: 1 },
    }, commonField),
    Object.assign({
      sourceActorId: commonField.id,
      position: { r: 1, q: -1, s: 0 },
    }, commonField),
    Object.assign({
      sourceActorId: commonField.id,
      position: { r: 1, q: 0, s: -1 },
    }, commonField),
    // Object.assign({
    //   sourceActorId: commonField.id,
    //   position: { r: 1, q: 1, s: -2 },
    // }, commonField),
    Object.assign({
      sourceActorId: commonField.id,
      position: { r: 2, q: -2, s: -0 },
    }, commonField),
    Object.assign({
      sourceActorId: commonField.id,
      position: { r: 2, q: -1, s: -1 },
    }, commonField),
    Object.assign({
      sourceActorId: commonField.id,
      position: { r: 2, q: 0, s: -2 },
    }, commonField),
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
    }, campFireActor)
  ],
})
