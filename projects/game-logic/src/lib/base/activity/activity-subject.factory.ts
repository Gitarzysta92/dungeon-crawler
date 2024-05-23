
import { Constructor } from "../../infrastructure/extensions/types";
import { IMixinFactory } from "../../infrastructure/mixin/mixin.interface";
import { IEntity } from "../entity/entity.interface";
import { IActivity, IActivitySubject, IActivitySubjectDeclaration } from "./activity.interface";



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

      public onInitialize(): void {
        this.activities.forEach(a => {
          // TO DO: check why NotEnumerable decorator, not setting property decorators correctly.
          Object.defineProperty(a, 'subject', {
            enumerable: false,
            configurable: false,
            value: this
          })
        });
        super.onInitialize();
      }

      public getActivity<T extends IActivity>(id: string): T | undefined {
        return this.activities.find(a => a.id === id) as T
      }
    
    }
    return ActivitySubject
  }
}