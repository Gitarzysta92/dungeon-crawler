import { IAffectable } from "./affectable.interface";
import { IEffect } from "../effect.interface";

export class Affectable implements IAffectable {
  id: string;
  isAffectable: true;
  appliedEffects?: IEffect[];

}