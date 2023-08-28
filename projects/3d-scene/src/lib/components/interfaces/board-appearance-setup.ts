import { ColorRepresentation } from "three";
import { MapFactoryParamToInterface } from "../../actors/factory-param-to-interface";
import { GameObjectFactory } from "../../actors/game-objects.factory";

export interface IBoardAppearanceSetup {
  apperance: {
    primaryColor: ColorRepresentation;
    secondaryColor: ColorRepresentation;
  }
  fields: MapFactoryParamToInterface<typeof GameObjectFactory.createHexField>[];
}