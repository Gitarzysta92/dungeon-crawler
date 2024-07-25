import { Constructor } from "../../infrastructure/extensions/types";
import { IMixinFactory } from "../../infrastructure/mixin/mixin.interface";
import { IEntity } from "../entity/entity.interface";
import { IActivityResource } from "./activity.interface";

export class ActivityResourceFactory implements IMixinFactory<IActivityResource>  {

  public isApplicable(e: IActivityResource & IEntity): boolean {
    return e.isActivityResource && e.isEntity;
  };
  
  public create(e: Constructor<IEntity>): Constructor<IActivityResource> { 
    class ActivityResource extends e implements IActivityResource {
      isActivityResource = true as const;
      
      constructor(data: IActivityResource) {
        super(data);
      }
    
    }
    return ActivityResource
  }
}