import { IActivitySubject } from "../../../../base/activity/activity.interface";
import { IEntityDeclaration, IEntity } from "../../../../base/entity/entity.interface";
import { IEventListenerDeclaration } from "../../../../cross-cutting/event/event.interface";
import { EventService } from "../../../../cross-cutting/event/event.service";
import { NotEnumerable } from "../../../../infrastructure/extensions/object-traverser";
import { Constructor, Guid } from "../../../../infrastructure/extensions/types";
import { IMixinFactory } from "../../../../infrastructure/mixin/mixin.interface";
import { IConnection } from "../../areas.interface";
import { AreaService } from "../../areas.service";
import { IArea, IAreaConnection, IAreaDeclaration, INestedArea } from "./area.interface";

export class AreaFactory implements IMixinFactory<IArea> {

  constructor(
    private readonly _eventService: EventService,
    private readonly _areaService: AreaService
  ) { }
    
  public validate(e: IEntityDeclaration & Partial<IArea>): boolean {
    return e.isArea;
  };

  public create(e: Constructor<IEntity & IActivitySubject>): Constructor<IArea> {
    const eventService = this._eventService;
    const areaService = this._areaService;
    class Area extends e implements IArea {
      isArea = true as const;
      nestedAreas?: INestedArea[];
      areaConnections: IAreaConnection[];
      unlockWhen: IEventListenerDeclaration<unknown>[];
      isUnlocked: boolean;

      @NotEnumerable()
      get isOccupied() { return !!areaService.getOccupierFor(this) }

      @NotEnumerable()
      get traveler() { return areaService.getTraveler() }

      @NotEnumerable()
      get residents() { return areaService.getResidentsFor(this) }


      constructor(d: IAreaDeclaration) {
        super(d);
        this.nestedAreas = d.nestedAreas;
        this.areaConnections = d.areaConnections.map(c => Object.assign(c, { get toArea() { return areaService.getArea(a => a.id === c.toAreaId) } }));
        this.unlockWhen = d.unlockWhen;
        this.isUnlocked = d.isUnlocked;
      }


      public onInitialize(): void {
        eventService.listen(this._unlockTriggerHandler);
        super.onInitialize();
      }

      public onDestroy(): void {
        eventService.stopListening(this._unlockTriggerHandler);
        super.onDestroy();
      }

      public hasConnection(areaId: Guid): boolean {
        return this.areaConnections.some(c => c.toAreaId === areaId);
      }

      public getTravelCost(areaId): number {
        return this.areaConnections.find(c => c.toAreaId === areaId).distance ?? -1;
      }

      public getConnection(endAreaId: Guid): IConnection {
        return areaService.getConnection(this.id, endAreaId);
      }


      private _unlockTriggerHandler = (e) => {
        for (let unlock of this.unlockWhen) {
          if (e.isApplicableTo(unlock)) {
            this.isUnlocked = true;
          }
          for (let na of this.nestedAreas) {
            for (let unlock of na.unlockWhen) {
              if (e.isApplicableTo(unlock)) {
                this.isUnlocked = true;
              }   
            }
          }
        }
      }
    }
    return Area;
  };
}