import { Constructor } from "../../extensions/types";
import { IEntity } from "../entity/entity.interface";
import { IMixinFactory } from "../mixin/mixin.interface";
import { IActivitySubject, IActivitySubjectDeclaration, IActivity } from "./activity.interface";



export class ActivitySubjectFactory implements IMixinFactory<IActivitySubject>  {

  public validate(e: IActivitySubject & IEntity): boolean {
    return e.isActivitySubject && e.isEntity;
  };
  
  public create(e: Constructor<IEntity>): Constructor<IActivitySubject> { 
    class ActivitySubject extends e implements IActivitySubject {
      isActivitySubject = true as const;
      activities: IActivity[] = [];
      
      constructor(data: IActivitySubjectDeclaration) {
        super(data);
        this.activities = data.activities as IActivity[];
      }

      public getActivity<T extends IActivity>(id: string): T | undefined {
        return this.activities.find(a => a.id === id) as T
      }
    
    }
    return ActivitySubject
  }
}