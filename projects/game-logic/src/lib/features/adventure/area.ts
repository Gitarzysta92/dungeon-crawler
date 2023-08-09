import { IArea, IAreaAccessCondition, IAreaConnection } from "./area.interface";

export class Area implements IArea {
  id!: string;
  name!: string;
  parentAreaId?: string | undefined;
  associatedCharacterIds!: string[];
  areaConnections!: IAreaConnection[];
  accessCondition!: IAreaAccessCondition[];
  
  constructor() {

  }
}