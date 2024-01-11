import { Vector3 } from "three";
import { ISceneComposerDefinition } from "../../../../helpers/scene-composer/scene-composer.interface";
import { skySphereComposerDefinitionName } from "./sky-sphere.constants";

export interface ISkySphereComposerDefinition
  extends ISkySphereCreationDefinition {
  position: Vector3;
}

export interface ISkySphereCreationDefinition extends
  ISceneComposerDefinition<typeof skySphereComposerDefinitionName>,
  ISkySphereDefinition { }

export interface ISkySphereDefinition  {
  primeColor: number;
  secondColor: number;
}