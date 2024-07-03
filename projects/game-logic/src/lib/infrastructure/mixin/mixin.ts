import { IMixin } from "./mixin.interface";


export class MixinBase implements IMixin {
  isMixin = true as const;
}
