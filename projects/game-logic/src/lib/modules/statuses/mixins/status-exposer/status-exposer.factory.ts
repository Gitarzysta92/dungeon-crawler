import { IEntity } from "../../../../base/entity/entity.interface";
import { Constructor } from "../../../../infrastructure/extensions/types";
import { IMixinFactory } from "../../../../infrastructure/mixin/mixin.interface";
import { IAffectable } from "../affectable/affectable.interface";
import { IStatus } from "../status/status.interface";
import { IStatusExposer, IStatusExposerDeclaration } from "./status-exposer.interface";


export class StatusExposerFactory implements IMixinFactory<IStatusExposer>  {

  constructor() { }

  public isApplicable(e: IStatusExposer): boolean {
    return e.isStatusExposer;
  };

  public create(e: Constructor<IEntity>): Constructor<IStatusExposer> {
    class StatusExposer extends e implements IStatusExposer {
      public id: string;
      public isStatusExposer = true as const;
      public statuses: IStatus[];
      public entities?: IStatusExposer[]; 

      constructor(data: IStatusExposerDeclaration) {
        super(data);
        this.id = data.id;
        this.statuses = data.statuses as IStatus[];
      }

      public onInitialize(): void {
        for (let status of this.statuses) {
          Object.defineProperty(status, 'exposer', {
            value: this,
            enumerable: false
          })
        }
        if (super.onInitialize) {
          super.onInitialize()
        }
      }

      public getApplicableStatuses(target: IAffectable): IStatus[] {
        const statusExposers = this.entities.filter(e => e.isStatusExposer);
        let applicableStatuses = [];

        for (let status of this.statuses) {
          if (status.canAffect(target)) {
            applicableStatuses.push(status);
          }
        }
    
        for (let exposer of statusExposers) {
          applicableStatuses = applicableStatuses.concat(exposer.getApplicableStatuses(target))
        }

        return applicableStatuses;
      }
    }

    return StatusExposer
  };
}