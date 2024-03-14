import { Guid } from "../../extensions/types";
import { IAreaDeclaration } from "./entities/area/area.interface";

export interface IAreasDataFeed {
  getAreas: (ids?: Guid[]) => Promise<IAreaDeclaration[]>;
  getArea: (id: Guid) => Promise<IAreaDeclaration>;
}
