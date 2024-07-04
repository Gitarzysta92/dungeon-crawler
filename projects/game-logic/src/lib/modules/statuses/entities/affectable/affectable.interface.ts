import { Guid } from "../../../../infrastructure/extensions/types";


export type IAffectable = {
  id: Guid;
  isAffectable: true;
};
