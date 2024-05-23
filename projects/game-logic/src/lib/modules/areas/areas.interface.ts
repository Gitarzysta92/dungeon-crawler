import { Guid } from "../../infrastructure/extensions/types";
import { IAreaDeclaration } from "./entities/area/area.interface";

export interface IAreasDataFeed {
  getAreas: (ids?: Guid[]) => Promise<IAreaDeclaration[]>;
  getArea: (id: Guid) => Promise<IAreaDeclaration>;
}

export interface IConnection {
  totalDistance: number;
  startAreaId: Guid;
  endAreaId: Guid;
  segments: { startAreaId: Guid; endAreaId: Guid; distance: number }[]
}