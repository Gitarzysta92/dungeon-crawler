import { IEffect } from "../effect.interface";
import { Guid } from "../../../extensions/types";


export type IAffectable = {
  id: Guid;
  isAffectable: true;
  appliedEffects?: IEffect[];
};
