import { IBoardAppearanceSetup } from "../../../lib/components/interfaces/board-appearance-setup";
import { MapVectorToRawVector } from "../../types/map-vector-to-raw-vector";
import { ISceneFieldDeclaration } from "./field-declaration";
import { ISceneObjectDeclaration } from "./scene-object-declaration";

export type IBoardDeclaration = Omit<IBoardAppearanceSetup, "fields"> &
{ fields: MapVectorToRawVector<ISceneFieldDeclaration>[] } & ISceneObjectDeclaration;