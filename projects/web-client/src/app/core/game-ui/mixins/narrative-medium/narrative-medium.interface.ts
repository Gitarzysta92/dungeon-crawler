import { IMixin } from "@game-logic/lib/base/mixin/mixin.interface";

export interface INarrativeMedium extends IMixin {
  narrative: {
    name: string;
    description: string;
  };
  isNarrationMedium: true;
}
