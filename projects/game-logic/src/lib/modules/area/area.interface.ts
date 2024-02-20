import { Guid } from "../../extensions/types";

export interface IRootArea {
  id: string;
  areaConnections: IAreaConnection[];
  nestedAreas?: INestedArea[];
}

export interface INestedArea {
  nestedAreas?: INestedArea[];
}

export interface IAreaConnection {
  fromAreaId: string;
  toAreaId: string;
  distance: number;
}

export interface IAreaDataFeed {
  getAreas: (ids?: Guid[]) => Promise<IRootArea[]>;
  getArea: (id: Guid) => Promise<IRootArea>;
}
