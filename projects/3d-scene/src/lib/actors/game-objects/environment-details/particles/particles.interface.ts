import { Vector3 } from "three";
import { ISceneComposerDefinition } from "../../../../helpers/scene-composer/scene-composer.interface";
import { particlesComposerDefinitionName } from "./particles.constants";

export interface IParticlesComposerDefinition extends IParticlesCreationDefinition {
  rotation: Vector3,
  position: Vector3,
}

export interface IParticlesCreationDefinition extends
  ISceneComposerDefinition<typeof particlesComposerDefinitionName>,
  IParticlesDefinition {}


export interface IParticlesDefinition {
  color: number;
  count: number;
}