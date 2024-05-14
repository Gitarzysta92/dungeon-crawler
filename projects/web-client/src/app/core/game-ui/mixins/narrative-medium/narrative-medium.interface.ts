import { IMixin } from "@game-logic/lib/base/mixin/mixin.interface";

export interface INarrationMedium extends IMixin {
  narrative: {
    name: string;
    description: string;
  };
  isNarrationMedium: true;
}
