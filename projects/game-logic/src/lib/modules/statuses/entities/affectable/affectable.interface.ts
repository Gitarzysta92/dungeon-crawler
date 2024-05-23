import { Guid } from "../../../../infrastructure/extensions/types";
import { IEffect } from "../../../effects/entities/effect.interface";


export type IAffectable = {
  id: Guid;
  isAffectable: true;
  appliedEffects?: IEffect[];
};
